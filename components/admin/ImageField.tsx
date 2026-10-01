'use client';

import { useRef, useState } from 'react';

interface ImageFieldProps {
  value: string;
  onChange: (path: string) => void;
  uploadKey: string; // filename prefix for the uploaded file
  dark?: boolean; // dark preview background, for white logos
}

type Status = { kind: 'idle' } | { kind: 'busy' } | { kind: 'ok' } | { kind: 'error'; message: string };

export default function ImageField({ value, onChange, uploadKey, dark }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function upload(file: File) {
    setStatus({ kind: 'busy' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', uploadKey);
    try {
      const res = await fetch('/api/cms/logos', { method: 'POST', body: formData });
      const result = (await res.json()) as { success: boolean; data?: { path: string }; error?: string };
      if (result.success && result.data) {
        onChange(result.data.path);
        setStatus({ kind: 'ok' });
      } else {
        setStatus({ kind: 'error', message: result.error ?? 'Upload failed.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error.' });
    }
  }

  return (
    <div className="cms-img-field">
      <button
        type="button"
        className={`cms-img-upload${dark ? ' is-dark' : ''}`}
        onClick={() => inputRef.current?.click()}
        disabled={status.kind === 'busy'}
        aria-label={value ? 'Replace image' : 'Upload image'}
      >
        {value ? <img src={value} alt="" /> : <span className="cms-img-empty">Click to upload</span>}
        <span className="cms-img-upload-overlay">{value ? 'Replace image' : 'Upload image'}</span>
      </button>
      <div className="cms-img-meta">
        <span className="cms-img-path" title={value}>{value || 'No image'}</span>
        {status.kind === 'busy' && <span className="cms-upload-status is-busy">Uploading…</span>}
        {status.kind === 'ok' && <span className="cms-upload-status is-ok">Uploaded — save to publish</span>}
        {status.kind === 'error' && <span className="cms-upload-status is-error">{status.message}</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
