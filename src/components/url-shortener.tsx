import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link2, Copy, ExternalLink } from 'lucide-react';
import { shortenUrl } from '@/lib/shortener';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      const shortCode = shortenUrl(url);
      const shortUrl = `${window.location.origin}/${shortCode}`;
      setShortenedUrl(shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Invalid URL');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white/90 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-center space-x-2">
          <Link2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Enter your URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Shorten URL
          </Button>
        </form>

        {shortenedUrl && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg break-all">
              <p className="text-sm text-gray-600">{shortenedUrl}</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              
              <Button
                onClick={() => window.open(shortenedUrl, '_blank')}
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}