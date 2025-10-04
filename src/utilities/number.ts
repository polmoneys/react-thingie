/*
  Usage:
  const value = 1234.567;
  const formattedValue = formatNumber(value, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
  console.log(formattedValue); // "€1,234.57"
*/
export interface NumberFormatOptions {
    locale?: string | string[];
    style?: Intl.NumberFormatOptions['style'];
    currency?: Intl.NumberFormatOptions['currency'];
    currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay'];
    useGrouping?: Intl.NumberFormatOptions['useGrouping'];
    minimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits'];
    minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];
    maximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];
    minimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits'];
    maximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits'];
}

export function formatNumber(
    value: number,
    options: NumberFormatOptions = {},
): string {
    const {
        locale = 'en-US',
        style = 'decimal',
        currency = 'USD',
        currencyDisplay = 'symbol',
        useGrouping = true,
        minimumIntegerDigits = 1,
        minimumFractionDigits = 0,
        maximumFractionDigits = 3,
        minimumSignificantDigits,
        maximumSignificantDigits,
    } = options;

    const numberFormat = new Intl.NumberFormat(locale, {
        style,
        currency,
        currencyDisplay,
        useGrouping,
        minimumIntegerDigits,
        minimumFractionDigits,
        maximumFractionDigits,
        minimumSignificantDigits,
        maximumSignificantDigits,
    });

    return numberFormat.format(value);
}
