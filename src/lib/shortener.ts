const urlMap = new Map<string, string>();

function generateShortCode(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function shortenUrl(url: string): string {
  try {
    // Validate URL
    new URL(url);
    
    // Generate unique short code
    let shortCode = generateShortCode();
    while (urlMap.has(shortCode)) {
      shortCode = generateShortCode();
    }
    
    urlMap.set(shortCode, url);
    return shortCode;
  } catch (error) {
    throw new Error('Invalid URL');
  }
}

export function getOriginalUrl(shortCode: string): string | undefined {
  return urlMap.get(shortCode);
}