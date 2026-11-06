'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';

interface FallbackImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src?: string;
  /** Shown when `src` is empty or fails to load (missing upload, dead link). */
  fallback: string;
}

/**
 * <img> that swaps to a placeholder instead of showing the browser's
 * broken-image icon (plus the alt text squeezed into the logo box).
 */
export default function FallbackImg({ src, fallback, alt = '', ...rest }: FallbackImgProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const showFallback = !src || failedSrc === src;

  // Server-rendered images can fail before React hydrates and attaches
  // onError, so that event is lost — check the element once on mount too.
  useEffect(() => {
    const img = imgRef.current;
    if (src && img?.complete && img.naturalWidth === 0) setFailedSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      ref={imgRef}
      src={showFallback ? fallback : src}
      alt={alt}
      onError={() => { if (src) setFailedSrc(src); }}
    />
  );
}
