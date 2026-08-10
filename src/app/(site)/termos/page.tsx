import type { Metadata } from 'next';
import { LegalArticle } from '@/components/legal/LegalArticle';
import { projectConfig } from '@/config/project.config';

const page = projectConfig.content.legal.terms;

export const metadata: Metadata = {
  title: page.title.value,
  description: page.description.value,
  alternates: { canonical: '/termos' },
};

export default function TermsPage() {
  return <LegalArticle page={page} />;
}
