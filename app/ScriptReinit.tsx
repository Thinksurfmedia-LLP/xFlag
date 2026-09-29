'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type BootstrapGlobal = { Offcanvas?: { getInstance: (el: Element) => { hide: () => void } | null } };

// Close the mobile menu (#mobileMenu offcanvas, see Header.tsx) if it's open.
function closeMobileMenu() {
  const el = document.getElementById('mobileMenu');
  const bootstrap = (window as unknown as { bootstrap?: BootstrapGlobal }).bootstrap;
  if (el && bootstrap?.Offcanvas) bootstrap.Offcanvas.getInstance(el)?.hide();
}

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

  // Tapping a link in the mobile menu should close it — Next.js navigates
  // client-side, so otherwise the panel stays open over the new page (and a
  // tap on the current page's own link would appear to do nothing). Only
  // hides the panel; the click itself is left alone so navigation proceeds.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('#mobileMenu a[href]');
      if (link && link.getAttribute('href') !== '#') closeMobileMenu();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
