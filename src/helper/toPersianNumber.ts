const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toPersianNumber(
  num: number | null | undefined,
  decimals?: number
): string {
  if (num == null || typeof num !== "number" || isNaN(num)) {
    return "";
  }
  const options: Intl.NumberFormatOptions = {};
  if (typeof decimals === "number") {
    options.minimumFractionDigits = decimals;
    options.maximumFractionDigits = decimals;
  }
  const formattedNumber = num.toLocaleString("en-US", options);

  return formattedNumber.replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[parseInt(digit, 10)]
  );
}
