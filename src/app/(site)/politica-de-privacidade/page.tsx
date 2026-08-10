import type { Metadata } from 'next';
import { LegalArticle } from '@/components/legal/LegalArticle';
import { projectConfig } from '@/config/project.config';

const page = projectConfig.content.legal.privacy;

export const metadata: Metadata = {
  title: page.title.value,
  description: page.description.value,
  alternates: { canonical: '/politica-de-privacidade' },
};

export default function PrivacyPolicyPage() {
  return <LegalArticle page={page} />;
}
