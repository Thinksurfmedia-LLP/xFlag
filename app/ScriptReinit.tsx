'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScriptReinit() {
  const pathname = usePathname();

  useEffect(() => {
    // Give React time to flush the new page's DOM before initialising plugins
    const timer = setTimeout(() => {
      const win = window as any;
      if (typeof win.initCarousels === 'function') {
        win.initCarousels();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
