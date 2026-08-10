/**
 * Typed contract for the whole project.
 *
 * Four concerns are kept apart on purpose:
 *   - content      — every user-facing string, each tagged with a review status
 *   - presentation — brand assets, colours, availability status
 *   - integrations — outbound channels (Instagram, WhatsApp, e-mail, webhooks)
 *   - consents     — privacy posture and Hudi Pages case-study permissions
 *
 * Nothing user-facing may be written inline in a component: it belongs here so
 * the professional can review, approve and change it in one place.
 */

/** Editorial review state of a single string. */
export type ContentStatus = 'confirmado' | 'a-confirmar';

/**
 * A user-facing string plus its review state. `note` explains what still has to
 * be confirmed and is surfaced in review mode only.
 */
export type ManagedText = {
  readonly value: string;
  readonly status: ContentStatus;
  readonly note?: string;
};

/** An image with intrinsic dimensions, so layout can be reserved up front. */
export type AssetRef = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt?: string;
};

export type ContentBlock = {
  readonly id: string;
  readonly eyebrow?: ManagedText;
  readonly title?: ManagedText;
  readonly paragraphs: readonly ManagedText[];
  /** One sentence pulled out of the flow as an editorial highlight. */
  readonly highlight?: ManagedText;
};

/** Distinguishes a concluded title from an ongoing course. Never conflate them. */
export type CredentialStatus = 'concluida' | 'em-andamento';

export type CredentialKind = 'especializacao' | 'formacao' | 'area-de-atuacao';

export type Credential = {
  readonly id: string;
  readonly label: ManagedText;
  readonly detail: ManagedText;
  readonly status: CredentialStatus;
  readonly kind: CredentialKind;
};

export type FaqItem = {
  readonly id: string;
  readonly question: ManagedText;
  readonly answer: ManagedText;
};

export type StepItem = {
  readonly id: string;
  readonly title: ManagedText;
  readonly description: ManagedText;
};

export type NavLink = {
  readonly id: string;
  readonly href: string;
  readonly label: ManagedText;
};

export type TrustSignal = {
  readonly id: string;
  readonly label: ManagedText;
};

/** 'limited' is the only way the restricted agenda may ever be communicated. */
export type AvailabilityStatus = 'open' | 'limited' | 'waitlist-closed';

export type ContactPreferenceOption = {
  readonly value: string;
  readonly label: ManagedText;
};

export type HeroContent = Omit<ContentBlock, 'eyebrow' | 'title'> & {
  readonly eyebrow: ManagedText;
  readonly title: ManagedText;
  readonly subheadline: ManagedText;
  readonly primaryCta: ManagedText;
  readonly secondaryCta: ManagedText;
  readonly trustSignals: readonly TrustSignal[];
  readonly photoPlaceholderLabel: ManagedText;
};

export type ApproachesContent = {
  readonly block: ContentBlock;
  readonly items: readonly ContentBlock[];
  readonly synthesis: ManagedText;
};

export type HowItWorksContent = {
  readonly block: ContentBlock;
  readonly steps: readonly StepItem[];
  readonly notes: readonly ManagedText[];
};

export type WaitlistContent = {
  readonly title: ManagedText;
  readonly intro: ManagedText;
  /** Cites the Instagram channel, so it may only be shown once the URL exists. */
  readonly closedNotice: ManagedText;
  /** Channel-free variant, for a closed list before Instagram is confirmed. */
  readonly closedNoticeNoChannel: ManagedText;
  readonly consentLabel: ManagedText;
  readonly consentLinkLabel: ManagedText;
  readonly requiredSuffix: ManagedText;
  readonly noPreferenceLabel: ManagedText;
  readonly honeypotLabel: ManagedText;
  readonly rateLimitedMessage: ManagedText;
  readonly submitLabel: ManagedText;
  readonly submittingLabel: ManagedText;
  readonly successTitle: ManagedText;
  readonly successMessage: ManagedText;
  readonly successNextSteps: readonly ManagedText[];
  readonly errorMessage: ManagedText;
  readonly duplicateMessage: ManagedText;
  readonly offlineMessage: ManagedText;
  readonly validationSummary: ManagedText;
  readonly mockNotice: ManagedText;
  readonly fields: {
    readonly fullName: FieldCopy;
    readonly email: FieldCopy;
    readonly phone: FieldCopy;
    readonly contactPreference: FieldCopy;
    readonly availability: FieldCopy;
    readonly referral: FieldCopy;
  };
  readonly contactPreferenceOptions: readonly ContactPreferenceOption[];
  readonly availabilityOptions: readonly ContactPreferenceOption[];
};

