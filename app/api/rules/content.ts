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
      { heading: 'Team Rosters', content: [{ type: 'list', items: ['Maximum 14 players per roster.', 'Players must play 4 games to be eligible for playoffs & Counties.', 'All players must sign both the XFF waiver and roster before playing - team captains must verify both are signed before any game.', 'League discretion determines whether a player may play on multiple teams in one league. As a rule, a "B" player may play on an "A" team, but not vice versa (or on a "C" team).', 'Players may only play on one team per division in any XFF tournament.'] }] },
      { heading: 'The XFF Grid', content: [{ type: 'list', items: ['Field: 80 yards x 30 yards - a 60-yard field of play plus two 10-yard end zones.', 'Yard markers denote mid-field (the 30-yard line) and both 10-yard lines; end zone pylons mark the goal line.'] }] },
      { heading: 'Scheduling', content: [{ type: 'list', items: ['XFF reserves the right to modify the schedule and will notify team captains as soon as possible; changes are also posted on the XFF website.', 'Captains are responsible for notifying their teammates of any schedule changes.'] }] },
      { heading: 'Equipment', content: [{ type: 'list', items: ['Same-color jerseys with permanent numbers, tucked in at all times; caps may be worn backward; no jewelry.', 'Official Sonic pop flag belts (provided at the field), worn around the waist with flags on the hips.', 'Cleats: molded or detachable allowed, tennis shoes acceptable but not recommended. Metal cleats are strictly prohibited - baseball "spikes" result in ejection.', 'Starting Week 2: teams are penalized 2 points for each player wearing an illegal jersey.'] }] },
      {
        heading: 'Code of Conduct',
        content: [{ type: 'list', items: ['Respect the calls of XFF officials at all times.', 'Fighting results in immediate ejection and possible suspension; games may be double-forfeited, and teams instigating fights are expelled from the league with no refund of league fees.', 'Unsportsmanlike conduct, trash talking, and rough play are not tolerated. No littering (including sunflower seeds) - clean your sideline immediately after the game.', 'Threatening or abusing an XFF official (physically or verbally) results in at least a 1-week suspension; reinstatement depends on the severity of the incident.', 'A 2nd personal foul in the same game is an automatic ejection, intentional or not.', 'Counting the 5-second play clock out loud is illegal - one warning, then a 15-yard unsportsmanlike conduct penalty.', 'Only offensive or defensive captains may discuss calls or decisions with officials during the game.', "Officials may penalize violations not clearly outlined in the rules; the ref's decision is final and binding.", 'XFF may suspend any player(s) or team(s) from any location(s) for an indefinite period to keep the league safe and non-violent.'] }],
      },
      {
        heading: 'Game Clock',
        content: [{ type: 'list', items: ['Two 20-minute halves.', '3 timeouts per half per team; no timeouts may be used if leading by more than 28 points in the second half.', 'Offense has 25 seconds between plays (counted from when officials set the markers). Delay of game = 5 yards, replay the down.', 'Game clock is kept by an XFF official and may be stopped at their discretion.', 'Last 2 minutes of the second half, if the score is within 14 points ("Regulation Clock"): clock stops on incomplete passes, receiver stepping out of bounds, extra-point attempts, defensive penalties (except offsides), QB sacks, 5-second penalties, and turnovers/changes of possession.', 'During Regulation Clock: clock stops until the ball and markers are reset on first downs, defensive offsides, and offensive penalties (except QB sacks and 5-second penalties).', 'The clock will not stop if the losing team commits a penalty.'] }],
      },
      { heading: 'Scoring', content: [{ type: 'list', items: ['Touchdown = 6 | PAT (5 yd) = 1 | PAT (10 yd) = 2 | Safety = 2 | INT on PAT = 2'] }] },
      { heading: 'Forfeits', content: [{ type: 'list', items: ["A game is forfeited if a team can't start or complete it with at least 4 players.", "The forfeiting team surrenders their $70 forfeit bond, covering both teams' game fees, and must replace it to keep playing that season."] }] },
      {
        heading: 'Overtime',
        content: [{ type: 'list', items: ['Tied games go to a tiebreaker. Captains meet the official for a coin toss to determine possession.', "Both teams get 2 plays, with no timeouts, from the opponent's 10-yard line (college-style overtime).", 'If the first team fails to score, the opposing team gets 2 plays from the 10-yard line - scoring wins the game.', "If the first team scores, they choose to go for 1 or 2 points. The opposing team then gets its 2 plays and, if it scores, attempts a conversion to tie or win. If it doesn't score a touchdown or match the extra points, the first team wins.", "An interception during overtime gives the defense the ball at the 10-yard line, unless it's returned for a touchdown - the defense is then awarded 6 points and the game ends.", 'A 3rd overtime requires both teams to attempt 2-point conversions.'] }],
      },
      { heading: 'Coin Toss', content: [{ type: 'list', items: ['Officials call each team captain for a coin toss before the game. The winner chooses offense or defense; the loser picks the direction of the ball.', 'Teams switch sides after halftime. The team that started the game on defense receives the ball.'] }] },
      { heading: 'Matriculation', content: [{ type: 'list', items: ['Teams start possession at the 10-yard line - there are no kickoffs.', 'Offense gets 4 downs to reach the first down at midfield (the 30-yard line), then 4 more downs for a first down at the 10-yard line.', 'Inside the 10-yard line, the offense has only 3 downs to score. If stopped on 4th and goal, the ball is placed back at the 10-yard line regardless of where the stop occurred.'] }] },
      {
        heading: 'Game Play',
        content: [{ type: 'list', items: ['At least one player must line up on each side of the center and QB. No "trips" formation at the snap - 3 receivers on one side must shift out of it before the snap.', 'The receiver needs control of the ball with at least one foot in bounds. Leaving their feet (jumping/diving) to avoid a defender is a 5-yard penalty.', 'Taking a knee does not stop the clock - it runs until the ball carrier is touched by a defender.', "The QB may intentionally ground the ball - it's legal, with no penalty.", 'Inadvertent whistle: the offense may replay the down or take the play at the whistle spot (interception returns are spotted where the whistle blew).', 'All players are eligible to catch a forward pass once beyond the line of scrimmage.', 'QB has 5 seconds (from the snap) to release the ball - late release is a 5-yard penalty and loss of down. This includes on a muffed snap, which stays live and may be recovered and thrown (by the offense) or recovered and returned (by the defense).', 'Defense may not count the 5 seconds out loud, even from the sidelines - one warning, then a 15-yard unsportsmanlike conduct penalty.', 'If the QB catches a deflected or batted ball, he may run with it but may not throw it again.', "The snap may come between the center's legs, or via a standing \"turn and throw.\"", 'Double passes ("throwbacks") are legal if the first pass is lateral or backward and the second is released before the 5-second play clock expires. Dropped double passes are down at the spot.', "Hand-offs, pitches, and laterals are legal but can't be advanced beyond the line of scrimmage - the receiver must throw to someone beyond the LOS (or pitch again) before the 5-second clock expires.", 'Hook-and-ladder plays are legal (the 2nd receiver must be even with or behind the 1st). Intercepted pitches are live and returnable; a pitch that hits the ground is dead at the spot.', 'Flag guarding is illegal: 10-yard penalty + loss of down. Flag guarding by the QB in the end zone is a safety.', 'The center may block the pass rusher (arms extended, no blocking in the back). No cross-blocking, pulling the defender down, holding, or blocks in the back - violations may draw an unsportsmanlike conduct penalty and the play is blown dead.', "Pass rusher must start at least 5 yards from the line of scrimmage (no 5-yard rule on a double pass). Rushing is only for the QB's flags - no stripping or trying to knock the ball loose.", "Roughing the passer (contact with any part of the QB's hand) = 10-yard penalty + automatic first down.", 'Bull rushing is illegal - the rusher must pick a side of the blocker, arms fully extended, and may not lower the shoulder.', "Receivers can't interfere with the pass rusher's path beyond the line of scrimmage, but may block the rusher if engaged behind the line.", '"Canning" (blocking/bumping/checking) the center is not allowed unless the center crosses the line of scrimmage.', "Bump-and-run is allowed within 1 yard of the LOS, continuing up to 5 yards, with open hands between the waist and shoulders (no head or face contact). A receiver bumped out of bounds may re-enter but can't be the first to touch the ball.", "Defender can't contact the receiver beyond 5 yards or while the ball is in the air. Face guarding is pass interference - the defender must turn and look for the ball. PI in the end zone = 1st & goal at the 1-yard line.", 'No stripping the ball - defenders must pull flags. The ball may only be knocked away before possession is established.', 'Interceptions are live and returnable, with one pitch or lateral allowed. An INT in (or returned to inside) the 10-yard line without advancing past it is spotted at the 10.', 'Fumbles are dead at the spot of the fumble - no change of possession, no piling on.', 'Offensive offsides = dead-ball penalty, 5 yards, replay the down. Defensive offsides = free play for the offense, 5 yards, replay the down (or take the result of the play).', 'A ball carrier who falls untouched may get up and run, unless touched while down.', 'All offensive players must be set for one second before the snap. Only one player may be in motion, laterally only; if multiple players shift, all must be set for one second before the snap.', "If the last defender impedes a ball carrier's progress (holds/pushes/tackles) without pulling flags, the result is a touchdown unless declined by the offense - it's the official's judgment call."] }],
      },
      { heading: 'Outlawed Plays', content: [{ type: 'list', items: ['The QB cannot throw a forward pass to himself - it must be touched by another player first (with some intent of doing so).', "The QB cannot bounce a pass off the center's back and run with it as a completed pass. Both are ruled an incomplete pass at official discretion.", 'The referee must blow the whistle in on every change of possession.', 'The defense may only call for offsides if the play results in a first down.'] }] },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Offsides', '5 yards, replay the down'], ['Delay of Game', '5 yards, replay the down'], ['Offensive Holding / Illegal Block', '5 yards + loss of down'], ['QB crossing LOS before pass', '5 yards + loss of down'], ['Forward pass caught behind LOS', '5 yards + loss of down'], ['Illegal procedure ("trips")', '5 yards, replay the down'], ['Offensive pass interference', '5 yards + loss of down'], ['Flag guarding', '10 yards from spot + loss of down (only if flag is not pulled)'], ['Unsportsmanlike conduct', '15 yards from end of play - 1st offense sits out a series, 2nd offense suspended rest of game'], ['Impeding the rusher', '5 yards + loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Holding ball carrier / Illegal flag pull', '5 yards added to end of the run'], ['Stripping', '5 yards from spot of the foul'], ['Roughing the passer', '10 yards + automatic first down'], ['Illegal rush (not 5 yards back)', '5 yards, replay the down or result of the play (offense may decline)'], ['Bull rush', '10 yards, replay the down'], ['Illegal contact (ball not yet released)', '10 yards, replay the down'], ['Pass interference', 'Automatic first down at spot of foul'], ['PI in end zone', '1st & goal at the 1-yard line'], ['Unsportsmanlike conduct', '15 yards + automatic first down'], ['Force out', 'Spot foul + automatic first down']] }],
      },
      { heading: 'General', content: [{ type: 'list', items: ['1st personal foul = player sits out 1 series (offense or defense). 2nd personal foul = ejection.', "Fighting = ejection, possible suspension, expulsion from XFF, and loss of the team's forfeit bond.", 'Zero tolerance for verbal or physical abuse toward any XFF official - may result in automatic ejection and further discipline.'] }] },
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
      { heading: 'The Field', content: [{ type: 'list', items: ['Elite / A / B Divisions: 45 yards x 100 yards with 10-yard end zones.', 'C Division and some B Division games: 45 yards x 80 yards. All teams may play on the larger field during playoffs and championship games.', 'First down system: 4 "zones to gain" of 20 yards each. Once a first down is gained, it may not be re-crossed in the same series.'] }] },
      { heading: 'Timing', content: [{ type: 'list', items: ['4 quarters of 12 minutes each. Clock stops only on a called timeout or injury.', 'Last 2 minutes of the half and game: regular "Stop Clock" rules apply.', 'Clock stops on: incomplete pass, timeout, out of bounds, and penalty (an intentional penalty to stop the clock is a 15-yard unsportsmanlike conduct penalty plus a 30-second run-off).', 'Offense has 25 seconds to snap the ball after the official declares it ready.', '3 timeouts per half per team; unused timeouts do not carry over. Any player on the field may call a timeout.'] }] },
      { heading: 'Format & Rosters', content: [{ type: 'list', items: ['8 players per side; a team may start with 7.', 'If a team is reduced to only 6 players, the game is called - the opposing team may take the score at the time of the forfeit or a 7-0 win.', "Maximum 20 players on the roster, due before the first game of the season. Rosters freeze after a team's 4th game.", 'Within the first 2 weeks of the season and before the 4th game, a player may switch to another team in the league - but may still only play in one game per day.', 'Elite Division players cannot fill in for lower-division teams that need players to start a game.'] }] },
      {
        heading: 'Equipment',
        content: [{ type: 'list', items: ['No pads on any part of the upper torso, arms, or hands (kneepads are OK). No casts of any kind. No metal cleats.', 'Ace bandages are accepted for muscle pulls, but not to support other padding. Mouthpieces and eye protection are encouraged.', 'Knee braces and lower-limb prosthesis hinges must be covered with a neoprene wrap.', 'No brimmed hats (e.g. baseball caps) and no headgear with ends that could be pulled.', 'Teams must always wear the same-colored uniform and bring an opposite-color (dark/light) set of tops - a coin toss decides who wears team colors if both teams match.', 'Teams must provide their own flags and footballs (official collegiate or NFL size/weight).'] }],
      },
      { heading: 'Kick-offs & Punts', content: [{ type: 'list', items: ["No kickoffs. Ball is placed on the team's own 20-yard line at the start of the game, the start of the second half, and after all scores.", 'Declared punts must be announced to the referee before the ball is ready for play, and re-declared on any replay of down (including timeouts).', 'No direct snap on a punt. Upon receiving the snap, the punter must immediately attempt to kick the ball in one continuous forward motion, using the same ball the offense is using.', 'A scrimmage kick that fails to cross the line of scrimmage stays in play - any player may catch and advance it.'] }] },
      { heading: 'Scoring', content: [{ type: 'list', items: ['TD = 6 pts | 1-pt PAT from the 5-yard line | 2-pt PAT from the 10-yard line.', 'Defense can score 2 points on a PAT attempt if the situation allows (e.g. an intercepted pass).', 'Safety = 2 points; the scoring team regains possession at their own 40-yard line (20-yard line on the C Division field), or at midfield during overtime.'] }] },
      { heading: 'Fumbles', content: [{ type: 'list', items: ['All fumbles and muffs (whether or not possession was established) are dead at the spot and belong to the team last in possession.', 'Exception: a punt muffed by the receiving team goes to the receiving team at the spot of the touch.', 'Exception: a punt muffed by the punter stays live - the punter may recover it and still punt.'] }] },
      { heading: 'Offensive Formations', content: [{ type: 'list', items: ['All 8 players are eligible receivers. Direct runs are allowed - no handoff or pass is required.', 'Minimum 4 players on the line of scrimmage at the snap. Shifts are allowed; 3- and 4-point stances are allowed.', 'One player may go in motion, laterally only. A receiver going in motion from the LOS must first retreat at least 5 yards.', 'Players on the line of scrimmage must keep their shoulders square to the line.'] }] },
      { heading: 'Blocking', content: [{ type: 'list', items: ['Open hands, palms facing the opponent, arms extended - stay on your feet at all times. No chop blocks, no leaving your feet to block.', 'No contact above the shoulders or below the waist, no tripping, no forearms or elbows.', 'Limited hand use is permitted on pass blocking (hands may thrust forward, but contact must stay inside the frame). "Two-on-one" blocking is only permitted from the line of scrimmage and behind.'] }] },
      { heading: 'Passing', content: [{ type: 'list', items: ['Unlimited forward passes are allowed as long as the passer is behind the line of scrimmage.', 'The passer may immediately spike the ball to the ground to stop the clock.'] }] },
      { heading: 'Running', content: [{ type: 'list', items: ['The runner may not guard flags, straight-arm, or charge into a defender - must attempt to avoid the defender.', 'The player must start the play with flags.', 'A runner who loses their flags mid-play, without being de-flagged by an opponent, is simply down when touched between the shoulders and knees.'] }] },
      { heading: 'Defense', content: [{ type: 'list', items: ['Any formation is allowed. Defense may use hands but may not hold the opponent.', "Bump-and-run coverage is allowed until the ball is thrown - the NFL 5-yard/one-bump rules do NOT apply, and defensive interference doesn't apply until the pass crosses the line of scrimmage.", 'Defense may not hold, tackle, or push a runner out of bounds.', "Defense may strip the ball from the runner or QB only if, in the official's judgment, no foul (holding, roughing, or tackling) was committed."] }] },
      {
        heading: 'Overtime (Hybrid College Rules)',
        content: [{ type: 'list', items: ['Coin toss - winner picks offense or defense. Each team starts at the 20-yard line going toward the goal line, with 4 plays.', "If the first team doesn't score, note the yardage gained - the second team must out-gain them or score a touchdown to win.", 'If the first team scores, they choose to go for 1 or 2 points; the second team must match. A higher point total by the 2nd team ends the game; if both score a touchdown and match PATs, a 2nd overtime is played with the opposite team starting with the ball.', '3rd overtime: both teams must go for a 2-point conversion after scoring; play continues until a team wins.', 'Penalties are enforced as normal. All penalties are 5, 10, or 15 yards.'] }],
      },
      {
        heading: 'Protests',
        content: [{ type: 'list', items: ['Rule interpretation: the manager must use a timeout to question a call. If officials rule the play was enforced incorrectly, the timeout is returned; if the play stands, the timeout is forfeited.', "Illegal player, before the game: request the official ask the opposing manager about a player's eligibility.", "Illegal player, during the game: the manager may protest a player's eligibility any time before the game ends. If the roster can't be verified on the spot, the official notes the protested player on the stat card, notifies the opposing manager the game is under protest, and play resumes - the League Director then checks the official roster.", 'Playing an ineligible player results in an automatic forfeit and suspension of that player and the manager (determined by the League Director). The opposing manager may take the result/score of the game played, or a 7-0 forfeit win.'] }],
      },
      {
        heading: 'Conduct & Discipline',
        content: [{ type: 'list', items: ["Rough or dangerous play is never tolerated - officials strictly enforce safety and sportsmanship rules. After one warning, if a manager can't control their team or player, the official may forfeit the game.", 'Profanity (including sideline conduct) draws a 15-yard unsportsmanlike conduct penalty; a 2nd penalty is an ejection.', 'Zero tolerance for physical or verbal abuse of any player, official, or spectator. Bodily harm results in immediate removal from the league and an incident report filed with SDPD - all threats are taken seriously.', "Ejected players must leave the playing area (including sidelines) within 3 minutes if directed by an official or League Director; the manager must give the official the ejected player's full name.", "Ejection = automatic 1-game suspension. Officials can only eject for the game being played; further discipline is at the League Director's discretion. Players ejected in more than one game in a season are removed for the rest of the season.", 'Blood rule: a bleeding player, coach, or official must leave until all bleeding has stopped, any open cut is fully covered, and any bloody clothing is removed and replaced.', 'Alcohol is not allowed on the field or while playing - visibly inebriated players will not be allowed to play.'] }],
      },
      { heading: 'Miscellaneous', content: [{ type: 'list', items: ['Children must be supervised at all times, kept at least 15 yards from the sideline, and may not hold the down marker.', 'Spectators must stay at least 10 yards from the sideline.', 'No vehicles, glass containers, smoking, dogs, or bicycles on or around the field - lock bikes at the racks provided.', "Managers are responsible for making sure their team's trash is cleaned up and placed in the provided receptacles."] }] },
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
