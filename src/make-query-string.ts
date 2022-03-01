export class HttpUtil {
  static makeUrl(url: string, queryString: Record<string, string | undefined>) {
    return `${url}?${HttpUtil.makeQueryString(queryString)}`;
  }

  static makeQueryString(object: Record<string, string | undefined>): string {
    return Object.entries(object)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
      .join('&');
  }

  static decodeFormUrlEncoding(formUrlEncoded: string) {
    return Object.fromEntries(
      formUrlEncoded
        .split('&')
        .map(item => {
          const [key, value] = item.split('=');
          return [decodeURIComponent(key), decodeURIComponent(value)];
        }),
    );
  }

  static decodeAuthorizationHeader(authorizationHeader: string) {
    const [type, secret] = authorizationHeader.split(' ');
    if (type !== 'Basic') {
      throw new Error('Unsupported authorization type');
    }

    const secretDecoded = Buffer.from(secret, 'base64').toString();
    const [client_id, client_secret] = secretDecoded.split(':');

    return {
      client_id,
      client_secret,
    };
  }
}