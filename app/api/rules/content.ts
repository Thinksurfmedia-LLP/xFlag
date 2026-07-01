export type RuleItem =
  | { type: 'text'; value: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; rows: [string, string][] };

export type RuleSection = {
  heading: string;
  content: RuleItem[];
};

export type Rulebook = {
  title: string;
  filename: string;
  sections: RuleSection[];
};

export const rulebooks: Rulebook[] = [
  {
    title: 'Coed League Rules',
    filename: 'coed-rules',
    sections: [
      {
        heading: 'Team Rosters',
        content: [{ type: 'list', items: ['Maximum 12 players per roster.', 'Players may be added through the 5th game.', 'All players must sign the XFF waiver and be on the official roster before playing.'] }],
      },
      {
        heading: 'The XFF Grid',
        content: [{ type: 'list', items: ['Field: 80 yards x 30 yards (60-yard playing field + two 10-yard end zones).', 'Midfield/line-to-gain at the 30-yard line.'] }],
      },
      {
        heading: 'Equipment',
        content: [{ type: 'list', items: ['Same-color jerseys with permanent numbers, tucked in at all times.', 'No jewelry of any kind.', 'Official Sonic pop flag belts worn on hips.', 'Molded or detachable cleats are allowed. No metal cleats.', 'Caps must be worn backward (no bills forward).'] }],
      },
      {
        heading: 'Code of Conduct',
        content: [{ type: 'list', items: ['Respect all officials at all times.', 'Fighting results in immediate ejection, suspension, and possible expulsion, plus forfeiture of the forfeit bond.', 'Trash talking is not tolerated.', 'No littering, including sunflower seeds.', 'Zero tolerance for verbal or physical abuse of officials.', '1st personal foul: player sits out one series.', '2nd personal foul: automatic ejection.', 'Counting the 5-second clock aloud is illegal: warning first, then 15-yard penalty.', 'Only team captains may discuss calls.', "Officials' decisions are final."] }],
      },
      {
        heading: 'Game Clock',
        content: [{ type: 'list', items: ['Two 20-minute halves.', '3 timeouts per half per team. No timeouts allowed if leading by 28+ points.', '25-second play clock.', 'Last 2 minutes: clock stops (if within 14 points) on incomplete passes, out-of-bounds, extra-point attempts, winning-team penalties, sacks, 5-second violations, turnovers, first downs, defensive offsides, and offensive penalties.'] }],
      },
      {
        heading: 'Scoring',
        content: [{ type: 'list', items: ['Touchdown = 6 points', 'PAT from 5-yard line = 1 point', 'PAT from 10-yard line = 2 points', 'Safety = 2 points', 'Interception return on a PAT attempt = 2 points'] }],
      },
      {
        heading: 'Forfeits',
        content: [{ type: 'list', items: ['Minimum 4 players required to start; fewer = forfeit.', 'Forfeiting team surrenders a $60 forfeit bond.'] }],
      },
      {
        heading: 'Overtime',
        content: [{ type: 'list', items: ['College-style overtime from the 10-yard line.', 'Coin toss determines first possession.', 'Starting in the 3rd overtime, teams must attempt the 2-point PAT.'] }],
      },
      {
        heading: 'Matriculation (Series of Downs)',
        content: [{ type: 'list', items: ['Offense starts at own 10-yard line.', '4 downs to cross midfield (30-yard line).', '4 downs to reach the 10-yard line.', '3 downs to score from the 10-yard line.', 'Rush cone is placed 7 yards downfield from the line of scrimmage.'] }],
      },
      {
        heading: 'Game Play - No Contact Coed Format',
        content: [{ type: 'list', items: ['Minimum 2 female players on the field at all times for each team.', 'Every 3rd play, a female player must be the intended receiver or must attempt a pass.', 'No trips formation; only lateral motion is allowed pre-snap.', 'QB has 5 seconds to release the ball.', 'No blocking beyond the line of scrimmage.', 'Pass rusher must start at least 7 yards from the line of scrimmage.', 'No bump-and-run coverage.', 'Face guarding is NOT pass interference - physical contact is required for PI.', 'Interceptions are live and returnable.', 'Fumbles are dead at the spot.', "No kicking; a declared punt automatically gives the opponent the ball at their 10-yard line.", 'Outlawed plays: QB cannot pass to themselves; QB cannot bounce off the center\'s back.'] }],
      },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Offsides', '5 yards, replay down'], ['Delay of game', '5 yards, replay down'], ['Holding / Illegal block', '5 yards + loss of down'], ['QB crossing LOS before pass', '5 yards + loss of down'], ['Forward pass behind LOS', '5 yards + loss of down'], ['Illegal procedure (trips)', '5 yards, replay down'], ['Offensive pass interference', '5 yards + loss of down'], ['Flag guarding', '10 yards + loss of down'], ['Unsportsmanlike conduct', '15-yard personal foul'], ['Impeding the rusher', '5 yards + loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Holding / Illegal flag pull', '+5 yards from end of run'], ['Stripping the ball', '+5 yards from end of run'], ['Roughing the passer', '10 yards + automatic first down'], ['Illegal rush (not 7 yards back)', '5 yards, replay down'], ['Bull rush', '10 yards, replay down'], ['Illegal contact', '10 yards, replay down'], ['Pass interference', 'Automatic first down at spot'], ['PI in end zone', '1st & goal at 1-yard line'], ['Unsportsmanlike conduct', '15 yards + automatic first down'], ['Force out', 'Spot foul + automatic first down']] }],
      },
    ],
  },
  {
    title: "Women's League Rules",
    filename: 'womens-league-rules',
    sections: [
      { heading: 'Team Roster', content: [{ type: 'list', items: ['Minimum 4 players required to start.', 'All players must sign the XFF waiver before playing.', 'Substitute fee: $20 per doubleheader or $12 per single game - must be paid BEFORE the player takes the field.', 'Substitutes need a Substitute Waiver on file.', 'Substitutes are eligible for playoff games only if they played in 2 or more regular-season games.'] }] },
      { heading: 'Equipment', content: [{ type: 'list', items: ['Same-color jerseys with numbers; shirts tucked in; flag belt worn over the shirt with flags on hips.', 'Caps worn backward; no jewelry.', 'Sport goggles required if player wears eyeglasses.', 'All players must wear cleats.', 'Official adult Sonic pop flag belts only - youth belts are NOT allowed.', 'Flag belts available for purchase from XFF for $20.'] }] },
      { heading: 'Code of Conduct', content: [{ type: 'list', items: ['Respect all officials.', 'Fighting: immediate ejection; double forfeit (both teams receive a loss); instigators may be expelled.', 'Trash talking is not tolerated.', 'Verbal or physical abuse of an official results in suspension.', '2nd personal foul = automatic ejection.', 'Counting the 5-second clock aloud is illegal.', 'Only team captains may discuss calls; arguing earns a charged timeout.', "Officials' decisions are final.", 'Teams responsible for sidelines; unsportsmanlike from sideline = 15-yard penalty + automatic first down.', 'Fan misbehavior can result in a game forfeit.'] }] },
      { heading: 'Game Clock', content: [{ type: 'list', items: ['Two 17-minute halves. 2 timeouts per half per team. No timeouts allowed if leading by 20+ points.', '1-minute halftime. 25-second play clock.', 'Last 2 minutes: clock stops (if within 14 points) on incomplete passes, timeouts, out-of-bounds, penalties, QB sacks, 5-second violations, turnovers.', 'Clock does NOT stop if the losing team commits a penalty.'] }] },
      { heading: 'Scoring', content: [{ type: 'list', items: ['Touchdown = 6 points', 'PAT from 5-yard line = 1 point (pass only)', 'PAT from 10-yard line = 2 points (pass only)', 'Safety = 2 points', 'Interception return on PAT = 2 points', 'Forfeit scored 6-0'] }] },
      { heading: 'Overtime', content: [{ type: 'list', items: ['College-style from the 10-yard line.', 'Interception in end zone during OT stays at the 10-yard line (not returned).', 'Starting in the 3rd overtime, teams must go for 2 points.'] }] },
      { heading: 'Matriculation', content: [{ type: 'list', items: ['Offense starts at own 10-yard line. 4 downs to cross midfield; 4 downs to reach the 10-yard line; 3 downs to score.'] }] },
      { heading: 'Game Play', content: [{ type: 'list', items: ['QB may run with the ball. Once QB crosses LOS before 5 seconds, the clock stops.', 'Pass rusher must start at least 7 yards from the LOS.', 'Face guarding IS pass interference in the Women\'s League.', 'If a defender inadvertently grabs the shirt instead of the flag, play continues + 5 yards added.', 'If a flag falls off, ball carrier must be touched (one hand) to be downed.', 'No screening or blocking on any play; center may not block the rusher.'] }] },
    ],
  },
  {
    title: 'Championship Rules',
    filename: 'championship-rules',
    sections: [
      { heading: 'Overview', content: [{ type: 'list', items: ['End-of-season championship tournament - free to participate (referee fee only).', 'Invitation-only event.'] }] },
      { heading: 'Qualification', content: [{ type: 'list', items: ['Division winners from each location receive an automatic invitation.', 'Remaining spots are at-large bids selected by the XFF committee based on: W/L records, strength of wins, point differential, strength of location, XFF computer rankings.'] }] },
      { heading: 'Roster & Eligibility', content: [{ type: 'list', items: ['Teams may only use players on their official roster.', 'Players who participated in multiple locations must choose ONE team for championships.', 'Players cannot join an already-eliminated team for championships.', 'Government-issued ID may be checked before the first game.'] }] },
    ],
  },
  {
    title: 'Turf Field Rules',
    filename: 'turf-field-rules',
    sections: [
      {
        heading: 'Field Rules',
        content: [{ type: 'list', items: ['No sunflower seeds, food, or drinks allowed on the turf field at any time.', 'Water and sports beverages are the only liquids permitted on the field.', 'Alcohol is prohibited at all XFF locations, including parking lots.', 'No gum, cigars, cigarettes, or any other form of tobacco.', 'Violators will be banned from future attendance at XFF events.', 'Zero-tolerance policy - no exceptions.', 'Team captains AND players are responsible for the behavior of their fans and guests.', 'Failure to supervise fans and guests may result in suspension and/or game forfeiture.', 'All XFF decisions regarding field violations are final and binding.'] }],
      },
    ],
  },
  {
    title: 'Youth Rules (5-Man Format)',
    filename: 'youth-rules',
    sections: [
      { heading: 'The Field', content: [{ type: 'list', items: ['30 yards wide x 70 yards long with two 10-yard end zones.', 'Midfield serves as the line-to-gain.', 'No-run zones: 5 yards before each line-to-gain and 5 yards before each end zone.', 'Stepping on the boundary line = out of bounds.'] }] },
      { heading: 'Series of Downs', content: [{ type: 'list', items: ['Offense starts at own 5-yard line.', '3 downs to cross midfield; 3 downs to score.', 'All changes of possession (except interceptions) start at the 5-yard line.'] }] },
      { heading: 'Rosters & Substitutes', content: [{ type: 'list', items: ['5-12 players per roster; minimum 4 to start.', 'Substitute fee: $25. Substitute Waiver required.', 'Substitutes are eligible for playoffs only if they played 2+ regular-season games.', 'All playoff players must pay full registration.'] }] },
      { heading: 'Timing', content: [{ type: 'list', items: ['34-minute continuous clock (two 17-minute halves).', 'Clock stops only for timeouts or injuries.', '30-second play clock. 1 timeout per half per team.'] }] },
      { heading: 'Scoring', content: [{ type: 'list', items: ['Touchdown = 6 points', '1 PAT from 5-yard line (pass only) = 1 point', '2 PAT from 10-yard line (run or pass) = 2 points', 'Safety = 2 points', 'Forfeit scored 28-0', 'If a team leads by 3+ touchdowns (18+ points), they must remove their pass rusher.'] }] },
      { heading: 'Game Play', content: [{ type: 'list', items: ['QB cannot run directly with the ball.', 'Direct handoffs behind the line of scrimmage only.', 'No laterals of any kind.', 'No blocking or screening.', 'No-run zones: 5 yards before midfield and 5 yards before each end zone.', 'QB has a 7-second pass clock.', 'Once the ball is handed off, the 7-second clock is no longer in effect.', 'All passes must be thrown from behind the LOS, forward, and received beyond the LOS.', 'Shovel passes are allowed.', '1 foot in bounds constitutes a catch.', 'Interceptions are returnable (except on PAT conversions).'] }] },
      { heading: 'Rushing the Passer', content: [{ type: 'list', items: ['Rusher must start at least 7 yards from the line of scrimmage.', 'Any number of players may rush simultaneously.', 'Once the ball is handed off, the 7-yard rule is no longer in effect.', 'Sack in the end zone = safety.'] }] },
      { heading: 'Flag Pulling', content: [{ type: 'list', items: ['Flag pulling is legal only when the ball carrier has full possession.', 'Defenders may dive to pull a flag.', 'No tackling, holding, or running through a ball carrier.', 'If a flag falls off inadvertently, the ball carrier is immediately down.', 'Flag guarding = stiff arm, lowering head/hand/arm/shoulder, or covering flags with jersey.'] }] },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Unnecessary roughness', '-10 yards + loss of down'], ['Unsportsmanlike conduct', '-10 yards + loss of down'], ['Screening / blocking', '-10 yards + loss of down'], ['Flag guarding', '-10 yards + loss of down'], ['Offsides / False start', '-5 yards + loss of down'], ['Illegal forward pass', '-5 yards + loss of down'], ['Illegal motion', '-5 yards + loss of down'], ['Delay of game', '-5 yards + loss of down'], ['Impeding the rusher', '-5 yards + loss of down'], ['Run in a pass-only zone', '-5 yards + loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Pass interference', 'Automatic first down at spot'], ['Holding', 'Automatic first down'], ['Stripping the ball', '+10 yards + automatic first down'], ['Unnecessary roughness', '+10 yards + automatic first down'], ['Offsides', '+5 yards + automatic first down'], ['Illegal rush', '+5 yards + automatic first down'], ['Illegal flag pull', '+5 yards + automatic first down'], ['Roughing the passer', '+5 yards + automatic first down']] }],
      },
    ],
  },
  {
    title: '5-Man League Rules',
    filename: '5-man-rules',
    sections: [
      { heading: 'Team Rosters', content: [{ type: 'list', items: ['Maximum 12 players; may be added through the 5th game.', 'All players must sign the XFF waiver and be on the official roster.'] }] },
      { heading: 'Equipment', content: [{ type: 'list', items: ['Same-color jerseys with permanent numbers, tucked in; caps backward; no jewelry.', 'Official Sonic pop flag belts; molded or detachable cleats only - no metal cleats.', 'Starting Week 2: teams penalized 2 points per player with an illegal jersey.'] }] },
      { heading: 'Game Clock', content: [{ type: 'list', items: ['Two 20-minute halves; 3 timeouts per half (no timeouts if leading 28+).', '25-second play clock.', 'Last 2 minutes (if within 14 points): clock stops on incomplete passes, out-of-bounds, extra-point attempts, defensive penalties (except offsides), QB sacks, 5-second violations, turnovers.', 'Clock does NOT stop if the losing team commits a penalty.'] }] },
      { heading: 'Scoring', content: [{ type: 'list', items: ['Touchdown = 6 | PAT (5 yd) = 1 | PAT (10 yd) = 2 | Safety = 2 | INT on PAT = 2'] }] },
      { heading: 'Matriculation', content: [{ type: 'list', items: ['Start at own 10-yard line → 4 downs to midfield → 4 downs to 10-yard line → 3 downs to score.'] }] },
      {
        heading: 'Key Differences from Coed Format',
        content: [{ type: 'list', items: ['Pass rusher must start at least 5 yards back (not 7 yards).', 'Bull rushing is illegal - rusher must choose one side of the blocker.', 'Bump-and-run coverage IS allowed: within 1 yard of LOS, extended for up to 5 yards, open hands, waist-to-shoulder contact only, no head or face contact.', 'Defender cannot contact a receiver beyond 5 yards or when the ball is in the air.', 'Face guarding IS pass interference - the defender must turn and look for the ball.', 'PI in the end zone = 1st & goal at the 1-yard line.', 'Center may block the pass rusher.', 'No trips formation.'] }],
      },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Offsides', '5 yards, replay down'], ['Delay of game', '5 yards, replay down'], ['Holding / Illegal block', '5 yards + loss of down'], ['QB crossing LOS before pass', '5 yards + loss of down'], ['Forward pass behind LOS', '5 yards + loss of down'], ['Illegal procedure (trips)', '5 yards, replay down'], ['Offensive pass interference', '5 yards + loss of down'], ['Flag guarding', '10 yards + loss of down'], ['Unsportsmanlike conduct', '15 yards (personal foul)'], ['Impeding the rusher', '5 yards + loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Holding / Illegal flag pull', '+5 yards'], ['Stripping the ball', '+5 yards'], ['Roughing the passer', '10 yards + automatic first down'], ['Illegal rush (not 5 yards back)', '5 yards, replay down'], ['Bull rush', '10 yards, replay down'], ['Illegal contact', '10 yards, replay down'], ['Pass interference', 'Automatic first down at spot'], ['PI in end zone', '1st & goal at 1-yard line'], ['Unsportsmanlike conduct', '15 yards + automatic first down'], ['Force out', 'Spot foul + automatic first down']] }],
      },
      { heading: 'Rain Policy', content: [{ type: 'list', items: ['Games are played unless the field is unplayable. Check the schedule page.', 'If no cancellation is posted, games are on.'] }] },
    ],
  },
  {
    title: '8-Man Non-Eligible Rules',
    filename: '8-man-non-eligible-rules',
    sections: [
      { heading: 'Starting a Game', content: [{ type: 'list', items: ['Game starts at scheduled time. Coin flip for receive - no deferment.', 'Teams switch directions at halftime.', 'Minimum 6 legal players required at game time.', 'Teams cannot be forced to start early.', "Forfeiting team must pay both teams' referee fees before their next game."] }] },
      { heading: 'Uniforms', content: [{ type: 'list', items: ['Jersey must be same basic color and numbered; no number = listed as #99.', 'Footwear: one-piece molded rubber shoes or screwed-in football cleats. No metal spikes.', 'Pants/shorts must be a different color than the flags.', 'Baseball caps worn backward. No pads - helmets, shoulder pads, and forearm pads are prohibited.', 'No stickum. Prescription eyeglasses must be strapped.'] }] },
      { heading: 'Timing', content: [{ type: 'list', items: ['40-minute game (two 20-minute halves); 5-minute halftime.', '2 timeouts per half per team. Referees keep official time; 25-second play clock.', 'Final 2 minutes: clock stops on incomplete passes/spike, out-of-bounds, score, timeout, non-loss-of-down penalties, change of possession, and fair catch.'] }] },
      { heading: 'Overtime', content: [{ type: 'list', items: ['Coin toss; one end zone used. Winner chooses offense or defense.', 'Choose: 1 point from the 3-yard line or 2 points from the 10-yard line.', 'Interception returned during OT = win for the returning team.'] }] },
      { heading: 'The Field', content: [{ type: 'list', items: ['80 yards long (100 yards including end zones), 40 yards wide, 10-yard end zones.', 'First downs at 20-yard intervals.'] }] },
      { heading: 'Kickoff', content: [{ type: 'list', items: ['Kicked from the 20-yard line. Receiving team has 4 players at the 40-yard line.', 'Ball must travel over the 40 in the air; otherwise spotted where it hits.', 'Touchback: receiving team\'s 20-yard line.', 'Onside kicks allowed in the final 2 minutes only if the kicking team trails by 18 points or fewer.'] }] },
      { heading: 'Game Play', content: [{ type: 'list', items: ['1 foot in bounds for a legal catch.', 'Minimum 5 players on the line of scrimmage (3 linemen + 1 eligible receiver each side).', 'Mercy rule: game ends at the 2-minute warning if one team leads by 18+.', 'Blocking: open hands only - no forearms.', 'Zero tolerance for vulgar language.'] }] },
      { heading: 'Offense', content: [{ type: 'list', items: ['Center and 2 tackles are ineligible receivers.', 'Must have a tight end or receiver outside each tackle.', 'Scoring: TD = 6 pts | 1 PAT from 3 yd | 2 PAT from 10 yd; all extra points may be returned for 2 pts.'] }] },
      {
        heading: 'Penalties',
        content: [{ type: 'table', rows: [['Taunting / Arguing (1st offense)', '15 yards + automatic first down'], ['Taunting / Arguing (2nd offense)', 'Ejection'], ['False start / Offsides (offense)', '5 yards, replay down'], ['Delay of game', '5 yards, replay down'], ['Offensive pass interference', '10 yards + loss of down'], ['Holding / Illegal block / Clipping', '10 yards (spot foul)'], ['Flag guarding', '10 yards + loss of down'], ['Intentional grounding', '10 yards + previous spot + loss of down'], ['Offside (defense)', '5 yards'], ['Defensive pass interference', 'Spot foul + automatic first down'], ['Roughing the QB', '15 yards + automatic first down'], ['Defensive holding', '10-yard spot foul'], ['Tackling', '10 yards'], ['Last-man tackle (clear path to EZ)', '1st & goal from 1-yard line'], ['Pushing receiver out of bounds', '15 yards roughing']] }],
      },
      { heading: 'Additional Rules', content: [{ type: 'list', items: ['Defender must hand the flag back to the ball carrier after pulling it.'] }] },
    ],
  },
  {
    title: '8-Man Eligible Rules',
    filename: '8-man-eligible-rules',
    sections: [
      { heading: 'The Field', content: [{ type: 'list', items: ['Elite / A / B Divisions: 45 yards x 100 yards with 10-yard end zones.', 'C Division and some B: 45 yards x 80 yards.', 'All teams play on the larger field for playoffs and championships.', 'First down system: 4 zones of 20 yards each.'] }] },
      { heading: 'Timing', content: [{ type: 'list', items: ['4 quarters of 12 minutes each. Clock stops only on timeouts or injuries.', 'Last 2 minutes: stop-clock rules apply.', '25-second play clock. 3 timeouts per half; unused timeouts do not carry over.'] }] },
      { heading: 'Format & Rosters', content: [{ type: 'list', items: ['8 players per side; game may start with 7.', 'If a team is reduced to only 6 players, the opposing team wins 7-0.', 'Maximum 20 players on the roster; due before the first game.', 'Rosters are frozen after the 4th game.', 'Elite Division players cannot fill in for lower-division teams.'] }] },
      { heading: 'Kick-offs & Punts', content: [{ type: 'list', items: ['No kickoffs. Ball placed on own 20-yard line at start, second half, and after scores.', 'All punts must be declared to the referee before the play.', 'No direct snap for a punt; punter must kick immediately in continuous forward motion.'] }] },
      { heading: 'Scoring', content: [{ type: 'list', items: ['TD = 6 pts | 1 PAT from 5 yd | 2 PAT from 10 yd | Safety = 2 pts', 'Defense can score on PAT attempts: interception returned = 2 points.', 'After a safety, the scoring team regains the ball at their own 40-yard line.'] }] },
      { heading: 'Offensive Formations', content: [{ type: 'list', items: ['All 8 players are eligible receivers.', 'Minimum 4 players on the line of scrimmage at the snap.', 'Shifts allowed; 1 player in motion (a receiver from LOS must retreat 5 yards first).', 'Direct runs are allowed - no handoff or pass is required.'] }] },
      { heading: 'Blocking', content: [{ type: 'list', items: ['Open hands with palms facing; stay on feet at all times.', 'No chop blocks, no leaving feet to block, no contact above shoulders or below the waist.', 'No forearms or elbows. "Two-on-one" blocking: only from the LOS and behind.'] }] },
      { heading: 'Defense', content: [{ type: 'list', items: ['Any formation is permitted. Defenders may use hands but may not hold.', 'Bump-and-run until the ball is thrown (NFL 5-yard rule does NOT apply).', 'No holding, tackling, or pushing a player out of bounds.'] }] },
      { heading: 'Overtime (Hybrid College Rules)', content: [{ type: 'list', items: ['Coin toss; winner picks offense or defense.', 'Each team starts at the 20-yard line going toward the goal line, with 4 plays.', 'If the first team scores, they choose 1 or 2 PAT; the second team must match.', '3rd OT: teams must go for the 2-point PAT.'] }] },
      { heading: 'Conduct & Miscellaneous', content: [{ type: 'list', items: ['Zero tolerance for physical or verbal abuse. Bodily harm = immediate removal + incident report to SDPD.', 'Profanity: 15-yard unsportsmanlike; 2nd penalty = ejection.', 'Blood rule: bleeding player removed until wound is treated.', 'No alcoholic beverages on the field or consumed by players during games.', 'Children must be supervised and kept 15 yards from the sideline.', 'No vehicles, glass containers, smoking, dogs, or bicycles on the field.', 'Managers are responsible for ensuring all trash is removed.'] }] },
    ],
  },
  {
    title: '$100 Referral Program',
    filename: 'referral-program',
    sections: [
      {
        heading: 'How It Works',
        content: [{ type: 'list', items: ['Receive a $100.00 discount off your registration fees for every new team you refer to X Flag Football.', 'The credit is applied once the referred team pays their full registration fees and forfeit bond.', 'There is no limit on the number of teams you can refer.'] }],
      },
    ],
  },
];
