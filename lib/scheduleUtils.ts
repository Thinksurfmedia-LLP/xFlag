'use server';

import dbConnect from './mongodb';
import mongoose from 'mongoose';

// A DB query that runs longer than this is abandoned (the caller falls back to
// the sectionName flagmag already put on each game) rather than holding up the
// whole page.
const QUERY_MAX_TIME_MS = 10000;

/**
 * gameRef → week/section name, read straight from the Schedule docs of the
 * given leagues only. Every schedule the org has ever had is ~4.7MB since the
 * legacy imports; a page only needs the schedules of the leagues it shows.
 */
export async function getGameRefSectionMap(orgSlug: string, leagueIds: string[]): Promise<Record<string, string>> {
    const leagueObjectIds = [...new Set(leagueIds)]
        .filter((id) => mongoose.isValidObjectId(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    if (leagueObjectIds.length === 0) return {};

    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) return {};

    const org = await db.collection('organizations').findOne(
        { slug: orgSlug },
        { projection: { _id: 1 }, maxTimeMS: QUERY_MAX_TIME_MS }
    );
    if (!org) return {};

    const schedules = await db.collection('schedules')
        .find({ organization: org._id, leagueId: { $in: leagueObjectIds } })
        .project({ 'weeks.name': 1, 'weeks.games.gameRef': 1 })
        .maxTimeMS(QUERY_MAX_TIME_MS)
        .toArray();

    const map: Record<string, string> = {};
    schedules.forEach((schedule: any) => {
        (schedule.weeks || []).forEach((week: any) => {
            const sectionName = week.name || '';
            (week.games || []).forEach((g: any) => {
                if (g.gameRef) map[String(g.gameRef)] = sectionName;
            });
        });
    });

    return map;
}
