import { brandAssets } from './brand-assets';
import * as landing from './content/landing';
import { privacyPolicy, terms } from './content/legal';
import { scopeClassification } from './content/scope';
import type { ProjectConfig } from './types';
import { confirmed } from './content/helpers';

/**
 * THE single source of truth for copy, flags, assets and integrations.
 *
 * Rules enforced by `project.config.test.ts`:
 *   - no invented Instagram / WhatsApp / e-mail values;
 *   - `privacy.sensitiveFieldsEnabled` is the literal `false`;
 *   - the professional identification is always complete.
 */
export const projectConfig: ProjectConfig = {
  professional: {
    fullName: 'Felipe Gonzaga de Carvalho Gondim',
    displayName: 'Felipe Carvalho',
    profession: 'Psicólogo',
    registration: 'CRP 02/23810',
    locationLabel: confirmed('Atua em Pernambuco · Atendimento 100% on-line'),
    photo: {
      src: '/felipe-carvalho-professional.jpg',
      width: 512,
      height: 640,
      alt: 'Felipe Carvalho, psicólogo',
    },
  },

  brand: {
    logos: brandAssets as ProjectConfig['brand']['logos'],
    colors: {
      mist: '#CEE4EA',
      lavenderBlue: '#D0DEED',
      slate: '#4D576B',
      cobalt: '#2B4BA9',
    },
    // Measured from the vector master and confirmed by pixel census
    // (docs/ASSETS.md §4.1); still awaiting formalisation by the designer.
    // Unused while `progressPrideReferenceApproved` is false.
    measuredDotColors: [
      '#C30B0B',
      '#E58B21',
      '#FAEC37',
      '#6CBE2D',
      '#3E63FF',
      '#8F0AC6',
    ],
    concept: ['pensamento', 'conexão', 'acolhimento'],
    // Only a discreet contextual reference is allowed, and only once approved.
    progressPrideReferenceApproved: false,
  },

  service: {
    modality: 'online',
    audience: 'Pessoas adultas',
    sessionMinutes: 50,
    platform: 'Google Meet',
    // The only publishable description of the agenda. Never expose caseload.
    availabilityStatus: 'waitlist-closed',
  },

  content: {
    nav: landing.nav,
    skipLinkLabel: landing.skipLinkLabel,
    headerCta: landing.headerCta,
    seo: landing.seo,
    hero: landing.hero,
    about: landing.about,
    approaches: landing.approaches,
    credentials: landing.credentials,
    credentialsBlock: landing.credentialsBlock,
    lgbtqCommitment: landing.lgbtqCommitment,
    howItWorks: landing.howItWorks,
    waitlist: landing.waitlist,
    faqBlock: landing.faqBlock,
    faq: landing.faq,
    footer: landing.footer,
    legal: { privacy: privacyPolicy, terms },
  },

  // Every channel below stays undefined until the professional confirms it.
  contact: {
    instagramUrl: undefined,
    whatsappNumber: undefined,
    email: undefined,
    whatsappMessage:
      'Olá, Felipe. Conheci seu trabalho pelo site e gostaria de informações sobre a lista de espera.',
  },

  privacy: {
    policyUrl: undefined,
    retentionDays: 180,
    retentionStatus: 'a-confirmar',
    sensitiveFieldsEnabled: false,
  },

  hudiPages: {
    showCredit: true,
    creditUrl: undefined,
    caseStudyConsent: false,
    scopeClassification,
  },
};

export type { ProjectConfig };
