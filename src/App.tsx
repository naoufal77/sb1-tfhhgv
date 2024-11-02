import { Toaster } from '@/components/ui/sonner';
import { UrlShortener } from '@/components/url-shortener';
import { useEffect } from 'react';
import { getOriginalUrl } from '@/lib/shortener';

function App() {
  useEffect(() => {
    // Check if we're accessing a shortened URL
    const path = window.location.pathname;
    if (path.length > 1) {
      const shortCode = path.slice(1);
      const originalUrl = getOriginalUrl(shortCode);
      if (originalUrl) {
        window.location.href = originalUrl;
      }
    }
  }, []);

  return (
    <>
      <UrlShortener />
      <Toaster />
    </>
  );
}

export default App;