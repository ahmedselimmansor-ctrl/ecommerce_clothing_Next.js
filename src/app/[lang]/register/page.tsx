import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { RegisterForm } from '@/features/auth/presentation/RegisterForm';

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <RegisterForm dict={dict} locale={lang} />
    </div>
  );
}