export type FieldCopy = {
  readonly label: ManagedText;
  readonly hint?: ManagedText;
  readonly optionalSuffix?: ManagedText;
};

export type FooterContent = {
  readonly identification: ManagedText;
  readonly emergencyNotice: ManagedText;
  readonly emergencyPending: ManagedText;
  readonly credit: ManagedText;
  readonly copyright: ManagedText;
  readonly legalLinks: readonly NavLink[];
};

export type LegalSection = {
  readonly id: string;
  readonly heading: ManagedText;
  readonly paragraphs: readonly ManagedText[];
  readonly bullets?: readonly ManagedText[];
};

export type LegalPage = {
  readonly title: ManagedText;
  readonly description: ManagedText;
  readonly lastReviewed: ManagedText;
  readonly sections: readonly LegalSection[];
};

export type SeoContent = {
  readonly title: ManagedText;
  readonly description: ManagedText;
  readonly ogTagline: ManagedText;
};

export type ProjectContent = {
  readonly nav: readonly NavLink[];
  readonly skipLinkLabel: ManagedText;
  readonly headerCta: ManagedText;
  readonly seo: SeoContent;
  readonly hero: HeroContent;
  readonly about: readonly ContentBlock[];
  readonly approaches: ApproachesContent;
  readonly credentials: readonly Credential[];
  readonly credentialsBlock: ContentBlock;
  readonly lgbtqCommitment: readonly ContentBlock[];
  readonly howItWorks: HowItWorksContent;
  readonly waitlist: WaitlistContent;
  readonly faqBlock: ContentBlock;
  readonly faq: readonly FaqItem[];
  readonly footer: FooterContent;
  readonly legal: {
    readonly privacy: LegalPage;
    readonly terms: LegalPage;
  };
};

/**
 * Hudi Pages commercial classification. Complexity only — never prices.
 * `personalizacao` (unqualified) exists solely for recurring services, whose
 * effort is not a one-off complexity level.
 */
export type ScopeTier =
  | 'incluido-no-escopo-base'
  | 'personalizacao-simples'
  | 'personalizacao-intermediaria'
  | 'personalizacao-avancada'
  | 'personalizacao'
  | 'custo-de-terceiro';

export type ScopeItem = {
  readonly id: string;
  readonly label: string;
  readonly tiers: readonly ScopeTier[];
  /** Plain-language consequence of choosing the feature. */
  readonly impact: string;
  readonly recurring?: boolean;
};

export type ProjectConfig = {
  readonly professional: {
    readonly fullName: string;
    readonly displayName: string;
    readonly profession: string;
    readonly registration: string;
    readonly locationLabel?: ManagedText;
    /** Undefined until an authorised professional photograph is delivered. */
    readonly photo?: AssetRef;
  };
  readonly brand: {
    readonly logos: Readonly<Record<string, AssetRef>>;
    readonly colors: Readonly<Record<string, string>>;
    /**
     * The six coloured dots of the mark, left to right. Measured from the
     * vector master, never documented by the designer — kept apart from
     * `colors` so an unformalised measurement is never mistaken for the
     * approved palette. Mirrors `--brand-dot-1..6` in `tokens.css`.
     */
    readonly measuredDotColors: readonly [
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    readonly concept: readonly string[];
    /** Progress Pride reference is opt-in and only as a micro detail. */
    readonly progressPrideReferenceApproved: boolean;
  };
  readonly service: {
    readonly modality: 'online';
    readonly audience: string;
    readonly sessionMinutes: number;
    readonly platform: string;
    readonly availabilityStatus: AvailabilityStatus;
  };
  readonly content: ProjectContent;
  readonly contact: {
    readonly instagramUrl?: string;
    readonly whatsappNumber?: string;
    readonly email?: string;
    readonly whatsappMessage?: string;
  };
  readonly privacy: {
    readonly policyUrl?: string;
    readonly retentionDays?: number;
    readonly retentionStatus: ContentStatus;
    /** Literal `false`: the MVP must not be able to collect sensitive data. */
    readonly sensitiveFieldsEnabled: false;
  };
  readonly hudiPages: {
    readonly showCredit: boolean;
    readonly creditUrl?: string;
    readonly caseStudyConsent: boolean;
    readonly scopeClassification: readonly ScopeItem[];
  };
};
