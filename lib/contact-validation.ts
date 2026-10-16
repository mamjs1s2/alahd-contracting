const NAME_LETTERS = /^\p{L}[\p{L}'’-]*$/u;

export function normalizeContactName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidContactName(value: string): boolean {
  const name = normalizeContactName(value);
  const words = name.split(" ");

  return (
    name.length >= 4 &&
    name.length <= 60 &&
    words.length >= 2 &&
    words.every((word) => NAME_LETTERS.test(word) && [...word.replace(/['’-]/g, "")].length >= 2)
  );
}

export function normalizeEgyptianMobile(value: string): string | null {
  const asciiDigits = value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0));
  const compact = asciiDigits.replace(/[\s()-]/g, "");

  if (!/^\+?\d+$/.test(compact)) return null;

  let digits = compact;
  if (digits.startsWith("+20")) digits = digits.slice(3);
  else if (digits.startsWith("0020")) digits = digits.slice(4);
  else if (digits.startsWith("20") && digits.length === 12) digits = digits.slice(2);

  if (/^[125]\d{9}$/.test(digits)) digits = `0${digits}`;

  return /^01[0125]\d{8}$/.test(digits) ? digits : null;
}
