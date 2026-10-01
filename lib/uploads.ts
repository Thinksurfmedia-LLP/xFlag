import { writeFile } from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
};

export type UploadResult = { ok: true; path: string } | { ok: false; error: string };

// Saves an admin-uploaded image under /public/assets/images. The filename is
// built only from a sanitized prefix + timestamp + an extension derived from
// the MIME type, so client-supplied names can never escape the folder.
export async function saveUploadedImage(file: File, prefix: string): Promise<UploadResult> {
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) return { ok: false, error: 'Invalid file type. Use JPEG, PNG, WebP, GIF, or SVG.' };
  if (file.size > MAX_FILE_SIZE) return { ok: false, error: 'File too large. Maximum 5 MB.' };

  const safePrefix = prefix.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'upload';
  const filename = `${safePrefix}-${Date.now()}${ext}`;
  const dest = path.join(process.cwd(), 'public', 'assets', 'images', filename);

  await writeFile(dest, Buffer.from(await file.arrayBuffer()));
  return { ok: true, path: `/assets/images/${filename}` };
}
