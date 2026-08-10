import { ImageResponse } from 'next/og';
import { projectConfig } from '@/config/project.config';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${projectConfig.professional.displayName} — ${projectConfig.professional.profession}, ${projectConfig.professional.registration}`;

/**
 * Social card built from brand colours and text only. No photograph is
 * invented, and no stock imagery is used.
 */
export default function OpengraphImage() {
  const { professional, content } = projectConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #E9F3F6 0%, #D0DEED 100%)',
          color: '#171C26',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#2B4BA9',
            }}
          >
            {content.seo.ogTagline.value}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: '900px',
              letterSpacing: '-0.02em',
            }}
          >
            Psicologia clínica on-line, com escuta acolhedora e prática baseada em
            evidências.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '32px',
            borderTop: '2px solid rgba(43, 75, 169, 0.28)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
              {professional.displayName}
            </div>
            <div style={{ display: 'flex', fontSize: 26, color: '#3A4356' }}>
              {professional.profession} — {professional.registration}
            </div>
          </div>

          {/* The four brand colours, in order. Not a flag reference. */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['#2B4BA9', '#4D576B', '#CEE4EA', '#D0DEED'].map((color) => (
              <div
                key={color}
                style={{
                  display: 'flex',
                  width: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  background: color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
