/** Get a Date into YYYY-MM-DD format */
export const getFormattedDateYYYYMMDD = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/** Get local Date from YYYY-MM-DD (or null) */
export const getParsedDateYYYYMMDD = (value: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [yStr, mStr, dStr] = value.split('-');
  const year = Number(yStr);
  const month = Number(mStr) - 1;
  const day = Number(dStr);

  const date = new Date(year, month, day);

  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day;

  return isValidDate ? date : null;
};

/** Get today's date (00:00) */
export const getStartOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/** Get a UI-friendly date string, e.g. "Jan 22, 2026" */
export const getFormattedDateForDisplay = (yyyyMmDd: string): string => {
  const date = getParsedDateYYYYMMDD(yyyyMmDd);
  if (!date) return yyyyMmDd;

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
