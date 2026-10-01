import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { readCmsData, writeCmsData } from '@/lib/cms';
import { verifyToken } from '@/lib/auth';
import { saveUploadedImage } from '@/lib/uploads';

// Generic admin image upload. `field` is only used as a filename prefix,
// except for the three logo fields, which are also persisted immediately.
type LogoField = 'logo1' | 'logo2' | 'footerLogo';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const field = formData.get('field');

  if (!(file instanceof File) || typeof field !== 'string' || !field) {
    return NextResponse.json({ success: false, error: 'file and field are required' }, { status: 400 });
  }

  const saved = await saveUploadedImage(file, field);
  if (!saved.ok) {
    return NextResponse.json({ success: false, error: saved.error }, { status: 400 });
  }

  const logoField = field as LogoField;
  if (logoField === 'logo1' || logoField === 'logo2' || logoField === 'footerLogo') {
    const cms = await readCmsData();
    if (logoField === 'logo1') cms.header.logo1 = saved.path;
    else if (logoField === 'logo2') cms.header.logo2 = saved.path;
    else cms.footer.logo = saved.path;
    await writeCmsData(cms);
    revalidatePath('/', 'layout');
  }

  return NextResponse.json({ success: true, data: { path: saved.path } });
}
