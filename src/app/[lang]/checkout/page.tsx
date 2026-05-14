import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { CheckoutForm } from '@/features/checkout/presentation/CheckoutForm';

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  return (
    <div className="flex-1 py-12">
      <CheckoutForm dict={dict} locale={lang} />
    </div>
  );
}
