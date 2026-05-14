'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Whenever pathname or searchParams change, navigation is complete
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');

      if (link && link.href) {
        const currentUrl = window.location.href;
        // If navigating to a different page or route
        if (link.href !== currentUrl && !link.href.includes('#')) {
          setIsLoading(true);
        }
      } else if (button && button.type === 'submit') {
        setIsLoading(true);
        // Auto reset button loader after 2.5 seconds if action completes
        setTimeout(() => setIsLoading(false), 2500);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse shadow-md" />
  );
}
