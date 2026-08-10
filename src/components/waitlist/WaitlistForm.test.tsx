import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { projectConfig } from '@/config/project.config';
import { WaitlistForm } from './WaitlistForm';

const copy = projectConfig.content.waitlist;

const renderForm = () =>
  render(<WaitlistForm copy={copy} privacyHref="/politica-de-privacidade" />);

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

// "E-mail" is also a radio option under "Preferência de contato", so the text
// input is addressed by role.
const emailInput = () => screen.getByRole('textbox', { name: /^E-mail/ });
const nameInput = () => screen.getByRole('textbox', { name: /^Nome completo/ });
const consentBox = () => screen.getByLabelText(/Li e concordo/);
const submitButton = () =>
  screen.getByRole('button', { name: copy.submitLabel.value });

const fillValidFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(nameInput(), 'Maria de Souza');
  await user.type(emailInput(), 'maria@example.com');
  await user.click(consentBox());
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('WaitlistForm', () => {
  it('marks optional fields as optional and required fields as required', () => {
    renderForm();

    expect(
      screen.getByRole('textbox', { name: /WhatsApp ou telefone/ }),
    ).not.toHaveAttribute('aria-required', 'true');
    expect(nameInput()).toHaveAttribute('aria-required', 'true');
  });

  it('blocks submission without consent and links the error to the checkbox', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(nameInput(), 'Maria de Souza');
    await user.type(emailInput(), 'maria@example.com');
    await user.click(submitButton());

    const checkbox = consentBox();
    await waitFor(() => expect(checkbox).toHaveAttribute('aria-invalid', 'true'));

    const errorId = checkbox.getAttribute('aria-describedby') as string;
    expect(document.getElementById(errorId)).toHaveTextContent(
      'É necessário concordar com a Política de Privacidade para continuar.',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports an invalid e-mail on the e-mail field only', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(nameInput(), 'Maria de Souza');
    await user.type(emailInput(), 'maria@');
    await user.click(consentBox());
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument(),
    );
    expect(emailInput()).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput()).not.toHaveAttribute('aria-invalid');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a success response that did not persist the submission', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse({
        status: 'success',
        delivery: { adapter: 'mock', persisted: false, simulated: true },
      }),
    );

    renderForm();
    await fillValidFields(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByText(copy.errorMessage.value)).toBeInTheDocument(),
    );
    expect(screen.queryByText(copy.successMessage.value)).not.toBeInTheDocument();
  });

  it('hides the simulated-delivery banner on a real delivery', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse({
        status: 'success',
        delivery: { adapter: 'webhook', persisted: true, simulated: false },
      }),
    );

    renderForm();
    await fillValidFields(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByText(copy.successMessage.value)).toBeInTheDocument(),
    );
    expect(
      screen.queryByText(new RegExp(copy.mockNotice.value.slice(0, 30))),
    ).not.toBeInTheDocument();
  });

  it('shows the duplicate message without echoing any submitted value', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(jsonResponse({ status: 'duplicate' }, 409));

    renderForm();
    await fillValidFields(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByText(copy.duplicateMessage.value)).toBeInTheDocument(),
    );
    expect(screen.queryByText(/maria@example\.com/)).not.toBeInTheDocument();
  });

  it('shows the generic error when the request fails', async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue(new Error('boom'));

    renderForm();
    await fillValidFields(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByText(copy.errorMessage.value)).toBeInTheDocument(),
    );
  });

  it('does not attempt a request while offline', async () => {
    const user = userEvent.setup();
    // `onLine` lives on Navigator.prototype, so an own property shadows it and
    // deleting that property restores the original getter.
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });

    try {
      renderForm();
      await fillValidFields(user);
      await user.click(submitButton());

      await waitFor(() =>
        expect(screen.getByText(copy.offlineMessage.value)).toBeInTheDocument(),
      );
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      Reflect.deleteProperty(window.navigator, 'onLine');
    }

    expect(window.navigator.onLine).toBe(true);
  });

  it('prevents a double submission', async () => {
    const user = userEvent.setup();
    let resolveFetch: ((value: Response) => void) | undefined;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    renderForm();
    await fillValidFields(user);

    await user.click(submitButton());

    const busyButton = await screen.findByRole('button', {
      name: copy.submittingLabel.value,
    });
    expect(busyButton).toBeDisabled();

    // A second click while the request is in flight must be a no-op.
    await user.click(busyButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveFetch?.(
      jsonResponse({
        status: 'success',
        delivery: { adapter: 'webhook', persisted: true, simulated: false },
      }),
    );

    await waitFor(() =>
      expect(screen.getByText(copy.successMessage.value)).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps the honeypot out of the accessibility tree and the tab order', () => {
    const { container } = renderForm();

    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
