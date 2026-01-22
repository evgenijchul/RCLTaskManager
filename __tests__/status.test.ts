import { nextStatus } from '../src/utils/taskStatus';

describe('nextStatus', () => {
  test('cycles through statuses', () => {
    expect(nextStatus('Pending')).toBe('In Progress');
    expect(nextStatus('In Progress')).toBe('Done');
    expect(nextStatus('Done')).toBe('Pending');
  });
});
