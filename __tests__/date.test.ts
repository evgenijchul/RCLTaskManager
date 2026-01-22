import {
  getFormattedDateForDisplay,
  getFormattedDateYYYYMMDD,
  getParsedDateYYYYMMDD,
  getStartOfToday,
} from '../src/utils/date';

describe('date utils', () => {
  test('getFormattedDateYYYYMMDD zero-pads month/day', () => {
    const d = new Date(2026, 0, 2); // Jan 2
    expect(getFormattedDateYYYYMMDD(d)).toBe('2026-01-02');
  });

  test('getParsedDateYYYYMMDD parses valid and rejects invalid', () => {
    const d = getParsedDateYYYYMMDD('2026-12-31');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2026);
    expect(d!.getMonth()).toBe(11);
    expect(d!.getDate()).toBe(31);

    expect(getParsedDateYYYYMMDD('2026-02-31')).toBeNull(); // Feb 31
    expect(getParsedDateYYYYMMDD('2026-13-01')).toBeNull(); // Month 13
    expect(getParsedDateYYYYMMDD('20260101')).toBeNull();   // Bad separator
    expect(getParsedDateYYYYMMDD('bad')).toBeNull();
    expect(getParsedDateYYYYMMDD('')).toBeNull();
  });

  test('getFormattedDateForDisplay formats beautifully', () => {
    expect(getFormattedDateForDisplay('2026-01-29')).toMatch(/Jan 29, 2026/);
    expect(getFormattedDateForDisplay('2026-05-10')).toMatch(/May 10, 2026/);
  });

  test('getFormattedDateForDisplay handles invalid input safely', () => {
    expect(getFormattedDateForDisplay('invalid')).toBe('invalid'); // Returns original
    expect(getFormattedDateForDisplay('2026-02-30')).toBe('2026-02-30'); // Returns original if parse fails
  });

  test('getStartOfToday returns local midnight', () => {
    const today = getStartOfToday();
    expect(today.getHours()).toBe(0);
    expect(today.getMinutes()).toBe(0);
    expect(today.getSeconds()).toBe(0);
    expect(today.getMilliseconds()).toBe(0);
  });
});
