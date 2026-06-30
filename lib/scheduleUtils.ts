'use server';

import dbConnect from './mongodb';
import mongoose from 'mongoose';

export async function getGameRefSectionMap(orgSlug: string): Promise<Record<string, string>> {
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) return {};

    const org = await db.collection('organizations').findOne(
        { slug: orgSlug },
        { projection: { _id: 1 } }
    );
    if (!org) return {};

    const schedules = await db.collection('schedules')
        .find({ organization: org._id })
        .project({ 'weeks.name': 1, 'weeks.games.gameRef': 1 })
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
