import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const name = locale === 'ru' ? 'Ханна М. Н.' : 'Mina N. F.';

  return {
    title: `${name} | ML Engineer & Full Stack Developer`,
    description: `Portfolio of ${name}, specializing in Machine Learning and Modern Web Development.`,
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="grid-overlay" />
      <div className="glow-orb top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#7c3aed]/10" />
      <div className="glow-orb bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ec4899]/10" />
      <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366f1]/5" />
      <div className="relative z-10">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
