jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({
      width: 750,
      height: 1334,
      scale: 2,
      fontScale: 2,
    })),
  },
}));

import { ms, mvs, s, vs } from '../src/utils/scale';

describe('scale helpers', () => {
  test('s/vs scale linearly from guideline base', () => {
    // react-native-size-matters defaults: base 350x680, short/long dimension used
    const expectedS = (750 / 350) * 10;
    const expectedVs = (1334 / 680) * 10;

    expect(s(10)).toBeCloseTo(expectedS);
    expect(vs(10)).toBeCloseTo(expectedVs);
  });

  test('ms/mvs moderate scaling defaults to factor 0.5', () => {
    expect(ms(10)).toBeCloseTo(10 + (s(10) - 10) * 0.5);
    expect(mvs(10)).toBeCloseTo(10 + (vs(10) - 10) * 0.5);
  });

  test('ms supports custom factor', () => {
    expect(ms(10, 1)).toBeCloseTo(s(10));
    expect(ms(10, 0)).toBeCloseTo(10);
  });
});
