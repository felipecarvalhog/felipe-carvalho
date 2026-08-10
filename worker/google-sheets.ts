import type { WaitlistPayload } from '../src/lib/waitlist-schema';

export type GoogleSheetsEnv = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_SHEET_RANGE: string;
};

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const TIMEOUT_MS = 10_000;

const base64Url = (value: string | ArrayBuffer): string => {
  const bytes =
    typeof value === 'string'
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const privateKeyBytes = (pem: string): ArrayBuffer => {
  const normalized = pem.replace(/\\n/g, '\n');
  const body = normalized
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  const binary = atob(body);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0)).buffer;
};

const createAssertion = async (
  env: GoogleSheetsEnv,
  now: number,
): Promise<string> => {
  const issuedAt = Math.floor(now / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64Url(
    JSON.stringify({
      iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const key = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBytes(env.GOOGLE_PRIVATE_KEY),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  );
  return `${unsigned}.${base64Url(signature)}`;
};

const getAccessToken = async (
  env: GoogleSheetsEnv,
  fetcher: typeof fetch,
  now: number,
): Promise<string> => {
  const assertion = await createAssertion(env, now);
  const response = await fetcher(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error('google-auth-failed');
  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) throw new Error('google-auth-missing-token');
  return body.access_token;
};

const sheetSafe = (value: string | undefined): string => {
  if (!value) return '';
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
};

export const appendToGoogleSheet = async (
  env: GoogleSheetsEnv,
  payload: WaitlistPayload,
  id: string,
  receivedAt: string,
  fetcher: typeof fetch = fetch,
): Promise<void> => {
  const token = await getAccessToken(env, fetcher, Date.now());
  const range = encodeURIComponent(env.GOOGLE_SHEET_RANGE);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEET_ID)}` +
    `/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const response = await fetcher(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      values: [
        [
          id,
          receivedAt,
          sheetSafe(payload.fullName),
          sheetSafe(payload.email),
          sheetSafe(payload.phone),
          sheetSafe(payload.contactPreference),
          sheetSafe(payload.availability),
          sheetSafe(payload.referral),
          receivedAt,
          'site-lista-de-espera',
        ],
      ],
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error('google-sheets-append-failed');
};
