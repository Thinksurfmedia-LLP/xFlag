import { NextResponse } from 'next/server';
import { getLiveVenues } from '@/lib/flagmag';

// Proxy: returns all venue records for the org (10 venues, including Mira Mesa + North Park)
// Used by the CMS admin to populate the featured-location picker
export async function GET() {
  try {
    const venues = await getLiveVenues();
    const data = venues.map((v: any) => ({
      locationName: v.name,
      cityName: v.cityName || '',
      stateAbbr: v.stateAbbr || '',
      countyName: v.countyName || '',
      address: v.address || '',
    }));
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
