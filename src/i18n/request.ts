import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && ['en', 'ar'].includes(requestedLocale)
    ? requestedLocale
    : 'ar';

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});