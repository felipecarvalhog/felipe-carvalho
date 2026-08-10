import { projectConfig } from '@/config/project.config';
import { siteUrl } from '@/config/public-env';

/**
 * JSON-LD limited to confirmed facts.
 *
 * Deliberately absent: address, telephone, price, opening hours, ratings and
 * reviews. None of those are known, and inventing them would be both an SEO
 * risk and an ethical problem.
 */
export function StructuredData() {
  const { professional, service } = projectConfig;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#profissional`,
        name: professional.fullName,
        alternateName: professional.displayName,
        jobTitle: professional.profession,
        url: siteUrl,
        identifier: {
          '@type': 'PropertyValue',
          name: 'CRP',
          value: professional.registration,
        },
        knowsAbout: [
          'Terapia Cognitivo-Comportamental',
          'Sexologia Clínica',
          'Atendimento afirmativo à população LGBTQIA+',
        ],
        knowsLanguage: 'pt-BR',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#servico`,
        name: `${professional.displayName} — Psicologia clínica on-line`,
        url: siteUrl,
        provider: { '@id': `${siteUrl}/#profissional` },
        serviceType: 'Psicoterapia on-line',
        audience: {
          '@type': 'Audience',
          audienceType: service.audience,
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: siteUrl,
          availableLanguage: { '@type': 'Language', name: 'Português' },
          serviceLocation: {
            '@type': 'VirtualLocation',
            name: service.platform,
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a literal object built above; no user input involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
