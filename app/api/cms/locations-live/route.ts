import { NextResponse } from 'next/server';
import { getLiveOrganization } from '@/lib/flagmag';

// Proxy: returns the org's full locations array from flagmagMVP
// Used by the CMS admin so it can show all locations for the featured-picker UI
export async function GET() {
  try {
    const org = await getLiveOrganization();
    const locations = (org?.locations || []).map((loc: any) => ({
      locationName: loc.locationName || loc.cityName || '',
      cityName: loc.cityName || '',
      stateAbbr: loc.stateAbbr || '',
      countyName: loc.countyName || '',
    }));
    return NextResponse.json({ success: true, data: locations });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
