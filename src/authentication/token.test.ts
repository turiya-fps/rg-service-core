import type { TokenData, TokenPair } from './token.js';
import { decode } from './token.js';

describe('decode()', (): void => {
  it('with token, valid, return true', (): void => {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ2IjoxLCJ1aWQiOiJ0ZXN0OnVzZXI6aWQiLCJzaWQiOiJ0ZXN0OnNlc3Npb246aWQiLCJpYXQiOjE2NjUwNjIzNDYsImlzcyI6InNlcnZpY2U6dXNlciIsInN1YiI6ImF1dGhlbnRpY2F0aW9uIn0.G-cghXajjbCNXsPDS-j1YKHoYsuawfKidv5gs0e21wzn5u7tjsYBpYEo_AKnLXVldZBWKG7pmGmXyx4D3k3tjQ';

    expect(
      decode(token),
    ).toStrictEqual<TokenPair<TokenData>>({
      token,
      data: {
        v: 1,

        uid: 'test:user:id',
        sid: 'test:session:id',

        iss: 'service:user',
        sub: 'authentication',
        iat: 1665062346,
      },
    });
  });
});
