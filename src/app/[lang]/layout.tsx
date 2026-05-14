import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/core/components/ThemeProvider';
import { Navbar } from '@/core/components/Navbar';
import { CartSheet } from '@/features/cart/presentation/CartSheet';
import { Toaster } from 'sonner';
import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { auth } from '@/features/auth/infrastructure/auth';

import { Footer } from '@/core/components/Footer';
import { NavigationLoader } from '@/core/components/NavigationLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuxeWear - Premium Clothing E-Commerce',
  description: 'Elevate your style with premium, elegant, and sophisticated clothing.',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);
  const session = await auth();

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationLoader />
          <Navbar dict={dict} locale={lang} session={session} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer dict={dict} locale={lang} />
          <CartSheet dict={dict} locale={lang} />
          <Toaster position={lang === 'ar' ? 'top-left' : 'top-right'} richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
