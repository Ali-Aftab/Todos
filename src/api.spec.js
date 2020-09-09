import client, { createErrorHandler } from './api';

describe('api', () => {
  it('client should not be empty', () => {
    expect(client).toBeTruthy();
  });

  it('createErrorHandler should handle GraphQL errors', () => {
    let called = 0;
    const handler = createErrorHandler(() => {
      called++;
    });

    handler({
      graphQLErrors: [
        { message: 'm-a', locations: 'l-a', path: 'p-a' },
        { message: 'm-b', locations: 'l-b', path: 'p-b' },
        { message: 'm-c', locations: 'l-c', path: 'p-c' },
      ],
    });

    expect(called).toBe(3);
  });

  it('createErrorHandler should handle network errors', () => {
    let called = 0;
    const handler = createErrorHandler(() => {
      called++;
    });

    handler({
      networkError: 'hello world',
    });

    expect(called).toBe(1);
  });
});
