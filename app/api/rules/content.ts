// NOTE: This is the SINGLE SOURCE OF TRUTH for the Rules page.
// app/rules/page.tsx renders this data on the webpage, and the PDF
// download route (app/api/rules/pdf/[slug]/route.ts) renders the exact
// same data into a PDF. Edit content here ONLY -- never hardcode rule
// text separately in the page or the PDF generator, or the two will
// drift out of sync again.
//
// Use **bold** inside any string to render emphasis (both on the
// webpage and, stripped, in the PDF).

export type RuleItem =
  | { type: 'text'; value: string }
  | { type: 'list'; items: string[]; ordered?: boolean; indent?: boolean }
  | { type: 'table'; rows: [string, string][] };

export type RuleSection = {
  heading?: string;
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
        content: [{ type: 'text', value: 'Teams may carry up to 12 players on their roster. Players may be added through the 5th game of the season. All players must sign both the XFF waiver and roster before they are eligible to play. It is the team captain\u2019s responsibility to verify that each player has signed the roster and waiver before any game is played. It will be up to the discretion of the league whether or not a player will be allowed to play on multiple teams in one league. As a general rule, a "B" player may play on an "A" team, but an "A" player will not be allowed to play on a "B" (or "C") team. Players may only play on one team in any XFF tournament.' }],
      },
      {
        heading: 'The XFF Grid',
        content: [
          { type: 'text', value: 'The playing field is 80 yards x 30 yards and consists of a 60-yard field of play and two 10-yard end zones.' },
          { type: 'text', value: 'Yard markers will denote midfield (the 30-yard line) and both 10-yard lines. End zone pylons will mark the goal line.' },
        ],
      },
      {
        heading: 'Equipment',
        content: [
          { type: 'text', value: 'All players must wear the same color shirts/jerseys with permanent numbers on the back. All shirts must be tucked in. Baseball caps may be worn backward. Jewelry is not allowed.' },
          { type: 'text', value: 'All players should wear cleats (both molded and detachable are allowed). Tennis shoes are acceptable but are not recommended. Metal cleats are strictly prohibited. Anyone found wearing baseball "spikes" will be ejected from the game.' },
          { type: 'text', value: 'All players will use official Sonic pop flag belts (provided at the field). Belts are to be worn around the waist with flags on the hips.' },
        ],
      },
      {
        heading: 'Scheduling',
        content: [{ type: 'text', value: 'X Flag Football reserves the right to modify the schedule and will notify affected team captains as soon as possible. Schedule changes will also be posted on the XFF website. Captains and players are encouraged to check the online schedule for changes. Team captains are responsible for notifying their teammates of schedule changes.' }],
      },
      {
        heading: 'XFF Code of Conduct',
        content: [
          { type: 'text', value: 'All players shall respect the calls of the XFF officials.' },
          { type: 'text', value: 'Any player involved in fighting will be immediately ejected from the game and subject to further suspension at the discretion of the league. Games may be "double-forfeited" due to fights. Teams instigating fights will be expelled from the league. League fees will not be refunded for team expulsion due to fighting.' },
          { type: 'text', value: 'Unsportsmanlike conduct, including trash talking and rough play, will not be tolerated. This is a FLAG football league. Anyone not abiding by the XFF Code of Conduct may be ejected from games and potentially suspended from league play.' },
          { type: 'text', value: 'No littering! This includes sunflower seeds. Teams must clean up their sideline immediately after their game. Any player who threatens or abuses (either physically or verbally) an XFF official before, during or after a game will be suspended from at least 1 week of games. Reinstatement will be determined based on the severity of the incident. Regardless of whether it is intentional or not, players receiving a second personal foul in the same game will be automatically ejected.' },
          { type: 'text', value: 'Counting down the five-second play clock out loud is illegal. Officials will give one warning. The second offense is a 15-yard unsportsmanlike conduct penalty.' },
          { type: 'text', value: 'Captains are responsible for distributing the XFF rules and Code of Conduct to their team members. Only offensive or defensive captains are allowed to discuss calls and/or decisions with officials during the game.' },
          { type: 'text', value: "XFF Referees have the discretion to penalize players/teams for violations not clearly outlined in the rules. (for example, having players sit out a series for a near scuffle, trash-talking, etc). The ref's decision is final and binding. Players are expected to respect the ref's calls and act as responsible adults would. Players in violation of this, place their future playing time in the hands of XFF Management. XFF reserves the right to suspend any particular player(s)/team(s) from any location(s) for an indefinite amount of time. XFF's goal is to promote a safe, nonviolent league for players, their friends, and family." },
        ],
      },
      {
        heading: 'Game Clock',
        content: [
          { type: 'text', value: 'Games will consist of two 20-minute halves. Each team may use 3-time outs per half. If a team is leading by more than 28 points in the second half, they may not use their remaining time outs.' },
          { type: 'text', value: 'The offense has 25 seconds between plays (officials count downtime from setting the markers). Delay of the game is a penalty (5 yards, replay the down). The game clock will be kept by an XFF official and may be stopped at their discretion. The clock will stop during the last two minutes of the second half if the score is within 14 points (14 points or less) ("Regulation Clock") in the following situations:' },
          { type: 'list', ordered: true, items: ['Incomplete passes', 'Receiver steps out of bounds', 'Extra point attempts', 'Penalties by the team that is winning the game', 'Quarterback sacks (if the team that sacks is losing)', '"Five-second" penalties (If the team is winning)', 'Turnovers / Changes of possession'] },
          { type: 'text', value: 'During Regulation Clock play, the clock will stop until the ball and markers are set in the following situations:' },
          { type: 'list', ordered: true, items: ['First downs', 'Defensive offsides (if that team is winning)', 'Offensive penalties (excluding quarterback sack and "five-second" penalty).'] },
        ],
      },
      {
        heading: 'Scoring',
        content: [{ type: 'list', ordered: true, items: ['Touchdown: 6 points', '5 yard PAT: 1 point', '10 yard PAT: 2 points', 'Safety: 2 points', 'Interception return for a touchdown on PAT attempt: 2 points'] }],
      },
      {
        heading: 'Forfeits',
        content: [{ type: 'text', value: "A game will be forfeited if a team is unable to start (or complete) a game with at least 4 players. In the event of a forfeit, the forfeiting team will surrender their $60 forfeit bond to cover both team's game fees. In order to continue play for the season, the $60 forfeit bond must be replaced." }],
      },
      {
        heading: 'Overtime',
        content: [{ type: 'text', value: "If a game is tied at the end of regulation play, a tiebreaker will be played to determine the winner. Captains will meet with the official for a coin toss to determine possession of ball. Both teams are given 2 plays, with no time outs, from the opponent's 10-yard line (similar to the college football overtime). If the first team is unsuccessful in scoring, the opposing team takes possession at the 10-yard line and has 2 plays to score. If they score, they win. If the first team is successful in scoring, they have the option of going for 1 or 2 points. The opposing team then tries their 2 plays to score and, if successful, attempts a conversion to either tie or win the game. If the opposing team does not score a touchdown or does not match the first team's extra points, the game is over and the first team wins. If an interception occurs during overtime, the defense will take over at the 10-yard line unless the INT is returned for a TD. In this event, the defense will be awarded 6 points and the game will be over. If the game goes to a 3rd overtime, both teams must attempt 2-point conversions." }],
      },
      {
        heading: 'Coin Toss',
        content: [{ type: 'text', value: 'Officials will call each team captain for the coin toss prior to the game. Winner of the coin toss chooses to be on either offense or defense. Loser of coin toss decides direction of ball. After halftime, the teams switch sides. The team that started the game on defense gets the ball.' }],
      },
      {
        heading: 'Matriculation',
        content: [{ type: 'text', value: 'Teams start possession at the 10-yard line (there are no kickoffs). The offense has 4 downs to reach a first down at midfield (the 30-yard line), then 4 downs for another first down at the 10-yard line. Once inside the 10, the offense only has 3 downs to score a touchdown. If the defense stops the offense from scoring on 4th and goal, the ball will be placed on the 10-yard line regardless of where the stop was made. The rush cone will always be set 7 yards downfield from the line of scrimmage cone.' }],
      },
      {
        heading: 'Game Play',
        content: [
          { type: 'text', value: 'There must be two girls on the field at all times. Every 3rd play a girl must either catch a pass or an attempt a throw. If a girl is the quarterback, and she is sacked on that play that does count as an attempt and will satisfy the girl play. If a girl does not catch the ball or attempt a throw on the 3rd play, the next play must also be a girl play.' },
          { type: 'text', value: 'There must be at least one player on each side of the center and quarterback. The ball may not be snapped with a "trips" formation. Teams may line up with three receivers on one side, but must motion out of that formation before the snap of the ball. The receiver must have control of the ball with at least one foot in bounds. The receiver must not leave their feet (jumping/diving) to avoid a defender. Will result in a 5 yard penalty. Taking a knee does not stop the clock. Play clock will run until ball carrier is touched by defender. The quarterback may intentionally ground the football. It is a legal play and there is no penalty. In the event of an inadvertent whistle, the offense has the option to either replay the down or to take the play at the point the whistle was blown (unless the inadvertent whistle occurs during an interception return, in which case the ball will be spotted where it was when the whistle was blown). All players are eligible to catch a forward pass so long as they are beyond the line of scrimmage. The quarterback has 5 seconds to release the ball. Count starts on the snap of the ball. If the ball is not thrown within 5 seconds, it is a 5-yard penalty and loss of down. The 5-second rule is in effect during a muffed snap, which is a live ball and may be recovered by the offense and thrown, or recovered by the defense and returned. It is illegal for the defensive team to count the five seconds out loud (even from the sidelines). Officials will issue one warning. Teams will be assessed a 15-yard penalty for unsportsmanlike conduct on the second offense. In the event of a deflected/batted ball by the defender that is caught by the quarterback, he may run with the ball (even though it may be caught behind the line of scrimmage). The quarterback may NOT throw the ball again.' },
          { type: 'text', value: 'The quarterback can receive the snap from center either from between the center\'s legs or from a "turn and throw" method where the center may throw the ball to the quarterback from a standing position. Double passes ("throw backs") are allowed, so long as the first pass is thrown laterally or backwards and the second pass is released prior to the expiration of the five-second play clock. Dropped double passes are down at the spot. Handoffs, pitches and laterals are all legal, but may not be advanced beyond the line of scrimmage. The receiver of the handoff must throw the ball to a receiver beyond the line of scrimmage (or pitch it again). The 5-second rule is in effect and a forward pass must be thrown before the play clock expires. Hook and ladder plays are legal. A receiver may pitch the ball to another player, so long as the second player is even with, or behind the initial receiver. If the defense intercepts the pitch, it is a live ball and may be returned. If the ball hits the ground, it is dead at the spot. Flag guarding is illegal. It will result in a 10-yard penalty and loss of down. Flag guarding by the quarterback in the end zone is a safety.' },
          { type: 'text', value: "The center may block the pass rusher. There is no blocking in the back and all blocks must be thrown with arms extended. Absolutely no cross-blocking, pull the defender down, holding, or blocks in the back. Other players may block the pass rusher, but there is no down-field blocking on receptions or interceptions. The play will be blown dead and the offending player may be called for an unsportsmanlike conduct penalty at the discretion of the official. Pass rusher must start at least seven yards from line of scrimmage. If the rusher jumps the snap count, he must go back behind the rush mark before continuing to rush the quarterback (but he can still rush). Rusher must go for the quarterback's flags. There is absolutely no stripping or attempting to knock the ball out of the QB's hands. Any player may rush so long as they start beyond 5 yards from the line of scrimmage. In the event of a double pass (\"throwback\"), anyone may rush the ball carrier (no 7 yard rule). Roughing the passer (hit any part of the qb hand) is a 10-yard penalty and an automatic 1st down." },
        ],
      },
      {
        heading: 'There Is No Contact in Our Coed Format',
        content: [
          { type: 'text', value: '"Bump & run" coverage is not allowed by the defense. Face guarding is not a pass interference penalty. Contact must be made for pass interference. Pass Interference in the end zone will result in 1st and goal at the one yard line. There is absolutely no stripping of the ball allowed. Players must attempt to pull the ball carrier\'s flags. The defender may knock the ball away as a receiver is trying to establish possession, but once the ball is secured, it may not be stripped.' },
          { type: 'text', value: 'Interceptions are live and may be returned. One pitch or lateral is allowed on an interception return. An interception in the end zone \u2013 or inside the 10-yard line \u2013 and not advanced beyond the 10-yard line will be spotted at the 10.' },
          { type: 'text', value: 'Fumbles are blown dead at the spot of the fumble. There is no change of possession (no piling on).' },
          { type: 'text', value: 'Offensive offsides is a dead ball penalty. Five yards, replay the down.' },
          { type: 'text', value: 'Defensive offsides is a "free play" for the offense. Five yards, replay the down (or take the result of the play).' },
          { type: 'text', value: 'If a ball carrier falls to the ground without being contacted by a defensive player, he may get up and run, unless touched while down.' },
          { type: 'text', value: 'All offensive players must be set for one second before the snap. Only one player may be in motion at the snap. The motion must be lateral (no forward motion). If two or more players shift, they must be set for one second before the snap.' },
          { type: 'text', value: "If the last defender available to make a play on a ball carrier holds, pushes, tackles, or in any way impedes the offensive player's progress without pulling the flags, the result of the play is a touchdown, unless declined by the offense. It is a judgment call by the official." },
          { type: 'text', value: 'There is no kicking in X Flag Football. If the offense declares a "punt" on the 4th (or any) down, the ball will automatically be placed on the opponent\'s 10-yard line. If the offense elects to punt, then decides not to, a time out will be charged to that team. If the team has no timeouts left, they must punt.' },
        ],
      },
      {
        heading: 'Outlawed Plays',
        content: [{ type: 'text', value: "#1 A QB cannot throw a forward pass to himself. It has to be at least touched by a player on the offense or defense (with some intent of doing so). #2 The QB cannot bounce the pass off the centers back and run with it as a completed pass. Both of these calls will result in an incomplete pass and are at the discretion of the officials. The referee must blow the whistle in on every change of possession. The defense may only call for offsides if the play results in a first down." }],
      },
      {
        heading: 'Penalties \u2014 Offense',
        content: [{ type: 'table', rows: [['Offsides', '5 yards & replay the down.'], ['Delay of Game', '5 yards & replay the down.'], ['Offensive Holding / Illegal Block', '5 yards & loss of down.'], ['Quarterback crossing the line of scrimmage prior to pass', '5 yards & loss of down.'], ['Forward pass caught behind the line of scrimmage', '5 yards & loss of down.'], ['Illegal procedure ("trips")', '5 yards & replay the down.'], ['Offensive pass interference', '5 yards & loss of down.'], ['Flag guarding', '10-yard penalty from the spot of infraction & loss of down. 1st down yardage prior to penalty results in 1st down. Flag guarding only occurs if the defender does NOT pull the flag \u2014 if the flag is pulled, it is not flag guarding. Most, if not all, flag football leagues have this fundamental rule.'], ['Unsportsmanlike conduct', '15-yard personal foul from the end of the play (the down counts). 1st offense: player sits out a series. 2nd offense: player suspended for the rest of the game. Loss-of-down penalties on a PAT attempt nullify the try (whether successful or not).'], ["Impeding the rusher", "The offensive player must avoid the rusher beyond the line of scrimmage. Contact or not, getting in the pass rusher's way is impeding the rusher. 5 yards and loss of down."]] }],
      },
      {
        heading: 'Penalties \u2014 Defense',
        content: [{ type: 'table', rows: [['Holding ball carrier / Illegal flag pull', '5 yards added to the end of the run.'], ['Stripping', '5 yards from the spot of the foul.'], ['Roughing the passer', '10 yards & automatic 1st down.'], ['Illegal rush (not 5 yards back)', '5 yards & replay the down or result of the play (offense may decline).'], ['Bull rush', '10 yards & replay the down.'], ["Illegal contact (the ball has not left the QB's hand)", '10 yards & replay the down.'], ['Pass interference', 'Automatic 1st down at the spot of the foul.'], ['Pass interference in the end zone', '1st & goal at the one-yard line.'], ['Unsportsmanlike conduct', '15-yard personal foul (automatic 1st down).'], ['Force out by the defender', 'Spot foul and automatic first down.']] }],
      },
      {
        heading: 'General',
        content: [{ type: 'list', items: ['First personal foul: Player will be suspended for 1 series (offense or defense). Second personal foul: Player is ejected from the game.', 'Fighting: Player is ejected from the game, potentially suspended, expelled from XFF and the team loses their forfeit bond.', 'Official clock: The clock will not stop if the losing team commits a penalty.', 'Zero tolerance for any verbal or physical abuse by any player or fan towards any XFF official (referee, Field Manager, owner, etc). Violation of this rule could result in an automatic ejection for the game and will be subject to further discipline by XFF management.'] }],
      },
    ],
  },
  {
    title: "Women's League Rules",
    filename: 'womens-league-rules',
    sections: [
      {
        heading: 'Team Roster',
        content: [
          { type: 'text', value: "Teams will be allowed to start a game with a minimum of 4 players. All players must read and sign the XFF waiver/roster before they are eligible to play. It is the team captain's responsibility to verify that each player has filled out the waiver and has read and signed the roster and waiver before any game is played. A roster player may be allowed to help another team in extenuating circumstances (ex. if a team needs enough to play a game), at the discretion of the XFF Field Manager but they are not eligible to play with another team during playoffs/championships." },
          { type: 'text', value: 'Teams may find substitute players to fill spots made by absentee roster players. The "Sub Fee" is $20 per doubleheader or $12 per single game and must be paid to the XFF Field Manager **BEFORE** being eligible to play. All "Subs" MUST fill out a Substitute Waiver prior to the start of game play. All Subs must be approved by the XFF Field Manager prior to the start of the first game. A "Sub" will only be allowed to play during the playoffs/championship week if they played at least 2 regular season games.' },
        ],
      },
      {
        heading: 'The Field',
        content: [{ type: 'text', value: 'Yard markers will denote midfield and end zone pylons will mark the goal line. Cones will mark the 1 PAT (5 yard line) and 2 PAT (10 yard line) and the "No Run" zone (5 yard line) before each End Zone. There will be a shared sideline between fields. No littering! Teams must clean up their sideline immediately after their game. Carry in, carry out. The sidelines/field are for roster players only. Spectators must stay away from the players on the sidelines. Teams are responsible for the behavior of their fans. Please be respectful.' }],
      },
      {
        heading: 'Equipment',
        content: [
          { type: 'text', value: "All players must wear the same color shirts/jerseys. Team captains will work with the XFF Field Manager to order and collect payment for team shirts/uniforms. The team captain will make payment to the Field Manager for all clothing (and registration fees). All shirts must have a number. **Shirts should be tucked in, and flag belts must be worn over a player's shirt.**" },
          { type: 'text', value: "Flags should sit on a player's hips and should be adjusted, if necessary, after each play." },
          { type: 'text', value: 'Baseball caps must be worn backwards. Jewelry is not allowed. Players who wear eyeglasses should wear sport goggles. Those players choosing to wear regular glasses do so at their own risk. All players should wear cleats. All players will use official adult sonic pop flag belts. XFF will have flag belts for your players to borrow for the games. If a player would like to purchase a flag belt from XFF they are $20 each. Youth flag belts are not allowed in any XFLAGFOOTBALL events. Belts are to be worn around the waist with flags on the hips.' },
        ],
      },
      {
        heading: 'Scheduling',
        content: [{ type: 'text', value: "XFLAGFOOTBALL reserves the right to modify the schedule and will notify affected team captains as soon as possible. It is the team captain's responsibility to communicate any changes to their players." }],
      },
      {
        heading: 'XFLAGFOOTBALL Code of Conduct',
        content: [
          { type: 'text', value: 'All players shall respect the calls of the XFF officials. Any player involved in fighting will be immediately ejected from the game and subject to further suspension at the discretion of the league. Games may be "double forfeited" due to fights. If this occurs, both teams get a "LOSS" and the game is over. Teams instigating fights will be expelled from the league. League fees will not be refunded for team expulsion due to fighting. Unsportsmanlike conduct, including trash talking and rough play will not be tolerated. This is a FLAG football league. **Anyone not abiding by the XFF Code of Conduct may be ejected from games and potentially suspended from league play. Any player who threatens or abuses (either physically or verbally) an XFF official before, during or after a game will be suspended from the league.**' },
          { type: 'text', value: "Reinstatement will be determined based on the severity of the incident. Regardless of whether it is intentional or not, players receiving a second personal foul in the same game will be automatically ejected. Counting down the five second play clock out loud is illegal. Officials will give one warning. The second offense is a 15 yard unsportsmanlike conduct penalty. Captains are responsible for distributing and asking their players to read the XFF league rules, waivers and Code of Conduct. **Only team captains are allowed to discuss calls and/or decisions with officials during the game.** A time out will be charged to the team if a captain chooses to argue a call." },
          { type: 'text', value: "XFF Referees have the discretion to penalize players/teams for violations not clearly outlined in the rules. (For example, having players sit out a series for a near scuffle, trash talking, etc). The ref's decision is final and binding. **Players are expected to respect the ref's calls and act as a responsible adult would.** Players in violation of this, place their future playing time in the hands of XFF Management. XFF reserves the right to suspend any particular player(s)/team(s) for an indefinite amount of time. XFLAGFOOTBALL's goal is to promote a safe, nonviolent league for players, their friends, family and fans." },
          { type: 'text', value: '**Teams are responsible for their sidelines and can be penalized an "unsportsmanlike conduct" penalty for their sideline (15 yards and automatic 1st down).** If a fan cannot control themself, they can be asked to leave the premises and failure to do so can result in a forfeit for the team.' },
        ],
      },
      {
        heading: 'Game Clock',
        content: [
          { type: 'text', value: 'Games will consist of two 17 minute halves. The timing of the halves may need to be adjusted due to unforeseen circumstances. Each team may use two 30 second time outs per half.' },
          { type: 'text', value: 'Halftime is 1 minute. The timing of time outs and halftime may also need to be adjusted due to unforeseen circumstances. If a team is leading by more than 20 points in the second half, they may not use their remaining time outs. The offense has 25 seconds between plays (officials count down time from setting the markers). Delay of game is a penalty (5 yards, replay the down). The game clock will be kept by an XFF official and may be stopped at their discretion.' },
          { type: 'text', value: 'The clock will stop during the last two minutes of the second half if the score is within 14 points (14 points or less) ("Regulation Clock") in the following situations:' },
          { type: 'list', ordered: true, items: ['Incomplete passes', 'Receiver steps out of bounds', 'Extra point attempts', 'Penalties by the team that is winning the game', 'Quarterback sacks (if the team that sacks is losing)', '"Five Second" penalties (If the team is winning)', 'Turnovers / Changes of possession', 'If a game is tied, then the team who makes a sack can decide is the clock runs or not.'] },
          { type: 'text', value: 'During Regulation Clock play, the clock will stop until the ball and markers are set in the following situations:' },
          { type: 'list', ordered: true, items: ['First downs', 'Defensive offsides (if that team is winning)', 'Offensive penalties (excluding quarterback sack and "Five Second" penalty).', 'The clock NEVER stops on a penalty if the foul is made by the team who is losing the game.'] },
        ],
      },
      {
        heading: 'Scoring',
        content: [
          { type: 'list', items: ['Touchdown: 6 points', '5 yard PAT: 1 point (pass only in red zone)', '10 yard PAT: 2 points (pass only in red zone)', 'Safety: 2 points', 'Interception return on a PAT attempt: 2 points'] },
          { type: 'text', value: 'As far as clock stoppage in the last 2 minutes of the game, if the score is within 14 points, the clock is stopped if an infraction is committed by the team that is winning but we do not stop the clock if a penalty is committed by the team that is losing. If it is a tie game, the opposing team gets to choose if the clock stops or not. If the team that is losing gets a sack the clock is stopped.' },
        ],
      },
      {
        heading: 'Forfeits',
        content: [{ type: 'text', value: 'A game will be forfeited if a team is unable to start (or complete) a game with at least 4 players. A forfeited game will be scored as 6-0.' }],
      },
      {
        heading: 'Overtime',
        content: [{ type: 'text', value: "If a game is tied at the end of regulation play, a tiebreaker will be played to determine the winner. Captains will meet with the official for a coin toss to determine possession of ball and what direction OT will go. Both teams are given 2 plays, with no time outs, from the same 10 yard line (similar to the college football overtime). If the first team is unsuccessful in scoring, the opposing team takes possession at the 10 yard line and has 2 plays to score. If they score, they win. If they are unsuccessful, they start with the ball for the next attempt. If the first team is successful in scoring, they have the option of going for 1 or 2 points. The opposing team then tries their 2 plays to score and, if successful, attempts a conversion to either tie or win the game. If the opposing team does not score a touchdown or does not match the first team's extra points, the game is over and the first team wins. If an interception occurs during overtime, the defense will take over at the 10 yard line unless the INT is returned for a TD. In this event, the defense will be awarded 6 points and the game will be over. If the game goes to a 3rd overtime, both teams must attempt 2 point conversions." }],
      },
      {
        heading: 'Coin Toss',
        content: [{ type: 'text', value: 'Officials will call each team captain for the coin toss prior to the game. Winner of the coin toss chooses to be on either offense or defense. Loser of coin toss decides direction of ball. After halftime, the teams switch sides. The team that started the game on defense gets the ball.' }],
      },
      {
        heading: 'Matriculation',
        content: [
          { type: 'text', value: 'Teams start possession at the 10 yard line. The offense has 4 downs to reach midfield and then 4 downs to get to the 10 and 3 downs to score. If a team does not score on their possession, the opposing team will get the ball at their 10 yard line.' },
          { type: 'text', value: 'Penalties will remain 5, 10 and 15 yards as described in the rule book.' },
        ],
      },
      {
        heading: 'Game Play',
        content: [
          { type: 'text', value: 'There must be at least one player on each side of the center and quarterback. The ball may not be snapped with a "trips" formation. Teams may line up with three receivers on one side but must motion out of that formation before the snap of the ball. Motion must be parallel to the line of scrimmage. The receiver must have control of the ball with at least one foot in bounds. **Where the ball is when the flag is pulled determines the LOS or end of the play.** If the ball crosses the plane (in the end zone or 1st down line) it is a TD or 1st down. The receiver must not leave their feet (jumping/diving) to avoid a defender. This will result in a 5 yard penalty.' },
          { type: 'text', value: 'Taking a knee does not stop the clock. Play clock will run until ball carrier is touched by a defender. The quarterback may intentionally ground the football. It is a legal play and there is no penalty. In the event of an inadvertent whistle, the offense has the option to either replay the down or to take the play at the point the whistle was blown (unless the inadvertent whistle occurs during an interception return, in which case the ball will be spotted where it was when the whistle was blown). All players are eligible to catch a forward pass so long as they are beyond the line of scrimmage.' },
          { type: 'text', value: 'The quarterback has 5 seconds to pass or hand off the ball. The QB may also run with the ball. In the event that the QB crosses the line of scrimmage before 5 seconds has occurred there is no more 5 second clock. Count starts on the snap of the ball. If the ball is not thrown or handed off within 5 seconds, it is a 5 yard penalty and loss of down. **The 5 second rule is in effect during a muffed snap, which is a live ball and may be recovered by the offense and thrown, or recovered by the defense and returned.** It is illegal for the defensive team to count the five seconds out loud (even from the sidelines). Officials will issue one warning. Teams will be assessed a 15 yard penalty for unsportsmanlike conduct on the second offense.' },
          { type: 'text', value: 'In the event of a deflected/batted ball by the defender that is caught by the quarterback, he may run with the ball (even though it may be caught behind the line of scrimmage). The quarterback may NOT throw the ball again. The quarterback can receive the snap from center either from between the center\'s legs or from a "turn and throw" method where the center may throw the ball to the quarterback from a standing position. Double passes ("throw backs") are legal, so long as the first pass is thrown laterally or backwards, and the second pass is released prior to the expiration of the five second play clock. Dropped double passes are down at the spot. The receiver of the handoff must throw the ball to a receiver beyond the line of scrimmage (or pitch it again) or advance the ball beyond the line of scrimmage before 5 seconds.' },
          { type: 'text', value: 'Hook and ladder plays are legal. A receiver may pitch the ball to another player, so long as the second player is even with, or behind the initial receiver. If the defense intercepts the pitch, it is a live ball and may be returned. If the ball hits the ground, it is dead at the spot. Flag guarding is illegal. It will result in a 10 yard penalty and loss of down. Flag guarding by the quarterback in the end zone is a safety.' },
          { type: 'text', value: 'The pass rusher must start at least seven yards from line of scrimmage. If the rusher jumps the snap count, she must go back behind the rush mark before continuing to rush the quarterback (but she can still rush). Rusher must go for the quarterback\'s flags. There is absolutely no stripping or attempting to knock the ball out of the QB\'s hands. Any player may rush so long as they start beyond 7 yards from the line of scrimmage. In the event of a double pass ("throwback") or handoff, anyone may rush the ball carrier (no 7 yard rule). **Roughing the passer (hit any part of the QB\'s arm, hand or head) is a 10 yard penalty and an automatic 1st down.** Minimal contact to the QB\'s hip or body while pulling the flag or attempting to pull the flag is part of the game and not considered roughing the passer.' },
          { type: 'text', value: '**Face guarding is a pass interference penalty. The defender must turn and look for the ball. Pass Interference (contact with the receiver while the ball is in the air) in the end zone will result in 1st and goal at the 1 yard line.** A receiver will be called for offensive pass interference if they push off the defender during a play. There is absolutely no stripping of the ball allowed. Players must attempt to pull the ball carrier\'s flags. **If a player inadvertently grabs a player\'s shirt (in an attempt to pull a flag) instead of the flag, the play continues until a flag is pulled and 5 yards are added onto the end of the play. If the offensive player\'s flag falls out during a play, they need to be touched to be ruled "down."** The defender may knock the ball away as a receiver is trying to establish possession, but once the ball is secured, it may not be stripped.' },
          { type: 'text', value: 'Interceptions are live and may be returned. One pitch or lateral is allowed on an interception return. An interception in the end zone \u2013 or inside the 10 yard line \u2013 and not advanced beyond the 10 yard line will be spotted at the 10. Fumbles are blown dead at the spot of the fumble with the exception of the snap. There is no change of possession (no piling on). Offensive offsides is a dead ball penalty. Five yard loss and replay the down. Defensive offsides is a "free play" for the offense. Five yards, replay the down (or take the result of the play).' },
          { type: 'text', value: '**If a ball carrier falls to the ground without being contacted by a defensive player, she may get up and run, unless touched while down.** All offensive players must be set before the snap. Only one player may be in motion at the snap. Motion must be lateral (no forward motion). If two or more players shift, they must be set before the snap. If the last defender available to make a play on a ball carrier holds, pushes, tackles, or in any way impedes the offensive player\'s progress without pulling the flags, the result of the play is a touchdown, unless declined by the offense. It is a judgment call by the official. There is no kicking in XFLAGFOOTBALL.' },
        ],
      },
      {
        heading: 'Outlawed Plays',
        content: [{ type: 'text', value: "#1 A QB cannot throw a forward pass to himself. It has to be at least touched by a player on the offense or defense (with some intent of doing so). #2 The QB cannot bounce the pass off the Center's back and run with it as a completed pass. Both of these calls will result in an incomplete pass and are at the discretion of the officials. The referee must blow the whistle on every change of possession. The defense may only call for offsides if the play results in a first down." }],
      },
      {
        heading: 'Penalties \u2014 Offense',
        content: [{ type: 'table', rows: [['Offsides', '5 yards & replay the down.'], ['Delay of Game', '5 yards & replay the down.'], ['Offensive Holding / Illegal Block', '5 yards & loss of down.'], ['Quarterback crossing the line of scrimmage prior to pass', '5 yards & loss of down.'], ['Forward pass caught behind the line of scrimmage', '5 yards & loss of down.'], ['Illegal procedure ("trips")', '5 yards & replay the down.'], ['Offensive pass interference', '5 yards & loss of down.'], ['Flag guarding', '10 yard penalty from spot of infraction & loss of down. 1st down yardage prior to penalty results in 1st down. Flag guarding only occurs if the defender does not pull the flag \u2014 if the flag is pulled, it is not flag guarding.'], ['Unsportsmanlike conduct', '15 yard personal foul from end of the play (the down counts). 1st offense: player sits out a series. 2nd offense: player suspended for the rest of the game. Loss-of-down penalties on a PAT attempt nullify the try (whether successful or not).'], ['Impeding the rusher', 'The offensive player must avoid the rusher beyond the line of scrimmage. Contact or not, getting in the pass rusher\'s way is impeding the rusher. The Center (moving or stationary) may not get in the Rusher\'s way \u2014 this is a "Blocking" penalty. 5 yards and loss of down. There is no screening or blocking on any play; the play is blown dead at the spot of the foul and a 5-yard loss is assessed.']] }],
      },
      {
        heading: 'Penalties \u2014 Defense',
        content: [{ type: 'table', rows: [["Holding ball carrier / Illegal flag pull (pulling a player's flag on purpose if they do not have the ball or pulling a player's flag before the ball is caught)", '5 yards added to end of run.'], ['Stripping', '5 yards from the spot of the foul.'], ['Roughing the passer', '10 yards & automatic 1st down.'], ['Illegal rush (not 7 yards back)', '5 yards & replay the down or result of the play (offense may decline).'], ["Illegal contact (the ball has not left the QB's hand)", '10 yards & replay the down.'], ['Pass interference', 'Automatic 1st down at the spot of the foul.'], ['Pass interference in the end zone', '1st & goal at the one yard line.'], ['Unsportsmanlike conduct', '15 yard personal foul (automatic 1st down).'], ['Force out by defender', 'Spot foul and automatic first down.']] }],
      },
      {
        heading: 'General',
        content: [{ type: 'list', items: ['First personal foul: Player will be suspended for 1 series (offense or defense). Second personal foul: Player is ejected from the game.', 'Fighting: Player is ejected from the game, potentially suspended, expelled from XFF.', 'Official clock: The clock will not stop if the losing team commits a penalty.', 'Zero tolerance for any verbal or physical abuse by any player or fan towards any XFF official (referee, Field Manager, owner, etc). Violation of this rule could result in an automatic ejection for the game and will be subject to further discipline by XFF management.'] }],
      },
      {
        heading: 'COVID-19 Precautions',
        content: [{ type: 'text', value: 'It is each individual\'s responsibility to stay home if they are not feeling well or have been in close contact with someone who has COVID. A COVID-19 Waiver must be signed before anyone takes the field. All people coming to play in or spectate a XFF event do so at their own risk. The Field Manager will notify team captains of any COVID protocols as they arise.' }],
      },
      {
        content: [{ type: 'text', value: '**XFLAGFOOTBALL reserves the right to make changes to this rule book at any time. Teams will be notified ASAP if changes are made**' }],
      },
    ],
  },
  {
    title: 'Championship Rules',
    filename: 'championship-rules',
    sections: [
      { heading: 'Overview', content: [{ type: 'text', value: 'At the end of each season, X Flag Football will offer a free, (Ref Fee ONLY) invitation-only tournament. The division winner from each location will receive an automatic invitation to the tournament. The remaining spots will be filled with "at-large" teams decided by a competition committee consisting of the owners of XFF, the field managers, and the officials. They will consider win/loss records during the regular season, the strength of wins, point differential over the season, the strength of the location, and the XFF computer rankings.' }] },
      {
        heading: 'Roster & Eligibility',
        content: [
          { type: 'text', value: 'The teams that are selected may only use players that are on their official roster. Players playing in multiple XFF locations must choose only one team to play on for the championships. You may not join another team once your team has been eliminated.' },
          { type: 'text', value: 'Identification will be checked before teams will be permitted to check into their first game to ensure that only players on the roster are playing.' },
        ],
      },
      { heading: 'Field Size', content: [{ type: 'text', value: 'The number of teams invited to the tournament will depend on the number of teams playing in X Flag Football leagues.' }] },
    ],
  },
  {
    title: 'Turf Field Rules',
    filename: 'turf-field-rules',
    sections: [
      {
        content: [{ type: 'list', ordered: true, items: ['No sunflower seeds, food, or drinks are allowed', 'Water and sports beverages are the only liquids allowed', 'Alcohol is prohibited at locations, including the parking lots', 'No gum, cigars, cigarettes, or other forms of tobacco', 'Violators will be banned from future attendance', 'There will be a zero-tolerance for those who violate any of the above rules', 'Team captains AND players are responsible for the conduct of their fans and guests', 'Failure to adequately supervise fans/guests will result in suspension and/or forfeiture of games', 'All decisions by XFF in regard to the above are final and binding'] }],
      },
    ],
  },
  {
    title: 'Youth Rules (5-Man Format)',
    filename: 'youth-rules',
    sections: [
      {
        heading: 'Game',
        content: [
          { type: 'text', value: 'At the start of each game, captains from both teams meet at midfield for the coin toss to determine who starts with the ball. The visiting team calls the toss.' },
          { type: 'text', value: 'The winner of the coin toss has the choice of offense or defense. The loser of the coin toss has the choice of direction. Possession changes to start the second half to the team that started the game on defense.' },
          { type: 'text', value: 'The offensive team takes possession of the ball at its 5-yard line and has three (3) plays to cross midfield. Once a team crosses midfield, it has three (3) plays to score a touchdown.' },
          { type: 'text', value: 'If the offense fails to score, the ball changes possession and the new offensive team starts its drive on its own 5-yard line.' },
          { type: 'text', value: 'If the offensive team fails to cross midfield, possession of the ball changes and the opposition starts its drive from its own 5-yard line.' },
          { type: 'text', value: "All possession changes, except interceptions, start on the offense's 5-yard line." },
          { type: 'text', value: 'Teams change sides after the first half. Possession changes to the team that started the game on defense.' },
        ],
      },
      {
        heading: 'Terminology',
        content: [{ type: 'list', items: ['**Boundary Lines:** The outer perimeter lines around the field. They include the sidelines and back of the end zone lines.', '**Line of Scrimmage (LOS):** An imaginary line running through the point of the football and across the width of the field.', '**Line-to-Gain:** The line the offense must pass to get a first down or score.', '**Rush Line:** An imaginary line running across the width of the field seven yards (into the defensive side) from the line of scrimmage.', '**Offense:** The team with possession of the ball.', '**Defense:** The team opposing the offense to prevent it from advancing the ball.', '**Passer:** The offensive player that throws the ball and may or may not be the quarterback.', "**Rusher:** The defensive player assigned to rush the quarterback to prevent him/her from passing the ball by pulling his/her flags or by blocking the pass.", '**Downs (1-2-3):** The offensive team has three attempts or "downs" to advance the ball. It must cross the line to gain to get another set of downs or to score.', '**Live Ball:** Refers to the period of time that the play is in action. Generally used in regard to penalties. Live ball penalties are considered part of the play and must be enforced before the down is considered complete.', '**Dead Ball:** Refers to the period of time immediately before or after a play.', '**Whistle:** Sound made by an official using a whistle that signifies the end of the play or a stop in the action for a timeout, halftime or the end of the game.', "**Inadvertent Whistle:** Official's whistle that is performed in error.", '**Charging:** An illegal movement of the ball-carrier directly at a defensive player who has established position on the field. This includes lowering the head or initiating contact with a shoulder, forearm or the chest.', "**Flag Guarding:** An illegal act by the ball-carrier to prevent a defender from pulling the ball-carrier's flags by stiff arm, lowering elbow or head or by blocking access to the runner's flags with a hand or arm.", '**Shovel Pass:** A legal pitch attempted beyond the line of scrimmage.', '**Lateral:** A backward or sideways toss of the ball by the ball-carrier.', '**Unsportsmanlike Conduct:** A rude, confrontational or offensive behavior or language.'] }],
      },
      {
        heading: 'Eligibility',
        content: [{ type: 'text', value: "All players' legal guardians must agree to and sign the XFLAGFOOTBALL waiver forms for their specific league before participating. A player may not participate in any XFF activities if their waivers have not been turned in." }],
      },
      {
        heading: 'Equipment',
        content: [{ type: 'list', items: ['XFLAGFOOTBALL provides each player with an official flag belt and a team jersey.', 'Teams will use footballs provided by the league.', 'Players must wear shoes. Cleats may not be allowed at certain locations. This will be specified in the league details you receive prior to the start of the season. However, cleats with exposed metal are never allowed and must be removed.', 'Players may tape their forearms, hands and fingers. Players may wear gloves, elbow pads and knee pads. Braces with exposed metals are not allowed.', 'Players must remove all jewelry, hats and do-rags. Winter beanies are allowed.', "Players' jerseys should be tucked into shorts or pants if they hang below the belt line.", "Flag belts may be worn over a player's shirt as long as the flag are fully exposed.", 'We recommend players wear shorts or pants that do not have pockets. Shorts or pants with belt loops or pockets must be taped. Games will not be delayed for a player to tape up pockets.', 'Flag belts cannot be the same color as shorts or pants.'] }],
      },
      {
        heading: 'Field',
        content: [
          { type: 'text', value: 'The field dimensions are 30 yards by 70 yards with two 10-yard end zones, and a midfield line-to-gain. No-run zones precede each line-to gain by 5 yards. However, XFLAGFOOTBALL may use smaller fields because of field space available or to complete game scheduling on time.' },
          { type: 'text', value: 'No-run zones are in place to prevent teams from conducting power run plays. While in the no-run zones (a 5-yard imaginary zone before midfield and before the end zone), teams cannot run the ball in any fashion. All plays must be pass plays, even with a handoff.' },
          { type: 'text', value: 'Stepping on the boundary line is considered out of bounds.' },
          { type: 'text', value: 'Each offensive team approaches only TWO no-run zones in each drive (one zone 5 yards from midfield to gain the first down, and zone 5 yards from the goal line to score a TD)' },
        ],
      },
      {
        heading: 'Rosters',
        content: [
          { type: 'text', value: 'Subs may be used to take the place of absent roster players. Subs must fill out a "Substitute Player Waiver" and pay a $25 sub fee to the Field Manager before the start of practice and games. Subs are allowed during regular season play and will only be allowed to play in the playoffs or championship game if they have played at least 2 regular season games. All players who play in playoffs must pay the full registration fee.' },
          { type: 'text', value: 'Teams must consist of at least five players with a maximum of 12 players.' },
          { type: 'text', value: 'Teams must start games with a minimum of four players. In the event of an injury, a team with insufficient substitute players may play with four players on the field but no fewer than four.' },
        ],
      },
      {
        heading: 'Timing and Overtime',
        content: [
          { type: 'text', value: 'Games are played on a 34-minute continuous clock with two 17 minute halves. Clock stops only for timeouts or injuries.' },
          { type: 'text', value: 'Halftime is 3 minute.' },
          { type: 'text', value: 'Each time the ball is spotted, a team has 30 seconds to snap the ball. Teams will receive one warning before a delay-of-game penalty is enforced.' },
          { type: 'text', value: 'Each team has one 30-second timeout per half.' },
          { type: 'text', value: 'Officials can stop the clock at their discretion.' },
          { type: 'text', value: 'In the event of an injury, the clock will stop then restart when the injured player is removed from the field of play.' },
          { type: 'text', value: 'If the score is tied at the end of regulation, an overtime period will be used to determine a winner.' },
        ],
      },
      {
        heading: 'Overtime Format',
        content: [
          { type: 'text', value: 'A coin flip will determine the team that chooses to be on offense or defense first. (If a second round of overtime must be played, the team that lost the coin toss will get to choose offense or defense for the start of the second round of overtime. This process continues with teams alternating who gets to choose to be on offense or defense to start out during every round of overtime.)' },
          { type: 'text', value: 'The referee will determine which end of the field the overtime will take place on.' },
          { type: 'text', value: "Each team will take turns getting one (1) play from the defense's 5-yard line for one point or the defense's 10-yard line for two points. Whether to go for one or two points is up to the offensive team. Whether or not the team that begins on offense converts the team that started on defense gets a chance on offense to win or tie by converting a one- or two-point play of their own." },
          { type: 'text', value: '**Example:**' },
          { type: 'text', value: 'Team A starts on offense and chooses to go for one point from the 5-yard line and is successful. Team B is then on offense and can choose to either go for one point from the 5-yard line to tie and force a second round of overtime or to go for two points from the 10-yard line for the win. If the second team on offense in an overtime round fails to beat or match the team that went first, the team that went first wins.' },
          { type: 'text', value: 'Both teams must "go for two" from the 10-yard line starting with the third round of overtime.' },
          { type: 'text', value: 'All regulation period rules and penalties are in effect.' },
          { type: 'text', value: 'There are no timeouts.' },
        ],
      },
      {
        heading: 'Scoring',
        content: [{ type: 'list', items: ['Touchdown: 6 points', 'PAT (point after touchdown): 1 point (5-yard line) or 2 points (10-yard line). *Note: 1-point PAT is pass only; 2-point PAT can be run or pass.*', 'A team that scores a touchdown must declare whether it wishes to attempt a 1-point conversion (from the 5-yard line) or a 2-point conversion (from the 10-yard line). Any change, once a decision is made to try for the extra point, requires a charged timeout. A decision cannot be changed after a penalty. Interceptions on conversions cannot be returned.', 'Safety: 2 points. A safety occurs when the ball-carrier is declared down in his/her own end zone. Runners can be called down when their flags are pulled by a defensive player, a flag falls out, they step out of bounds, their knee or arm touches the ground, a fumble occurs in the end zone or if a snapped ball lands in or beyond the end zone.', "If a team is leading by 3 touchdowns (18 points or more) they must take off the rush. This will allow the opposing team more time to get a play started. XFLAGFOOTBALL wants to send a message that while winning is great, building our player's confidence and giving them a chance to develop their skills is a priority.", 'Forfeits are scored 28-0 for the winning team.'] }],
      },
      {
        heading: 'Coaches',
        content: [{ type: 'list', items: ['Coaches are expected to adhere to XFLAGFOOTBALL philosophies, XFLAGFOOTBALL coaching guidelines and code of conduct.', 'Coaches are allowed on the field to direct players according to need and division.', 'Coaches must move to the sidelines before the snap of the ball.'] }],
      },
      {
        heading: 'Live Ball/Dead Ball',
        content: [
          { type: 'text', value: 'The ball is live at the snap of the ball and remains live until the official whistles the ball dead.' },
          { type: 'text', value: 'The official will indicate the neutral zone and line of scrimmage.' },
          { type: 'text', value: '*It is an automatic dead ball foul if any player on defense or offense enters the neutral zone. In regard to the neutral zone, the official may give both teams a "courtesy" neutral zone notification to allow their players to move back behind the line of scrimmage.' },
          { type: 'text', value: 'A player who gains possession in the air is considered inbounds as long as one foot comes down in the field of play.' },
          { type: 'text', value: 'The defense may not mimic the offensive team signals by trying to confuse the offensive players, while the quarterback is calling out signals to start the play. This will result in an unsportsmanlike conduct penalty.' },
          { type: 'text', value: 'Substitutions may be made on any dead ball.' },
          { type: 'text', value: 'Any official can whistle the play dead.' },
          { type: 'text', value: '**Play is ruled "dead" when:**' },
          { type: 'list', items: ['The ball hits the ground. If the ball hits the ground as a result of a bad snap, the ball is then placed where the ball hit the ground. In our youngest division, the ball may be picked up and play will continue.', "The ball-carrier's flag is pulled.", 'The ball-carrier steps out of bounds.', 'A touchdown, PAT or safety is scored.', "The ball-carrier's knee or arm hits the ground.", "The ball-carrier's flag falls out.", 'The receiver catches the ball while in possession of one or no flag(s).', 'The 7 second pass clock expires.', 'Inadvertent whistle.'] },
          { type: 'text', value: "**NOTE:** There are no fumbles. The ball is spotted where the ball-carrier's feet were at the time of the fumble. Or if the ball is pitched backward the ball is spotted where the ball hits the ground." },
          { type: 'text', value: 'In the case of an inadvertent whistle, the offense has two options:' },
          { type: 'list', items: ['Take the ball where it was when the whistle blew, and the down is consumed.', 'Replay the down from the original line of scrimmage.'] },
          { type: 'text', value: "A team is allowed to use a timeout to question an official's rule interpretation. If the official's ruling is correct, the team will be charged a timeout. If the rule is interpreted incorrectly, the timeout will not be charged and the proper ruling will be enforced." },
          { type: 'text', value: 'Officials should all agree upon any controversial call in order to give each team the full benefit of each call.' },
          { type: 'text', value: "The ball is spotted where the runner's feet are when the flag is pulled, not where the ball carrier has the ball. Forward progress will be measured by the player's front foot." },
          { type: 'text', value: 'The quarterback cannot directly run with the ball. The quarterback is the offensive player who receives the snap.' },
          { type: 'text', value: 'Only direct handoffs behind the line of scrimmage are permitted. Handoffs may be in front, behind or to the side of the offensive player but must be behind the line of scrimmage. The offense may use multiple handoffs.' },
          { type: 'text', value: '**Note:** "Center sneak" play is not allowed. The QB is not allowed to handoff to the center on the first handoff of the play.' },
          { type: 'text', value: 'Absolutely NO laterals of any kind.' },
          { type: 'text', value: 'No-run Zones are located 5 yards before each end zone and 5 yards on either side of midfield are designed to avoid short-yardage power-running situations. Teams are not allowed to run in these zones if the subsequent line is LIVE. (Reminder: Each offensive team approaches only TWO no-run zones in each drive \u2013 one 5 yards from midfield to gain the first down and one 5 yards from the goal line to score a TD).' },
          { type: 'text', value: 'Any player who receives a handoff can throw the ball from behind the line of scrimmage.' },
          { type: 'text', value: 'Once the ball has been handed off in front, behind or to the side of the quarterback, all defensive players are eligible to rush.' },
          { type: 'text', value: 'Runners may not leave their feet to advance the ball. Diving, leaping or jumping to avoid a flag pull is considered flag guarding.' },
          { type: 'text', value: 'Spinning is allowed, but players cannot leave their feet to avoid a flag pull.' },
          { type: 'text', value: '*Players spinning out of control will be called for flag guarding.' },
          { type: 'text', value: 'Runners may leave their feet if there is a clear indication that he/she has done so to avoid collision with another player without a flag guarding penalty enforced.' },
          { type: 'text', value: 'No blocking or "screening" is allowed at any time.' },
          { type: 'text', value: 'Offensive players without the ball must stop their motion once the ball has crossed the line of scrimmage. No running with the ball-carrier.' },
          { type: 'text', value: "Flag obstruction \u2013 All jerseys MUST be tucked in before play begins. The flags must be on the player's hips and free from obstruction. Deliberately obstructed flags will be considered flag guarding." },
        ],
      },
      {
        heading: 'Passing',
        content: [
          { type: 'text', value: 'All passes must be from behind the line of scrimmage, thrown forward and received beyond the line scrimmage.' },
          { type: 'text', value: '*All passes that do not cross the line of scrimmage, whether received or not, are illegal forward passes.' },
          { type: 'text', value: '*The quarterback may throw the ball away to avoid a sack. Pass must go beyond the line of scrimmage.' },
          { type: 'text', value: 'Shovel passes are allowed but must be received beyond the line of scrimmage.' },
          { type: 'text', value: 'The quarterback has a seven-second "pass clock." If a pass is not thrown within the seven seconds, the play is dead, the down is consumed and the ball is returned to the line of scrimmage. Once the ball is handed off, the 7-second rule is no longer in effect.' },
          { type: 'text', value: '*If the QB is standing in the end zone at the end of the 7-second clock, the ball is returned to the line of scrimmage (LOS).' },
        ],
      },
      {
        heading: 'Receiving',
        content: [
          { type: 'text', value: 'All players are eligible to receive passes (including the quarterback if the ball has been handed off behind the line of scrimmage).' },
          { type: 'text', value: 'Only one player is allowed in motion at a time. All motion must be parallel to the line of scrimmage and no motion is permitted toward the line of scrimmage.' },
          { type: 'text', value: 'A player must have at least one foot inbounds when making a reception.' },
          { type: 'text', value: 'In the case of simultaneous possession by both an offensive and defensive player, possession is awarded to the offense.' },
          { type: 'text', value: 'Interceptions change the possession of the ball at the point of interception.' },
          { type: 'text', value: 'Interceptions are the only changes of possession that do not start on the 5-yard line.' },
          { type: 'text', value: 'Interceptions are returnable but not on conversions after touchdowns.' },
        ],
      },
      {
        heading: 'Rushing the Passer',
        content: [
          { type: 'text', value: 'All players who rush the passer must be a minimum of seven yards from the line of scrimmage when the ball is snapped. Any number of players can rush the quarterback.' },
          { type: 'text', value: 'Players not rushing the quarterback can defend on the line of scrimmage.' },
          { type: 'text', value: 'Once the ball is handed off, the seven-yard rule no longer is in effect and all defenders may go behind the line of scrimmage.' },
          { type: 'text', value: 'A special marker, or the referee, will designate a rush line seven yards from the line of scrimmage. Defensive players should verify they are in the correct position with the official on every play.' },
          { type: 'text', value: 'A legal rush is: any rush from a point 7 yards from the defensive line of scrimmage.' },
          { type: 'text', value: '*A rush from anywhere on the field AFTER the ball has been handed off by the quarterback.' },
          { type: 'text', value: '*If a rusher leaves the rush line early (breaks the 7 yard area), they may return to the rush line, reset and then legally rush the quarterback.' },
          { type: 'text', value: "*If a rusher leaves the rush line early and the ball is handed off before he/she crosses the line of scrimmage, he/she may legally rush the quarterback." },
          { type: 'text', value: '**A penalty may be called if:**' },
          { type: 'list', items: ['The rusher leaves the rush line before the snap crosses the line of scrimmage before a handoff or pass \u2013 illegal rush (5 yards from the line of scrimmage and first down).', 'Any defensive player crosses the line of scrimmage before the ball is snapped \u2013 offsides (5 yards from line of scrimmage and first down).', 'Any defensive player not lined up at the rush line crosses the line of scrimmage before the ball is passed or handed off \u2013 illegal rush (5 yards from the line of scrimmage and first down).'] },
          { type: 'text', value: '**Special circumstances:**' },
          { type: 'list', items: ['Teams are not required to rush the quarterback with the seven second clock in effect.', 'Teams are not required to identify their rusher before the play.'] },
          { type: 'text', value: 'Players rushing the quarterback may attempt to block a pass; however, NO contact can be made with the quarterback in any way. Blocking the pass or attempting to block the pass and then making contact with the passer will result in a roughing the passer penalty.' },
          { type: 'text', value: 'The offense cannot impede the rusher in any way. The rusher has the right to a clear path to the quarterback, regardless of where they line up prior to the snap. If the "path or line" is occupied by a moving offensive player, then it is the offense\'s responsibility to avoid the rusher. Any disruption to the rusher\'s path and/or contact will result in an impeding the rusher penalty. **If the offensive player does not move after the snap, then it is the rusher\'s responsibility to go around the offensive player and to avoid contact.**' },
          { type: 'text', value: "A sack occurs if the quarterback's flags are pulled behind the line of scrimmage. The ball is placed where the quarterback's feet are when flag is pulled." },
          { type: 'text', value: "*A safety is awarded if the sack takes place in the offensive team's end zone." },
        ],
      },
      {
        heading: 'Flag Pulling',
        content: [
          { type: 'text', value: 'A legal flag pull takes place when the ball-carrier is in full possession of the ball.' },
          { type: 'text', value: 'Defenders can dive to pull flags but cannot tackle, hold or run through the ball-carrier when pulling flags.' },
          { type: 'text', value: "It is illegal to attempt to strip or pull the ball from the ball-carrier's possession at any time." },
          { type: 'text', value: "If a player's flag inadvertently falls off during the play, the player is down immediately upon possession of the ball and the play ends. The ball is placed where the flag lands." },
          { type: 'text', value: 'A defensive player may not intentionally pull the flags off of a player who is not in possession of the ball.' },
          { type: 'text', value: "Flag guarding is any attempt by the ball-carrier to obstruct the defender's access to the flags by stiff arming, dropping the head, hand, arm or shoulder or intentionally covering the flags with the football jersey." },
        ],
      },
      {
        heading: 'Formations',
        content: [
          { type: 'text', value: 'Offenses must have a minimum of one player on the line of scrimmage (the center) and up to four players on the line of scrimmage. The quarterback must be off the line of scrimmage.' },
          { type: 'text', value: '*One player at a time may go in motion 1-yard behind and parallel to the line of scrimmage.' },
          { type: 'text', value: '*No motion is allowed toward the line of scrimmage.' },
          { type: 'text', value: 'Movement by a player who is set or a player who runs toward the line of scrimmage while in motion is considered a false start.' },
          { type: 'text', value: "The center must snap the ball with a rapid and continuous motion between his/her legs to a player in the backfield, and the ball must completely leave his/her hands." },
        ],
      },
      {
        heading: 'Unsportsmanlike Conduct',
        content: [
          { type: 'text', value: "If the field monitor or referee witnesses any acts of intentional tackling, elbowing, cheap shots, blocking or any unsportsmanlike act, the game will be stopped and the player will be ejected from the game. The decision is made at the referee's discretion. No appeals will be considered. **FOUL PLAY WILL NOT BE TOLERATED!**" },
          { type: 'text', value: 'Offensive or confrontational language is not allowed. Officials have the right to determine offensive language. If offensive or confrontational language occurs, the referee will give one warning. If it continues, the player or players will be ejected from the game.' },
          { type: 'text', value: 'Players may not physically or verbally abuse any opponent, coach or official.' },
          { type: 'text', value: 'Ball-carriers MUST make an effort to avoid defenders with an established position.' },
          { type: 'text', value: 'Defenders are not allowed to run through the ball-carrier when pulling flags.' },
          { type: 'text', value: 'Fans must also adhere to good sportsmanship as well:' },
          { type: 'list', items: ['Yell to cheer on your players, not to harass officials or other teams.', 'Keep comments clean and profanity free.', 'Compliment ALL players, not just one child or team.'] },
          { type: 'text', value: 'Fans are required to keep fields safe and kids friendly:' },
          { type: 'list', items: ['Keep younger kids and equipment such as chairs a minimum of 10 yards off the field in the end zone area.', 'Stay along the sideline areas or end zones but away from players. Fans may not be between fields at any time.', 'Dispose of ALL trash in designated trash cans.'] },
          { type: 'text', value: '**Unsportsmanlike conduct penalties:**' },
          { type: 'list', items: ['Defense: +10 yards from line of scrimmage and automatic first down.', 'Offense: -10 yards from line of scrimmage and loss of down.'] },
        ],
      },
      {
        heading: 'Penalties \u2014 General',
        content: [
          { type: 'text', value: 'The referee will call all penalties.' },
          { type: 'text', value: 'Referees determine incidental contact that may result from normal run of play.' },
          { type: 'text', value: 'All penalties will be assessed from the line of scrimmage, except as noted. (Spot fouls)' },
          { type: 'text', value: 'Only the team captain or head coach may ask the referee questions about rule clarification and interpretations. Players may not question calls.' },
          { type: 'text', value: 'Games may not end on a defensive penalty unless the offense declines it.' },
          { type: 'text', value: 'Penalties are assessed live ball then dead ball. Live ball penalties must be assessed before play is considered complete.' },
          { type: 'text', value: 'Penalties will be assessed half the distance to the goal yardage when the penalty yardage is more than half the distance to the goal.' },
        ],
      },
      {
        heading: 'Defensive Spot Fouls',
        content: [{ type: 'table', rows: [['Defensive pass interference', 'Automatic 1st down'], ['Holding', 'Automatic 1st down'], ['Striping', '+10 yards and automatic first down']] }],
      },
      {
        heading: 'Offensive Spot Fouls',
        content: [{ type: 'table', rows: [['Screening, blocking or running with the ball', '-10 yards and loss of down'], ['Charging', '-10 yards and loss of down'], ['Flag Guarding', '-10 yards and loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Defensive unnecessary roughness', '+10 yards and automatic first down'], ['Defensive Unsportsmanlike conduct', '+10 yards and automatic first down'], ['Offside', '+5 yards from line of scrimmage and automatic first down'], ['Illegal rush (Starting rush from inside 7-yard marker)', '+5 yards from line of scrimmage and automatic first down'], ['Illegal flag pull (Before the receiver has the ball)', '+5 yards from line of scrimmage and automatic first down'], ['Roughing the passer', '+5 yards from line of scrimmage and automatic first down'], ['Taunting', '+5 yards from line of scrimmage and automatic first down']] }],
      },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Offensive unnecessary roughness', '-10 yards and loss of down'], ['Offensive unsportsmanlike conduct', '-10 yards and loss of down'], ['Offside / false start', '-5 yards from line of scrimmage and loss of down'], ['Illegal forward pass (Any pass received or lands behind the line of scrimmage or throwing a pass after crossing the line of scrimmage)', '-5 yards from line of scrimmage and loss of down'], ['Offensive pass interference', '-5 yards from line of scrimmage and loss of down'], ['Illegal motion (More than one person moving)', '-5 yards from line of scrimmage and loss of down'], ['Delay of game', '-5 yards from line of scrimmage and loss of down'], ['Impeding the rusher', '-5 yards from line of scrimmage and loss of down'], ['Illegal Procedure', '-5 yards from line of scrimmage and loss of down'], ['Run in a pass only zone', '-5 yards from line of scrimmage and loss of down, play remains pass only even if yardage takes them out of the zone']] }],
      },
    ],
  },
  {
    title: '5-Man League Rules',
    filename: '5-man-rules',
    sections: [
      {
        heading: 'Team Rosters',
        content: [{ type: 'text', value: 'Teams may carry up to 14 players on their roster. Players must play 4 games to be eligible for playoffs & Counties. All players must sign both the XFF waiver and roster before they are eligible to play. It is the team captain\u2019s responsibility to verify that each player has signed the roster and waiver before any game is played. It will be up to the discretion of the league whether or not a player will be allowed to play on multiple teams in one league. As a general rule, a "B" player may play on an "A" team, but an "A" player will not be allowed to play on a "B" (or "C") team. **Players may only play on one team per division in any XFF tournament.**' }],
      },
      {
        heading: 'The XFF Grid',
        content: [{ type: 'text', value: 'The playing field is 80 yards x 30 yards and consists of a 60-yard field of play and two 10-yard end zones. Yard markers will denote mid-field (the 30-yard line) and both 10-yard lines. End zone pylons will mark the goal line.' }],
      },
      {
        heading: 'Scheduling',
        content: [{ type: 'text', value: 'X Flag Football reserves the right to modify the schedule and will notify affected team captains as soon as possible. Schedule changes will also be posted on the XFF website. Captains and players are encouraged to check the online schedule for changes. Team captains are responsible for notifying their teammates of schedule changes.' }],
      },
      {
        heading: 'Equipment',
        content: [{ type: 'list', ordered: true, items: ['All players must wear the same color shirts/jerseys with permanent numbers on the back. All shirts must be tucked in. Baseball caps may be worn backward. Jewelry is not allowed. Starting week 2 of the season, teams will be penalized 2 points for each player wearing an illegal jersey.', 'All players should wear cleats (both molded and detachable are allowed). Tennis shoes are acceptable but are not recommended. **Metal cleats are strictly prohibited.** Anyone found wearing baseball "spikes" will be ejected from the game.', 'All players will use official Sonic pop flag belts (provided at the field). Belts are to be worn around the waist with flags on the hips.'] }],
      },
      {
        heading: 'XFF Code of Conduct',
        content: [{ type: 'list', ordered: true, items: ['All players shall respect the calls of the XFF officials.', 'Any player involved in fighting will be immediately ejected from the game and subject to further suspension at the discretion of the league. Games may be "double-forfeited" due to fights. Teams instigating fights will be expelled from the league. League fees will not be refunded for team expulsion due to fighting.', 'Unsportsmanlike conduct, including trash talking and rough play, will not be tolerated. This is a FLAG football league. Anyone not abiding by the XFF Code of Conduct may be ejected from games and potentially suspended from league play.', 'No littering! This includes sunflower seeds. Teams must clean up their sideline immediately after their game.', 'Any player who threatens or abuses (either physically or verbally) an XFF official before, during or after a game will be suspended from at least 1 week of games. Reinstatement will be determined based on the severity of the incident.', 'Regardless of whether it is intentional or not, players receiving a second personal foul in the same game will be automatically ejected.', 'Counting down the five-second play clock out loud is illegal. Officials will give one warning. The second offense is a 15-yard unsportsmanlike conduct penalty.', 'Captains are responsible for distributing the XFF rules and Code of Conduct to their team members. Only offensive or defensive captains are allowed to discuss calls and/or decisions with officials during the game.', "**XFF Referees have the discretion to penalize players/teams for violations not clearly outlined in the rules (for example, having players sit out a series for a near scuffle, trash-talking, etc). The ref's decision is final and binding. Players are expected to respect the ref's calls and act as responsible adults would. Players in violation of this, place their future playing time in the hands of XFF Management.**", "**XFF reserves the right to suspend any particular player(s)/team(s) from any location(s) for an indefinite amount of time. XFF's goal is to promote a safe, non-violent league for players, their friends and family.**"] }],
      },
      {
        heading: 'Game Clock',
        content: [{ type: 'list', ordered: true, items: ['Games will consist of two 20-minute halves.', 'Each team may use 3-time outs per half. If a team is leading by more than 28 points in the second half, they may not use their remaining time outs.', 'The offense has 25 seconds between plays (officials count downtime from setting the markers). Delay of the game is a penalty (5 yards, replay the down).', 'The game clock will be kept by an XFF official and may be stopped at their discretion.', 'The clock will stop during the last two minutes of the second half if the score is within 14 points (14 points or less) ("Regulation Clock") in the following situations: incomplete passes; receiver steps out of bounds; extra point attempts; defensive penalties (excluding offsides); quarterback sacks; "five-second" penalties; turnovers / changes of possession.', 'During Regulation Clock play, the clock will stop until the ball and markers are set in the following situations: first downs; defensive offsides; offensive penalties (excluding quarterback sack and "five-second" penalty).'] }],
      },
      {
        heading: 'Scoring',
        content: [{ type: 'list', ordered: true, items: ['Touchdown: 6 points', '5-yard PAT: 1 point', '10-yard PAT: 2 points', 'Safety: 2 points', 'Interception return for a touchdown on PAT attempt: 2 points'] }],
      },
      {
        heading: 'Forfeits',
        content: [{ type: 'list', ordered: true, items: ["A game will be forfeited if a team is unable to start (or complete) a game with at least 4 players. In the event of a forfeit, the forfeiting team will surrender their $70 forfeit bond to cover both the team's game fees. In order to continue playing for the season, the $70 forfeit bond must be replaced."] }],
      },
      {
        heading: 'Overtime',
        content: [{ type: 'list', ordered: true, items: ['If a game is tied at the end of regulation play, a tiebreaker will be played to determine the winner. Captains will meet with the official for a coin toss to determine possession of the ball.', "Both teams are given 2 plays, with no time outs, from the opponent's 10-yard line (similar to the college football overtime).", 'If the first team is unsuccessful in scoring, the opposing team takes possession at the 10-yard line and has 2 plays to score. If they score, they win.', "If the first team is successful in scoring, they have the option of going for 1 or 2 points. The opposing team then tries their 2 plays to score and, if successful, attempts a conversion to either tie or win the game. If the opposing team does not score a touchdown or does not match the first team's extra points, the game is over and the first team wins.", 'If an interception occurs during overtime, the defense will take over at the 10-yard line unless the INT is returned for a TD. In this event, the defense will be awarded 6 points and the game will be over.', 'If the game goes to a 3rd overtime, both teams must attempt 2-point conversions.'] }],
      },
      {
        heading: 'Coin Toss',
        content: [{ type: 'text', value: 'Officials will call each team captain for the coin toss prior to the game. Winner of the coin toss chooses to be on either offense or defense. The loser of the coin toss decides the direction of the ball. After halftime, the teams switch sides. The team that started the game on defense gets the ball.' }],
      },
      {
        heading: 'Matriculation',
        content: [{ type: 'text', value: 'Teams start possession at the 10-yard line (there are no kickoffs). The offense has 4 downs to reach the first down at mid-field (the 30-yard line), then 4 downs for another first down at the 10-yard line. Once inside the 10, the offense only has 3 downs to score a touchdown. If the defense stops the offense from scoring on 4th and goal, the ball will be placed on the 10-yard line regardless of where the stop was made.' }],
      },
      {
        heading: 'Game Play',
        content: [{ type: 'list', ordered: true, items: ['There must be at least one player on each side of the center and quarterback. The ball may not be snapped with a "trips" formation. Teams may line up with three receivers on one side but must move out of that form before the snap of the ball.', 'The receiver must have control of the ball with at least one foot in bounds.', 'The receiver must not leave their feet (jumping/diving) to avoid a defender. Will result in a 5-yard penalty.', 'Taking a knee does not stop the clock. The play clock will run until the ball carrier is touched by a defender.', 'The quarterback may intentionally ground the football. It is a legal play and there is no penalty.', 'In the event of an inadvertent whistle, the offense has the option to either replay the down or to take the play at the point the whistle was blown (unless the inadvertent whistle occurs during an interception return, in which case the ball will be spotted where it was when the whistle was blown).', 'All players are eligible to catch a forward pass so long as they are beyond the line of scrimmage.', 'The quarterback has 5 seconds to release the ball. The count starts on the snap of the ball. If the ball is not thrown within 5 seconds, it is a 5-yard penalty and loss of down. The 5-second rule is in effect during a muffed snap, which is a live ball and may be recovered by the offense and thrown, or recovered by the defense and returned.', 'It is illegal for the defensive team to count the five seconds out loud (even from the sidelines). Officials will issue one warning. Teams will be assessed a 15-yard penalty for unsportsmanlike conduct on the second offense.', 'In the event of a deflected/batted ball by the defender that is caught by the quarterback, he may run with the ball (even though it may be caught behind the line of scrimmage). The quarterback may NOT throw the ball again.', 'The quarterback can receive the snap from the center either from between the center\'s legs or from a "turn and throw" method where the center may throw the ball to the quarterback from a standing position.', 'Double passes ("throwbacks") are allowed, so long as the first pass is thrown laterally or backward and the second pass is released prior to the expiration of the five-second play clock. Dropped double passes are down at the spot.', 'Hand-offs, pitches, and laterals are all legal, but may not be advanced beyond the line of scrimmage. The receiver of the hand-off must throw the ball to a receiver beyond the line of scrimmage (or pitch it again). The 5-second rule is in effect and a forward pass must be thrown before the play clock expires.', 'Hook and ladder plays are legal. A receiver may pitch the ball to another player, so long as the second player is even with, or behind the initial receiver. If the defense intercepts the pitch, it is a live ball and may be returned. If the ball hits the ground, it is dead at the spot.', 'Flag guarding is illegal. It will result in a 10-yard penalty and loss of down. Flag guarding by the quarterback in the end zone is a safety.', 'The center may block the pass rusher. There is no blocking in the back and all blocks must be thrown with arms extended. Absolutely no cross-blocking, pull the defender down, holding, or blocks in the back. Other players may block the pass rusher, but there is no down-field blocking on receptions or interceptions. The play will be blown dead and the offending player may be called for an unsportsmanlike conduct penalty at the discretion of the official.', "Pass rusher must start at least five yards from the line of scrimmage. If the rusher jumps the snap count, he must go back behind the rush mark before continuing to rush the quarterback (but he can still rush). The rusher must go for the quarterback's flags. There is absolutely no stripping or attempting to knock the ball out of the QB's hands. Any player may rush so long as they start beyond 5 yards from the line of scrimmage. In the event of a double pass (\"throw-back\"), anyone may rush the ball carrier (no 5-yard rule).", 'Roughing the passer (hit any part of the QB hand) is a 10-yard penalty and an automatic 1st down.', 'Bull rushing is illegal. The pass rusher must pick a side of the blocker. He may not try to run through the center. The rusher may make contact with his arms fully extended. The rusher may not lower his shoulder into the blocker.', "Receivers may not interfere with the pass rusher's path to the quarterback. This is only in effect beyond the line of scrimmage. Receivers may stay back and block the pass rusher so long as they engage the rusher behind the line of scrimmage.", '"Canning" (blocking, bumping, checking, etc.) the center is not allowed unless the center crosses the line of scrimmage.', '"Bump & run" coverage is allowed by the defense as long as the initial bump occurs within one yard of the line of scrimmage. This bump may continue for 5 yards. The receiver may use release moves to escape the bump. All checking/bumping must be done with extended arms and open hands, between the waist and shoulders. Contact to the receiver\'s head or face is strictly prohibited. Defensive holding is a penalty. If the receiver is bumped out of bounds, he may reenter the field of play, but may not be the first player to touch the ball or it is an incomplete pass.', 'The defender cannot contact the receiver beyond 5 yards, or when the ball is in the air. Face guarding is a pass interference penalty. The defender must turn and look for the ball. Pass Interference in the end zone will result in 1st and goal at the one-yard line.', 'There is absolutely no stripping of the ball allowed. Players must attempt to pull the ball carrier\u2019s flags. The defender may knock the ball away as a receiver is trying to establish possession, but once the ball is secured, it may not be stripped.', 'Interceptions are live and may be returned. One pitch or lateral is allowed on an interception return. An interception in the end zone \u2013 or inside the 10-yard line \u2013 and not advanced beyond the 10-yard line will be spotted at the 10.', 'Fumbles are blown dead at the spot of the fumble. There is no change of possession (no piling on).', 'Offensive offsides is a dead ball penalty. Five yards, replay the down.', 'Defensive offsides is a "free play" for the offense. Five yards, replay the down (or take the result of the play).', 'If a ball carrier falls to the ground without being contacted by a defensive player, he may get up and run, unless touched while down.', 'All offensive players must be set for one second before the snap. Only one player may be in motion at the snap. The motion must be lateral (no forward motion). If two or more players shift, they must be set for one second before the snap.', "If the last defender available to make a play on a ball carrier holds, pushes, tackles, or in any way impedes the offensive player's progress without pulling the flags, the result of the play is a touchdown, unless declined by the offense. It is a judgment call by the official.", 'There is no kicking in X Flag Football. If the offense declares a "punt" on the 4th (or any) down, the ball will automatically be placed on the opponent\'s 10-yard line. If the offense elects to punt, then decides not to, a time out will be charged to that team. If the team has no time-outs left, they must punt.'] }],
      },
      {
        heading: 'Outlawed Plays',
        content: [{ type: 'list', ordered: true, items: ['A QB cannot throw a forward pass to himself. It has to be at least touched by a player on the offense or defense (with some intent of doing so).', 'The QB cannot bounce the pass off the centers back and run with it as a completed pass. Both of these calls will result in an incomplete pass and are at the discretion of the officials.', 'The referee must blow the whistle in on every change of possession.', 'The defense may only call for offsides if the play results in a first down.'] }],
      },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['Offsides', '5 yards & replay the down.'], ['Delay of Game', '5 yards & replay the down.'], ['Offensive Holding / Illegal Block', '5 yards & loss of down.'], ['Quarterback crossing the line of scrimmage prior to pass', '5 yards & loss of down.'], ['Forward pass caught behind the line of scrimmage', '5 yards & loss of down.'], ['Illegal procedure ("trips")', '5 yards & replay the down.'], ['Offensive pass interference', '5 yards & loss of down.'], ['Flag guarding', '10-yard penalty from the spot of infraction & loss of down. 1st down yardage prior to penalty results in 1st down. Flag guarding only occurs if the defender does NOT pull the flag \u2014 if the flag is pulled, it is not flag guarding.'], ['Unsportsmanlike conduct', '15-yard personal foul from the end of the play (the down counts). 1st offense: player sits out a series. 2nd offense: player suspended for the rest of the game. Loss-of-down penalties on a PAT attempt nullify the try (whether successful or not).'], ['Impeding the rusher', "The offensive player must avoid the rusher beyond the line of scrimmage. Contact or not, getting in the pass rusher's way is impeding the rusher \u2014 5 yards and loss of down."]] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Holding ball carrier / Illegal flag pull', '5 yards added to the end of the run.'], ['Stripping', '5 yards from the spot of the foul.'], ['Roughing the passer', '10 yards & automatic 1st down.'], ['Illegal rush (not 5 yards back)', '5 yards & replay the down or result of the play (offense may decline).'], ['Bull rush', '10 yards & replay the down.'], ["Illegal contact (the ball has not left the QB's hand)", '10 yards & replay the down.'], ['Pass interference', 'Automatic 1st down at the spot of the foul.'], ['Pass interference in the end zone', '1st & goal at the one-yard line.'], ['Unsportsmanlike conduct', '15-yard personal foul (automatic 1st down).'], ['Force out by defender', 'Spot foul and automatic first down.']] }],
      },
      {
        heading: 'General',
        content: [{ type: 'list', ordered: true, items: ['First personal foul: Player will be suspended for 1 series (offense or defense). Second personal foul: Player is ejected from the game.', 'Fighting: Player is ejected from the game, potentially suspended, expelled from XFF and the team loses their forfeit bond.', 'Official clock: The clock will not stop if the losing team commits a penalty.', 'Zero tolerance for any verbal or physical abuse by any player or fan towards any XFF official (referee, Field Manager, owner, etc). Violation of this rule could result in an automatic ejection for the game and will be subject to further discipline by XFF management.'] }],
      },
      {
        content: [{ type: 'text', value: '**RAIN \u2013 We will play in the rain unless the field is not playable. This is usually determined by the school district, city, or field manager. The schedule page will be updated to reflect the game status. If you DO NOT get a call or see the games canceled on the schedule page, then the GAMES ARE ON.**' }],
      },
    ],
  },
  {
    title: '8-Man Non-Eligible Rules',
    filename: '8-man-non-eligible-rules',
    sections: [
      {
        heading: 'Starting a Game',
        content: [{ type: 'list', ordered: true, items: ['All games will start at their scheduled time or as soon as possible if the preceding game runs into overtime.', 'At the beginning of each game, the referee will flip a coin to decide who will receive and who will kick, we will automatically switch directions at half time. NO MORE DEFERMENT.', 'At scheduled game time, a team must have at least 6 legal players on the field ready to play.', 'Teams cannot be forced to start earlier than scheduled but may start earlier if both teams agree.', 'In the event of a forfeited game, the teams will be allowed to use the field for a limited time to practice. The field must be vacated 10 minutes prior to the scheduled start of the next game.', 'The forfeiting team must pay for both team referee fees before they are able to play their next scheduled game.'] }],
      },
      {
        heading: 'Uniforms',
        content: [{ type: 'list', ordered: true, items: ["Jersey: The body of the jersey should be the same basic color and be numbered. If a player doesn't have a number he will be listed as #99 in the stat program.", 'Shoes: Only one-piece molded rubber shoes are acceptable or football cleats that screw INTO the shoe are acceptable. **NO METAL SPIKES.**', '**ALL PANTS/SHORTS MUST BE A DIFFERENT COLOR THAN THE FLAGS.**', 'Baseball caps must be worn backward.', 'Ball: The ball must meet specifications of size and shape for a regulation college football. Teams may use a ball of their choice when on offense. Teams must provide the game ball.', 'Flag Belt: All eligible players must wear flags; flag must be Flag-A-Tag Sonic Flag Football Belts.', 'The flags must be of contrasting color to the pants, pants trim and/or shorts.', 'No article of clothing shall cover any portion of the flag belt. Jerseys must be long enough to tuck in or short enough to a minimum height of 2 inches from the bottom of the jersey to the waist line. Penalty: 5 yards for any player involved with this infraction.', 'Teams must provide their balls and jerseys.', 'Padding: Helmets of any nature, shoulders or forearms of any kind is prohibited.', 'Stickum of any kind is not permitted.', 'All glasses must be prescription and strapped.'] }],
      },
      {
        heading: 'Timing',
        content: [{ type: 'list', ordered: true, items: ['All games shall be 40 minutes in duration, divided into 2-20-minute halves with a 5 minute half time. Each team receives 2 time outs per half. Referees are the official timekeepers.', '25-second play clock starts once ball is spotted by the official.', 'In the final 2 minutes of the game the clock stops for: Incomplete passes or spiking the ball to the ground, out of bounds, score, time out, non-loss of down penalties, change of possession and fair catch. (Ball must be spiked immediately; a delayed spike may result in intentional grounding). And ball can be spiked out of the shotgun formation.'] }],
      },
      {
        heading: 'Overtime Rule',
        content: [
          { type: 'text', value: 'In case of a tie score at the end of regulation play, the captains will be brought together for a coin toss and 1 endzone will be used the team that wins the coin toss will choose offense or defense, the team that starts on offense will choose 1 point conversion from 3-yard line or 2 point conversion from the 10-yard line if conversion attempt is failed the other team has the opportunity to win the game by scoring if that is not successful that team stays on offense and this process will continue.' },
          { type: 'list', items: ['If the team that starts first scores and the other team scores then overtime is continued.', 'If the team that starts first is unsuccessful and the other team scores then the game is over.', 'If a pass is intercepted during overtime it can be returned for a win.'] },
        ],
      },
      {
        content: [{ type: 'list', items: ['80 yards in length (total of 100 yards with end zones)', '40 yards wide', '10-yard end zones', 'First downs- marked at 20-yard intervals', '*Field size can be modified in the event the regular field is not available'] }],
      },
      {
        heading: 'Kick Off',
        content: [{ type: 'list', ordered: true, items: ['Kick-off begins each half of the game. Kick-off will take place from the twenty-yard line. The receiving team must have 4 players lined up at the 40-yard line when the ball is kicked. The ball must travel over the forty in the air if not ball is spotted where it hits the ground.', 'The touchback starting position is at the 20-yard line.', 'Kick-off out of bounds between the goal lines untouched inbounds by the receiving team is a foul (illegal procedure). The receiving team may take the ball where it goes out or at their 35-yard line.', "There are on-side kicks. Onside kicks can only be attempted in the final two minutes of the game and the losing team MUST be within 18 points. A successful onside kick is made if the ball is kicked pass the receiving team's 20-yard line and the kicking team prevents the receiving team from advancing the ball pass their own 20-yard line. a) Touchbacks & Illegal procedures will result in a FAILED onside kick. b) If a penalty is called on the receiving team and the result of the penalty is spotted inside their 20-yard line. This is a SUCCESSFUL onside kick. c) If the kicking team successfully achieves an onside kick, they will begin possession at their own 40-yard line."] }],
      },
      {
        heading: 'Game Play',
        content: [{ type: 'list', ordered: true, items: ['Receptions require 1 foot inbounds to be a completed pass.', "A minimum of 5 players must be on the line of scrimmage for the offense. (Three linemen and one eligible player on each side of the ball). Any time after the ball is set one player may be in motion, however, not toward their opponent's goal line until the ball is snapped.", 'Mercy Rule: If one team leads their opponent by 18 points or more when the referee announces the 2-minute warning, the game will be ended at that point.', '**Blocking Rule: OPEN HANDS ONLY. NO FOREARMS.**', "Hurdling: Ball carrier can only hurdle over falling players. Ball carrier's feet may leave the ground while making a football move but cannot leave the ground into a defender, must make an attempt to go around.", 'Lineman are not required to wear flags. If the flag falls off on its own it becomes one hand touch to the ball carrier.', "Blood Rule: Any time a player in the game is bleeding, he must leave the game until the bleeding is stopped and the wound is covered. Excessive blood on the uniform requires the player to change clothing. Teams must provide their own 1st aid kit.", '**Language – THERE WILL BE ZERO TOLERANCE ON VULGAR OR INAPPROPRIATE LANGUAGE BY TEAMS AND THEIR IDENTIFIABLE SPECTATORS. PLAYERS AND IDENTIFIABLE SPECTATORS THAT USE VULGAR OR INAPPROPRIATE LANGUAGE WILL BE IMMEDIATELY EJECTED FROM THE GAME AND THE PARK.**', "It is the responsibility of the offense to retrieve overthrown balls. If this rule is ignored the play clock will start on refs notification."] }],
      },
      {
        heading: 'Punting the Ball',
        content: [{ type: 'list', ordered: true, items: ['All punts must be declared. The snap must be a shotgun and punter must be at least 3 yards back from center. The defense must have at least 4 players at the line of scrimmage and 3 of them must be heads up.'] }],
      },
      {
        heading: 'Offense',
        content: [{ type: 'list', ordered: true, items: ['Center and 2 tackles are ineligible.', 'The center must snap the ball between the legs. Shotgun or direct snap.', 'The offense must line up with at least a tight end or receiver outside each tackle.', 'Scoring is 6 points for a touchdown, 1 point from 3-yard line, 2 points from the 10-yard line. All extra points can be returned for 2 points.'] }],
      },
      {
        heading: 'Defense',
        content: [{ type: 'list', ordered: true, items: ['Must have 3 men lined up heads up to center and 2 tackles.', 'Defender is allowed open hand blocking on receivers up to 5 yards from the line of scrimmage.'] }],
      },
      {
        heading: 'Penalties',
        content: [{ type: 'list', ordered: true, items: ['A player in the judgment of the official is taunting opponents or is arguing with an official will be given unsportsmanlike conduct.', 'Unsportsmanlike conduct / Personal foul\u2026 1st Offense: 15 yards or automatic 1st down. 2nd Offense: Same as above Plus player is ejected.'] }],
      },
      {
        heading: 'Offensive Penalties',
        content: [{ type: 'table', rows: [['False start/offsides', '5 yards (replay down)'], ['Illegal motion', '5 yards (replay down)'], ['Delay of the game', '5 yards (replay down)'], ['Illegal formation', '5 yards (replay down)'], ['Offensive Pass Inference', '10 yards + loss of down']] }],
      },
      {
        heading: 'Spot Fouls',
        content: [{ type: 'table', rows: [['Holding/illegal block/clipping/diving/hurdling', '10 yards from the spot'], ['Flag guarding', '10 yards from spot + loss of down'], ['Hands to face', '10 yards from the spot'], ["Intentional grounding", "10 yards from previous spot and loss of down. Or from the spot if penalty occurs more than 10 yards. If the penalty happens in the team's own end zone it's a safety."], ['Charging/lowering shoulder: running through a defensive player who has established position', '10 yards from spot + loss of down']] }],
      },
      {
        heading: 'Defensive Penalties',
        content: [{ type: 'table', rows: [['Offside', '5 yards'], ['Encroachment', '5 yards'], ['Pass interference', 'Spot foul + automatic 1st down'], ['Roughing the quarterback', '15 yards + automatic 1st down'], ['Defensive holding', '10 yards (spot foul)'], ['Illegal contact (contact on WR after 5 yards, the ball not in the air)', '5 yards spot foul'], ['Illegal formation (no 3 linemen or lineman not at least lined up on shoulder)', '5 yards'], ['Hands to face', '10 yards from the spot'], ['Tackling', '10 yards penalty from the spot'], ['Last Man Rule \u2014 last defender tackles the ball carrier who has a clear path to the end zone', 'Offense awarded first and goal from the one-yard line'], ['Defender fails to hand the flag back to the ball carrier after pulling it', 'Delay of game \u2014 10-yard penalty'], ['Pushing player out of bounds', 'Roughing \u2014 15-yard penalty']] }],
      },
    ],
  },
  {
    title: '8-Man Eligible Rules',
    filename: '8-man-eligible-rules',
    sections: [
      { content: [{ type: 'text', value: 'THE FOLLOWING INFORMATION IS INTENDED TO GIVE TEAMS AND PLAYERS A GENERAL GUIDE OF THE RULES UNDER WHICH XFLAGFOOTBALL 8 MAN LEAGUE PLAYS.' }] },
      { heading: 'Playing Field', content: [{ type: 'text', value: 'The Elite, A & B Divisions of the X Flag Football League plays on regulation 45 x 100-yard fields with 10-yard end zones. The C and some B division games are played on a 45 x 80-yard field. All teams may play on the larger fields during playoffs and Championship games.' }] },
      { heading: 'First Down', content: [{ type: 'text', value: 'There are four (4) first down "ZONES TO GAIN" of 20 yards each. Once a first down is gained, it may not be re-crossed during the same series.' }] },
      {
        heading: 'Time',
        content: [
          { type: 'text', value: 'The game consists of four (4) quarters of 12 minutes each. Clock stops only on a called time-out or injury. However, in the last two (2) minutes of the half and game, time is kept according to regular "Stop Clock" rules. The clock stops on the following:' },
          { type: 'list', ordered: true, items: ['Incomplete Pass', 'Time Out', 'Out of Bounds', 'Penalty (If a team commits an intentional penalty to stop the clock it will be Unsportsmanlike Conduct 15-yard penalty and a 30 second time runoff)', 'The offense has 25 seconds to put the ball in play after the official declares it ready.', 'Teams have three time-outs per half. They may not be carried if unused.', 'Any player on the field may call time out.'] },
        ],
      },
      { heading: 'Format', content: [{ type: 'text', value: 'X Flag Football 8 Man plays with eight (8) players aside. A team may start the game with seven (7) players. If at any time during the game a team can only field six (6) players the game will be called. The opposing team may either take the score at the time of the forfeit or a 7-0 win.' }] },
      {
        heading: 'Rosters',
        content: [
          { type: 'text', value: "Teams can put a maximum of 20 players on their roster. Rosters are due before the first game of the season. Rosters become frozen after teams 4th game of the season. Within the first 2 weeks of the season and prior to the 4th game, a player may decide to play for another team in the league. However, a player may play in only one game during the day." },
          { type: 'list', ordered: true, items: ['Players that are rostered on an Elite Division team may not be picked up as a player in the lower-division game that needs players to start a game.'] },
        ],
      },
      {
        heading: 'Padding & Equipment',
        content: [{ type: 'list', ordered: true, items: ['No pads are allowed on any part of the upper torso including arms and hands. (kneepads are o.k.).', 'Ace bandages are accepted for muscle pulls, except when used to support another padding.', 'Mouthpieces and eye protection are encouraged.', 'Knee brace and lower limb prosthesis hinges must be covered (neoprene wrap).', 'Hats with brims (baseball cap, etc) are not allowed. Headgear that have ends that could be pulled are not allowed.', 'No casts of any kind may be worn.', 'No metal cleats of any kind are allowed on the playing field.', 'The team must always wear the same colored uniform. Teams shall bring to the game an opposite set/color (Dark/Light) of uniform tops. If two teams are wearing the same color tops, a coin toss will determine who wears team colors.', 'Team must provide flags and footballs.', 'Footballs must be official Collegiate or NFL size and weight.'] }],
      },
      {
        heading: 'Kick-offs & Punts',
        content: [
          { type: 'text', value: "There are no kick-offs. The ball is placed on team's own 20-yard line at the beginning of the game, the start of the second half and after all scores." },
          { type: 'list', ordered: true, items: ['All declared punts must be announced to the referee before the ball is ready for play.', 'Kicking team must re-declare punts on any replay of down, including time-outs.', 'No direct snap is allowed.', 'A scrimmage kick, which fails to cross the scrimmage line, continues in play and all players are eligible to catch the ball and advance it.', 'The player must punt the ball used by the offense. Teams cannot bring in a different ball just for punts.', 'Upon possession of the snap, the punter must immediately attempt to kick the ball in a continuous and forward motion.'] },
        ],
      },
      {
        heading: 'Scoring',
        content: [
          { type: 'text', value: 'Teams will be given a total of six (6) points for touchdowns. Teams may attempt extra points by either running or passing the ball into the end zone after a score. The point total is as follows:' },
          { type: 'list', ordered: true, items: ['One (1) point conversion \u2013 attempted from the 5-yard line.', 'Two (2)-point conversion \u2013 attempted from the 10-yard line.', 'On Extra point attempts, Defense may score if the situation allows (I.E. Intercepted pass) If scored, teams receive 2pts.', 'Safety \u2013 Teams scoring a safety is awarded Two (2) points. Scoring Team regains possession of the ball on its own 40-yard line (20-yard line on C Division field), or back to Mid-field in overtime play.'] },
        ],
      },
      {
        heading: 'Fumbles',
        content: [{ type: 'list', ordered: true, items: ['All fumbles and muffs (When possession has or has not been made and the ball touches the ground) are "DEAD" and belong to the team last in possession. (Ball placed at the spot of last possession.)'] }],
      },
      {
        heading: 'Exceptions',
        content: [{ type: 'list', ordered: true, items: ['On a punt. If receiving team muffs a kick. The receiving team will receive the ball at the spot of touch.', 'On a declared punt, a muffed ball by the punter is not dead. The punter may pick up the ball and punt.'] }],
      },
      {
        heading: 'Offense \u2014 Formations & Procedures',
        content: [{ type: 'list', ordered: true, items: ['Everyone is eligible to receive passes, laterals, and hand-offs.', 'The offense must have four (4) players on the line of scrimmage at the snap of the ball.', 'Shifts are allowed.', 'One man in motion is allowed. Note: A receiver who goes in motion from the line of scrimmage, must retreat a minimum of 5 yards before going in motion.', '3 & 4-point stances are allowed.', 'Players on Line of scrimmage must keep shoulders square to the line of scrimmage.', 'Direct runs are allowed \u2013 A hand-off or pass is not required.'] }],
      },
      {
        heading: 'Offense \u2014 Blocking',
        content: [{ type: 'list', ordered: true, items: ['Blocking is with hands open and palms facing opponent and arms extended.', 'The player must stay on their feet when blocking an opponent.', 'No chop blocks.', 'A player may not leave their feet to block an opponent.', 'No contact of any kind is permitted above the shoulders and below the waist.', 'No tripping.', 'Limited use of hands is permitted by the offense lineman on pass blocking, hands may be thrust forward, but contact must be inside the frame.', 'No blocking with forearms or elbows.', '"Two on One" blocking is permitted only from the line of scrimmage and behind.'] }],
      },
      {
        heading: 'Offense \u2014 Passing',
        content: [{ type: 'list', ordered: true, items: ['The offensive team may throw unlimited forward passes as long as the passer is behind the line of scrimmage.', 'Passer may immediately spike the ball forward to the ground to stop the clock.'] }],
      },
      {
        heading: 'Offense \u2014 Running',
        content: [{ type: 'list', ordered: true, items: ['The runner may not guard flags, straight-arm, or run into (charge) A defender.', 'The runner must attempt to avoid the defender.', 'The player must start the play with flags.', 'A runner who has possession of the ball and loses their flags during a play without them being de-flagged by an opponent may simply be touched by a defender between the shoulders and the knees.'] }],
      },
      {
        heading: 'Defense \u2014 Formations & Procedures',
        content: [{ type: 'list', ordered: true, items: ['Any formation is allowed.', 'The defense may use hands, but not hold the opponent.', 'Bump and run-pass defense are allowed until the ball is thrown. The five-yard bump rule and the NFL one bump rule do not apply. Defensive interference does not apply until the pass crosses the line of scrimmage.', 'The defense may not hold, tackle or push a runner out of bounds.', 'The defense may strip the ball from the runner or quarterback if, in the judgment of the official, the defender did not commit any foul (holding, roughing or tackling the ball carrier).'] }],
      },
      {
        heading: 'Overtime',
        content: [
          { type: 'text', value: 'If after the end of regulation play the game is tied, the following format will be followed:' },
          { type: 'text', value: '**Hybrid Collage Rules:**' },
          { type: 'list', ordered: true, items: ['Coin Toss. The winner of the coin toss picks O or D.', 'Each team will start at the 20 goings into the Goal line and gets 4 plays.', "If the 1st team does not score we will note the yardage they gain. To win the game the other team must out gain the 1st team or score a touchdown.", "If the 1st team scores, they can choose to go for 1 or 2 PAT. The opposing team must match the 1st team's point total. If the 2nd team achieves a greater point total the game will be over. If both teams SCORE a touchdown and they match PATs then a 2nd Over Time will be played with the opposite team starting with the ball.", 'If the game reaches a 3rd Over Time teams MUST go for a 2PAT after a score and gameplay will continue until a team wins.', 'Penalties are enforced as normal.'] },
        ],
      },
      { heading: 'Penalties', content: [{ type: 'text', value: 'All penalties are 5, 10 & 15 yards.' }] },
      {
        heading: 'Protests',
        content: [
          { type: 'text', value: '**Rule Interpretation:**' },
          { type: 'text', value: 'Protests pertaining to rule interpretation will be handled on the field. The manager must use a time-out to question a rule interpretation. If officials decide that the rule was enforced incorrectly, then the team will receive their time-out back. If officials decide the play will stand as called, the team will forfeit the called time-out.' },
          { type: 'text', value: '**Illegal Player:**' },
          { type: 'text', value: 'If a manager believes that a team is playing an ineligible. The following procedure should be followed:' },
          { type: 'list', items: ['Before the game: To prevent a protest: Request the official to ask the opposing manager about the eligibility of the player.', "During the game: The manager may officially protest the eligibility of a player anytime before the game has ended. If the roster is not available for verification, the official will then write the name of the protested player on stat card, notify the opposing manager that the game is under protest and then resume play. The official will then submit a protest to League Director who will check the official roster."] },
          { type: 'text', value: 'The playing of an ineligible player will result in an automatic forfeit and the suspension of that player (To be determined by League Director) and suspension of the manager (To be determined by League Director). In addition, The opposing manager may take the result/score of the game played or a 7-0 forfeit win.' },
        ],
      },
      { heading: 'Rough and Dangerous Play', content: [{ type: 'text', value: 'Rough and dangerous play will at no time and under no circumstances be tolerated. Game officials will enforce all rules strictly, especially those relating to safety and sportsmanship (Taunting of Teams, players, officials, and spectators). If after one warning by the official the manager cannot restrain team/player the official may forfeit the game.' }] },
      { heading: 'Profanity', content: [{ type: 'text', value: "Because of numerous complaints by users in the park about the consistent use of profanity by players, the league will institute the Profanity rule. Officials are directed by the league to penalize players (15 yards Unsportsmanlike Conduct) for loud profanity. Any player penalized for a second Unsportsmanlike penalty will be ejected from the game. Remember that there are other users in the park, especially kids. This applies to sideline conduct as well. Please assist the league in reminding your players and spectators of this unnecessary behavior." }] },
      { heading: "Ejection's", content: [{ type: 'text', value: "Players ejected from the game must leave the playing area (including sidelines) if directed by the official or League Director within 3 minutes. The manager must provide to the official full name of the ejected player. The ejection of a player(s) is an automatic 1 game suspension. Officials do have the authority to eject a player for only the game played. League Director has the discretion of all disciplinary actions. **Players ejected from more than one game during the course of the season will be removed from the balance of the season.**" }] },
      { heading: 'League/Team/Player/Official/Spectator Conduct', content: [{ type: 'text', value: "XFLAGFOOTBALL will not tolerate any physical or verbal abuse from any team, player, official or spectator towards any team, player, official or spectator. Individuals or teams who continue to disregard this rule will be removed from the league. Individuals who cause bodily harm to another player, official or spectator will be subject to immediate removal from the league and an incident report will be filed with the San Diego Police Department. **ALL THREATS WILL BE TAKEN SERIOUSLY!!!**" }] },
      {
        heading: 'Blood Rule',
        content: [
          { type: 'text', value: 'A player, coach or official who is bleeding, or has an open wound or has blood on his body or clothing, shall be prohibited from participating further in the game until appropriate treatment has been administered. If first aid is required for the player, the player must be immediately removed from the game unless treatment can be administered within a reasonable amount of time.' },
          { type: 'text', value: 'A player, coach or official will not be allowed to participate unless:' },
          { type: 'list', items: ['All bleeding has been stopped.', 'Any exposed cut or scrape, which has bled has been completely covered.', 'Bloody clothing has been removed, disposed of properly and replaced.'] },
        ],
      },
      { heading: 'Alcohol', content: [{ type: 'list', ordered: true, items: ['Alcoholic beverages are not allowed on the playing field or to be consumed while playing. Players in an inebriated condition will not be allowed to play.'] }] },
      {
        heading: 'Miscellaneous',
        content: [
          { type: 'list', ordered: true, items: ['Children must be supervised at all times and be at least 15 yards from the sideline.', 'Spectators must be at least 10 yards from the sideline.', 'Children will not hold the down marker.'] },
          { type: 'list', items: ['No vehicles on the field. (City Regulation \u2013 Violators may be Cited by Police or Park Rangers)', 'No glass containers are allowed in the park. (City Regulation \u2013 Violators may be Cited by Police or Park Rangers)', 'No Smoking in the park. (City Regulation \u2013 Violators may be Cited by Police or Park Rangers)', 'Managers are responsible for cleaning up their team\u2019s trash. Please use trash receptacles that are provided on the sidelines. (City Regulation \u2013 Violators may be Cited by Police or Park Rangers)', 'No dogs allowed in the area or areas surrounding the playing areas. (City Regulation \u2013 Violators may be Cited by Police or Park Rangers)', 'No Bicycles on the field!!! Lock Bicycles to bike racks located throughout the park.'] },
        ],
      },
    ],
  },
  {
    title: '$100 Referral Program',
    filename: 'referral-program',
    sections: [
      {
        heading: 'How It Works',
        content: [{ type: 'list', items: ['We offer a **$100.00 discount** off of your registration fees for any teams you refer to X Flag Football.', 'The credit will be given once the referred team pays their full registration fees and forfeit the bond.'] }],
      },
    ],
  },
];