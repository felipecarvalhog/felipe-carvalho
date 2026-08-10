import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding (privado)',
  // Belt and braces: also blocked in robots.ts and via an X-Robots-Tag header.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
