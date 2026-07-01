import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function PdfDownload({ filename }: { filename: string }) {
  const slug = filename.replace('.pdf', '');
  return (
    <a href={`/api/rules/pdf/${slug}`} download={filename} className="rules-download-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
      </svg>
      Download PDF
    </a>
  );
}

export const metadata = {
  title: 'Rules | XFlag Football',
  description: 'Official XFlag Football rules for all leagues and formats.',
};

export default function Rules() {
  return (
    <>
    <style>{`
      .rules-download-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #c8102e;
        color: #fff;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.2s ease;
      }
      .rules-download-btn:hover {
        background-color: #a00d24;
        color: #fff;
        text-decoration: none;
      }
      .rules-download-btn svg {
        flex-shrink: 0;
      }
    `}</style>
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>Rules</li>
          </ul>
        </div>
      </div>
      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>Rules</h1>
        </div>
      </section>
      <section className="section-padding bg-white text-dark rules-page-content">
        <div className="container">
          <div className="accordion" id="rulesAccordion">

            {/* ── 1. Coed Rulebook ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading1">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                  Coed League Rules
                </button>
              </h2>
              <div id="collapse1" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading1" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Team Rosters</h5>
                  <ul>
                    <li>Maximum 12 players per roster.</li>
                    <li>Players may be added through the 5th game.</li>
                    <li>All players must sign the XFF waiver and be on the official roster before playing.</li>
                  </ul>

                  <h5>The XFF Grid</h5>
                  <ul>
                    <li>Field: 80 yards × 30 yards (60-yard playing field + two 10-yard end zones).</li>
                    <li>Midfield/line-to-gain at the 30-yard line.</li>
                  </ul>

                  <h5>Equipment</h5>
                  <ul>
                    <li>Same-color jerseys with permanent numbers, tucked in at all times.</li>
                    <li>No jewelry of any kind.</li>
                    <li>Official Sonic pop flag belts worn on hips.</li>
                    <li>Molded or detachable cleats are allowed. <strong>No metal cleats.</strong></li>
                    <li>Caps must be worn backward (no bills forward).</li>
                  </ul>

                  <h5>Scheduling</h5>
                  <ul>
                    <li>XFF reserves the right to modify the schedule at any time.</li>
                  </ul>

                  <h5>Code of Conduct</h5>
                  <ul>
                    <li>Respect all officials at all times.</li>
                    <li>Fighting results in immediate ejection, suspension, and possible expulsion from the league, plus forfeiture of the forfeit bond.</li>
                    <li>Trash talking is not tolerated.</li>
                    <li>No littering, including sunflower seeds.</li>
                    <li>Zero tolerance for verbal or physical abuse of officials — violators face suspension from the league.</li>
                    <li>1st personal foul: player sits out one series.</li>
                    <li>2nd personal foul: automatic ejection.</li>
                    <li>Counting the 5-second clock aloud is illegal: warning first, then 15-yard penalty.</li>
                    <li>Only team captains may discuss calls. If a non-captain argues, one timeout is charged.</li>
                    <li>Officials' decisions are final.</li>
                  </ul>

                  <h5>Game Clock</h5>
                  <ul>
                    <li>Two 20-minute halves.</li>
                    <li>3 timeouts per half per team. No timeouts allowed if leading by 28+ points.</li>
                    <li>25-second play clock.</li>
                    <li>Last 2 minutes: clock stops (if score within 14 points) on — incomplete passes, out-of-bounds, extra-point attempts, winning-team penalties, sacks (if losing team makes), 5-second violations (if winning team commits), turnovers, first downs, defensive offsides (if winning team commits), and offensive penalties.</li>
                  </ul>

                  <h5>Scoring</h5>
                  <ul>
                    <li>Touchdown = 6 points</li>
                    <li>PAT from 5-yard line = 1 point</li>
                    <li>PAT from 10-yard line = 2 points</li>
                    <li>Safety = 2 points</li>
                    <li>Interception return on a PAT attempt = 2 points</li>
                  </ul>

                  <h5>Forfeits</h5>
                  <ul>
                    <li>Minimum 4 players required to start; fewer = forfeit.</li>
                    <li>Forfeiting team surrenders a $60 forfeit bond.</li>
                  </ul>

                  <h5>Overtime</h5>
                  <ul>
                    <li>College-style overtime from the 10-yard line.</li>
                    <li>Coin toss determines first possession.</li>
                    <li>Starting in the 3rd overtime, teams must attempt the 2-point PAT.</li>
                  </ul>

                  <h5>Coin Toss</h5>
                  <ul>
                    <li>Winner chooses offense or defense; loser chooses direction.</li>
                    <li>Teams switch sides at halftime; the defense from the first half receives the ball to start the second half.</li>
                  </ul>

                  <h5>Matriculation (Series of Downs)</h5>
                  <ul>
                    <li>Offense starts at own 10-yard line.</li>
                    <li>4 downs to cross midfield (30-yard line).</li>
                    <li>4 downs to reach the 10-yard line.</li>
                    <li>3 downs to score from the 10-yard line.</li>
                    <li>Rush cone is placed 7 yards downfield from the line of scrimmage.</li>
                  </ul>

                  <h5>Game Play — No Contact Coed Format</h5>
                  <ul>
                    <li>Minimum 2 female players on the field at all times for each team.</li>
                    <li>Every 3rd play, a female player must be the intended receiver or must attempt a pass.</li>
                    <li>No trips formation; only lateral motion is allowed pre-snap.</li>
                    <li>QB has 5 seconds to release the ball.</li>
                    <li>No blocking beyond the line of scrimmage.</li>
                    <li>Pass rusher must start at least 7 yards from the line of scrimmage.</li>
                    <li>No bump-and-run coverage.</li>
                    <li>Face guarding is <strong>not</strong> pass interference — physical contact is required for PI.</li>
                    <li>Interceptions are live and returnable.</li>
                    <li>Fumbles are dead at the spot.</li>
                    <li>No kicking; a declared punt automatically gives the opponent the ball at their 10-yard line.</li>
                    <li>Outlawed plays: QB cannot pass to themselves; QB cannot bounce off the center's back.</li>
                  </ul>

                  <h5>Offensive Penalties</h5>
                  <table className="table table-bordered table-sm mt-2">
                    <thead className="table-dark">
                      <tr><th>Foul</th><th>Penalty</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Offsides</td><td>5 yards, replay down</td></tr>
                      <tr><td>Delay of game</td><td>5 yards, replay down</td></tr>
                      <tr><td>Holding / Illegal block</td><td>5 yards + loss of down</td></tr>
                      <tr><td>QB crossing LOS before pass</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Forward pass thrown behind LOS</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Illegal procedure (trips formation)</td><td>5 yards, replay down</td></tr>
                      <tr><td>Offensive pass interference</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Flag guarding</td><td>10 yards + loss of down</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>15-yard personal foul</td></tr>
                      <tr><td>Impeding the rusher</td><td>5 yards + loss of down</td></tr>
                    </tbody>
                  </table>

                  <h5>Defensive Penalties</h5>
                  <table className="table table-bordered table-sm mt-2">
                    <thead className="table-dark">
                      <tr><th>Foul</th><th>Penalty</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Holding / Illegal flag pull</td><td>+5 yards from end of run</td></tr>
                      <tr><td>Stripping the ball</td><td>+5 yards from end of run</td></tr>
                      <tr><td>Roughing the passer</td><td>10 yards + automatic first down</td></tr>
                      <tr><td>Illegal rush (not 7 yards back)</td><td>5 yards, replay down</td></tr>
                      <tr><td>Bull rush</td><td>10 yards, replay down</td></tr>
                      <tr><td>Illegal contact</td><td>10 yards, replay down</td></tr>
                      <tr><td>Pass interference</td><td>Automatic first down at spot</td></tr>
                      <tr><td>Pass interference in end zone</td><td>1st & goal at 1-yard line</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>15 yards + automatic first down</td></tr>
                      <tr><td>Force out</td><td>Spot foul + automatic first down</td></tr>
                    </tbody>
                  </table>

                  <PdfDownload filename="coed-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 2. Women's League Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading2">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                  Women&apos;s League Rules
                </button>
              </h2>
              <div id="collapse2" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Team Roster</h5>
                  <ul>
                    <li>Minimum 4 players required to start a game.</li>
                    <li>All players must sign the XFF waiver before playing.</li>
                    <li>Substitute fee: $20 per doubleheader or $12 per single game — must be paid <strong>before</strong> the player takes the field.</li>
                    <li>Substitutes need a Substitute Waiver on file.</li>
                    <li>Substitutes are eligible for playoff games only if they played in 2 or more regular-season games.</li>
                  </ul>

                  <h5>The Field</h5>
                  <ul>
                    <li>Yard markers, pylons, and cones mark the 1-PAT line (5 yards), 2-PAT line (10 yards), and the no-run zones (5 yards before each end zone).</li>
                    <li>Sidelines are shared; teams are responsible for their fans and spectators must stay away from the sideline.</li>
                    <li>Carry-in, carry-out policy for all trash.</li>
                  </ul>

                  <h5>Equipment</h5>
                  <ul>
                    <li>Same-color jerseys with numbers; shirts tucked in; flag belt worn over the shirt with flags on hips.</li>
                    <li>Caps worn backward; no jewelry.</li>
                    <li>Sport goggles required if player wears eyeglasses.</li>
                    <li>All players must wear cleats.</li>
                    <li>Official adult Sonic pop flag belts only — youth belts are <strong>not</strong> allowed.</li>
                    <li>Flag belts are available for purchase from XFF for $20.</li>
                  </ul>

                  <h5>Code of Conduct</h5>
                  <ul>
                    <li>Respect all officials.</li>
                    <li>Fighting: immediate ejection; double forfeit (both teams receive a loss); teams that instigate may be expelled from the league.</li>
                    <li>Trash talking is not tolerated.</li>
                    <li>Verbal or physical abuse of an official results in suspension.</li>
                    <li>2nd personal foul in a game = automatic ejection.</li>
                    <li>Counting the 5-second clock aloud is illegal.</li>
                    <li>Only team captains may discuss calls; arguing earns a charged timeout.</li>
                    <li>Officials' decisions are final.</li>
                    <li>Teams are responsible for their sidelines; unsportsmanlike conduct from the sideline = 15-yard penalty + automatic first down.</li>
                    <li>Fan misbehavior can result in a game forfeit.</li>
                  </ul>

                  <h5>Game Clock</h5>
                  <ul>
                    <li>Two 17-minute halves (may be adjusted by XFF).</li>
                    <li>2 timeouts per half per team (30 seconds each). No timeouts allowed if leading by 20+ points.</li>
                    <li>1-minute halftime.</li>
                    <li>25-second play clock.</li>
                    <li>Last 2 minutes: clock stops (if within 14 points) on — incomplete passes, timeouts, out-of-bounds, penalties, QB sacks, 5-second violations, turnovers, and offensive penalties (except sack + 5-second).</li>
                    <li>Clock does <strong>not</strong> stop if the losing team commits a penalty.</li>
                  </ul>

                  <h5>Scoring</h5>
                  <ul>
                    <li>Touchdown = 6 points</li>
                    <li>PAT from 5-yard line = 1 point (pass only, in the red zone)</li>
                    <li>PAT from 10-yard line = 2 points (pass only, in the red zone)</li>
                    <li>Safety = 2 points</li>
                    <li>Interception return on a PAT attempt = 2 points</li>
                    <li>Forfeit is scored 6–0</li>
                  </ul>

                  <h5>Overtime</h5>
                  <ul>
                    <li>College-style from the 10-yard line.</li>
                    <li>Interception in the end zone during OT stays at the 10-yard line (not returned).</li>
                    <li>Starting in the 3rd overtime, teams must go for 2 points.</li>
                  </ul>

                  <h5>Matriculation</h5>
                  <ul>
                    <li>Offense starts at own 10-yard line.</li>
                    <li>4 downs to cross midfield; 4 downs to reach the 10-yard line; 3 downs to score.</li>
                    <li>Penalties remain 5 / 10 / 15 yards as applicable.</li>
                  </ul>

                  <h5>Game Play</h5>
                  <ul>
                    <li>QB <strong>may run</strong> with the ball. Once the QB crosses the line of scrimmage before 5 seconds, the clock stops.</li>
                    <li>Pass rusher must start at least 7 yards from the line of scrimmage.</li>
                    <li>Face guarding <strong>is</strong> pass interference in the Women's League.</li>
                    <li>Roughing the passer = hitting the QB's arm, hand, or head (contact with hip or body while pulling the flag is <strong>not</strong> roughing).</li>
                    <li>If a defender inadvertently grabs the QB's shirt instead of the flag, play continues and 5 yards are added to the result of the play.</li>
                    <li>If a flag falls off, the ball carrier must be touched (one hand) to be downed.</li>
                    <li>No screening or blocking on any play; the center may not block the rusher.</li>
                    <li>Substitutes must pay the sub fee before entering the field.</li>
                  </ul>

                  <h5>Penalties</h5>
                  <p>Same structure as the Coed rulebook with the following difference: the illegal rush penalty applies when the rusher is <strong>not</strong> 7 yards back (rather than 5 yards back as in some other formats).</p>

                  <PdfDownload filename="womens-league-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 3. Championships ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading3">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                  Championship Rules
                </button>
              </h2>
              <div id="collapse3" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Overview</h5>
                  <ul>
                    <li>End-of-season championship tournament — free to participate (referee fee only).</li>
                    <li>Invitation-only event.</li>
                  </ul>

                  <h5>Qualification</h5>
                  <ul>
                    <li>Division winners from each location receive an automatic invitation.</li>
                    <li>Remaining spots are at-large bids selected by the XFF committee (owners, field managers, and officials) based on:</li>
                  </ul>
                  <ul style={{listStyleType: 'disc', marginLeft: '1.5rem'}}>
                    <li>Win/Loss records</li>
                    <li>Strength of wins</li>
                    <li>Point differential</li>
                    <li>Strength of location</li>
                    <li>XFF computer rankings</li>
                  </ul>

                  <h5>Roster &amp; Eligibility</h5>
                  <ul>
                    <li>Teams may only use players on their official roster.</li>
                    <li>Players who have participated in multiple locations must choose <strong>one</strong> team for championships.</li>
                    <li>Players cannot join an already-eliminated team's roster for championships.</li>
                    <li>Government-issued ID may be checked before the first game.</li>
                  </ul>

                  <h5>Field Size</h5>
                  <ul>
                    <li>Number of qualifying teams depends on the total number of teams in the league for that season.</li>
                  </ul>

                  <PdfDownload filename="championship-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 4. Turf Field Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading4">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                  Turf Field Rules
                </button>
              </h2>
              <div id="collapse4" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <ol>
                    <li><strong>No sunflower seeds, food, or drinks</strong> allowed on the turf field at any time.</li>
                    <li>Water and sports beverages are the <strong>only liquids</strong> permitted on the field.</li>
                    <li>Alcohol is <strong>prohibited</strong> at all XFF locations, including parking lots.</li>
                    <li>No gum, cigars, cigarettes, or any other form of tobacco.</li>
                    <li>Violators will be <strong>banned from future attendance</strong> at XFF events.</li>
                    <li>Zero-tolerance policy — no exceptions.</li>
                    <li>Team captains <strong>and</strong> players are responsible for the behavior of their fans and guests.</li>
                    <li>Failure to supervise fans and guests may result in suspension and/or game forfeiture.</li>
                    <li>All XFF decisions regarding field violations are final and binding.</li>
                  </ol>

                  <PdfDownload filename="turf-field-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 5. Youth Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading5">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                  Youth Rules (5-Man Format)
                </button>
              </h2>
              <div id="collapse5" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Coin Toss &amp; Possession</h5>
                  <ul>
                    <li>Visiting team calls the toss.</li>
                    <li>Winner chooses offense or defense; loser chooses direction.</li>
                    <li>Teams switch sides at halftime; the defense from the first half receives the ball to start the second half.</li>
                  </ul>

                  <h5>The Field</h5>
                  <ul>
                    <li>30 yards wide × 70 yards long with two 10-yard end zones.</li>
                    <li>Midfield serves as the line-to-gain.</li>
                    <li>No-run zones: 5 yards before each line-to-gain and 5 yards before each end zone.</li>
                    <li>Stepping on the boundary line = out of bounds.</li>
                  </ul>

                  <h5>Series of Downs</h5>
                  <ul>
                    <li>Offense starts at own 5-yard line.</li>
                    <li>3 downs to cross midfield; 3 downs to score.</li>
                    <li>All changes of possession (except interceptions) start at the 5-yard line.</li>
                  </ul>

                  <h5>Rosters &amp; Substitutes</h5>
                  <ul>
                    <li>5–12 players per roster; minimum 4 to start.</li>
                    <li>Substitute fee: $25. Substitute Waiver required.</li>
                    <li>Substitutes are eligible for playoffs only if they played 2+ regular-season games.</li>
                    <li>All playoff players must pay full registration.</li>
                  </ul>

                  <h5>Timing</h5>
                  <ul>
                    <li>34-minute continuous clock (two 17-minute halves).</li>
                    <li>Clock stops only for timeouts or injuries.</li>
                    <li>30-second play clock.</li>
                    <li>1 timeout per half per team.</li>
                  </ul>

                  <h5>Overtime</h5>
                  <ul>
                    <li>Coin flip; each team gets 1 play from the 5-yard line (1 point) or 10-yard line (2 points).</li>
                    <li>Starting in the 3rd overtime, teams must go for 2 points.</li>
                  </ul>

                  <h5>Scoring</h5>
                  <ul>
                    <li>Touchdown = 6 points</li>
                    <li>1 PAT from 5-yard line (pass only) = 1 point</li>
                    <li>2 PAT from 10-yard line (run or pass) = 2 points</li>
                    <li>Safety = 2 points</li>
                    <li>Forfeit is scored 28–0</li>
                    <li>If a team leads by 3+ touchdowns (18+ points), they must remove their pass rusher.</li>
                  </ul>

                  <h5>Coaches</h5>
                  <ul>
                    <li>Coaches may be on the field to direct players (per division rules) but must move to the sideline before the snap.</li>
                  </ul>

                  <h5>Live &amp; Dead Ball</h5>
                  <ul>
                    <li>Ball is live at the snap.</li>
                    <li>Ball is dead when: ball hits the ground, flag is pulled, ball carrier goes out of bounds, touchdown/PAT/safety scored, knee or arm touches the ground, flag falls off, receiver catches with one or no flags remaining, or the 7-second clock expires.</li>
                    <li>No fumbles — ball spotted where the ball carrier's feet were at time of fumble.</li>
                  </ul>

                  <h5>Game Play</h5>
                  <ul>
                    <li>QB <strong>cannot</strong> run directly with the ball.</li>
                    <li>Direct handoffs behind the line of scrimmage only.</li>
                    <li>No laterals of any kind.</li>
                    <li>No blocking or screening.</li>
                    <li>Offensive players without the ball must stop moving once the ball crosses the line of scrimmage.</li>
                    <li>No-run zones: 5 yards before midfield and 5 yards before each end zone.</li>
                    <li>QB has a 7-second pass clock (not 5 seconds).</li>
                    <li>Once the ball is handed off, the 7-second clock is no longer in effect.</li>
                  </ul>

                  <h5>Passing</h5>
                  <ul>
                    <li>All passes must be thrown from behind the line of scrimmage, forward, and received beyond the LOS.</li>
                    <li>QB may intentionally throw the ball away as long as the pass goes beyond the line of scrimmage.</li>
                    <li>Shovel passes are allowed.</li>
                  </ul>

                  <h5>Receiving</h5>
                  <ul>
                    <li>1 foot in bounds constitutes a catch.</li>
                    <li>Simultaneous possession = offensive team's ball.</li>
                    <li>Interceptions are returnable (except on PAT conversions).</li>
                  </ul>

                  <h5>Rushing the Passer</h5>
                  <ul>
                    <li>Rusher must start at least 7 yards from the line of scrimmage.</li>
                    <li>Any number of players may rush simultaneously.</li>
                    <li>Once the ball is handed off, the 7-yard rule is no longer in effect.</li>
                    <li>Sack in the end zone = safety.</li>
                    <li>If a rusher leaves early, they may return and reset.</li>
                  </ul>

                  <h5>Flag Pulling</h5>
                  <ul>
                    <li>Flag pulling is legal only when the ball carrier has full possession.</li>
                    <li>Defenders may dive to pull a flag.</li>
                    <li>No tackling, holding, or running through a ball carrier.</li>
                    <li>If a flag falls off inadvertently, the ball carrier is immediately down.</li>
                    <li>No intentional pre-possession flag pulling.</li>
                    <li>Flag guarding = stiff arm, lowering head/hand/arm/shoulder, or covering flags with the jersey.</li>
                  </ul>

                  <h5>Formations</h5>
                  <ul>
                    <li>Minimum 1 player on the line of scrimmage (the center); up to 4 players may be on the LOS.</li>
                    <li>QB must be off the line of scrimmage.</li>
                    <li>1 player may be in motion — must be 1 yard behind the LOS and parallel to it; no forward motion.</li>
                    <li>Center must snap the ball between their legs in a rapid, continuous motion; the ball must completely leave the center's hands.</li>
                  </ul>

                  <h5>Unsportsmanlike Conduct</h5>
                  <ul>
                    <li>Intentional tackling, elbowing, cheap shots, or blocking = ejection.</li>
                    <li>Offensive language: 1 warning, then ejection.</li>
                    <li>Ball carriers must make an attempt to avoid established defenders.</li>
                    <li>Fans: cheer only, keep comments clean, stay away from the field.</li>
                  </ul>

                  <h5>Penalties</h5>
                  <p><strong>Defensive (spot fouls):</strong></p>
                  <table className="table table-bordered table-sm mt-1 mb-3">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Pass interference</td><td>Automatic first down at spot</td></tr>
                      <tr><td>Holding</td><td>Automatic first down</td></tr>
                      <tr><td>Stripping the ball</td><td>+10 yards + automatic first down</td></tr>
                    </tbody>
                  </table>
                  <p><strong>Defensive (yardage):</strong></p>
                  <table className="table table-bordered table-sm mt-1 mb-3">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Unnecessary roughness</td><td>+10 yards + automatic first down</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>+10 yards + automatic first down</td></tr>
                      <tr><td>Offsides</td><td>+5 yards + automatic first down</td></tr>
                      <tr><td>Illegal rush</td><td>+5 yards + automatic first down</td></tr>
                      <tr><td>Illegal flag pull</td><td>+5 yards + automatic first down</td></tr>
                      <tr><td>Roughing the passer</td><td>+5 yards + automatic first down</td></tr>
                      <tr><td>Taunting</td><td>+5 yards + automatic first down</td></tr>
                    </tbody>
                  </table>
                  <p><strong>Offensive:</strong></p>
                  <table className="table table-bordered table-sm mt-1">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Unnecessary roughness</td><td>−10 yards + loss of down</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>−10 yards + loss of down</td></tr>
                      <tr><td>Screening / blocking / running with ball</td><td>−10 yards + loss of down</td></tr>
                      <tr><td>Charging</td><td>−10 yards + loss of down</td></tr>
                      <tr><td>Flag guarding</td><td>−10 yards + loss of down</td></tr>
                      <tr><td>Offsides / False start</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Illegal forward pass</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Offensive pass interference</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Illegal motion</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Delay of game</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Impeding the rusher</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Illegal procedure</td><td>−5 yards + loss of down</td></tr>
                      <tr><td>Run in a pass-only zone</td><td>−5 yards + loss of down</td></tr>
                    </tbody>
                  </table>

                  <PdfDownload filename="youth-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 6. 5-Man Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading6">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                  5-Man League Rules
                </button>
              </h2>
              <div id="collapse6" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Team Rosters</h5>
                  <ul>
                    <li>Maximum 12 players; may be added through the 5th game.</li>
                    <li>All players must sign the XFF waiver and be on the official roster.</li>
                  </ul>

                  <h5>Equipment</h5>
                  <ul>
                    <li>Same-color jerseys with permanent numbers, tucked in; caps backward; no jewelry.</li>
                    <li>Official Sonic pop flag belts; molded or detachable cleats only — <strong>no metal cleats</strong>.</li>
                    <li>Starting Week 2: teams penalized <strong>2 points per player</strong> found wearing an illegal jersey.</li>
                  </ul>

                  <h5>Game Clock</h5>
                  <ul>
                    <li>Two 20-minute halves; 3 timeouts per half (no timeouts if leading 28+).</li>
                    <li>25-second play clock.</li>
                    <li>Last 2 minutes (if within 14 points): clock stops on — incomplete passes, out-of-bounds, extra-point attempts, defensive penalties (except offsides), QB sacks, 5-second violations, turnovers; clock also stops for first downs, defensive offsides, and offensive penalties (except sack + 5-second).</li>
                    <li>Clock does <strong>not</strong> stop if the losing team commits a penalty.</li>
                  </ul>

                  <h5>Scoring</h5>
                  <ul>
                    <li>Touchdown = 6 | PAT (5 yd) = 1 | PAT (10 yd) = 2 | Safety = 2 | INT on PAT = 2</li>
                  </ul>

                  <h5>Forfeits</h5>
                  <ul>
                    <li>Minimum 4 players; forfeiting team surrenders $60 forfeit bond.</li>
                  </ul>

                  <h5>Overtime</h5>
                  <ul>
                    <li>College-style from the 10-yard line; 3rd OT = must go for 2.</li>
                  </ul>

                  <h5>Matriculation</h5>
                  <ul>
                    <li>Start at own 10-yard line → 4 downs to midfield → 4 downs to 10-yard line → 3 downs to score.</li>
                  </ul>

                  <h5>Key Differences from Coed Format</h5>
                  <ul>
                    <li>Pass rusher must start at least <strong>5 yards</strong> back (not 7 yards).</li>
                    <li>Bull rushing is illegal — rusher must choose one side of the blocker.</li>
                    <li><strong>Bump-and-run coverage is allowed:</strong> within 1 yard of the LOS, extended for up to 5 yards, open hands, waist-to-shoulder contact only, no head or face contact.</li>
                    <li>Defender <strong>cannot</strong> contact a receiver beyond 5 yards or when the ball is in the air.</li>
                    <li>Face guarding <strong>is</strong> pass interference — the defender must turn and look for the ball.</li>
                    <li>PI in the end zone = 1st & goal at the 1-yard line.</li>
                    <li>Center may block the pass rusher; "canning" (bumping or blocking the center) is <strong>not</strong> allowed unless the center crosses the LOS.</li>
                    <li>No trips formation; motion player must clear the formation before the snap.</li>
                    <li>Outlawed: QB passing to themselves; QB bouncing off center's back.</li>
                  </ul>

                  <h5>Rain Policy</h5>
                  <ul>
                    <li>Games are played unless the field is unplayable. Check the schedule page.</li>
                    <li>If no cancellation is posted, <strong>games are on.</strong></li>
                  </ul>

                  <h5>Offensive Penalties</h5>
                  <table className="table table-bordered table-sm mt-2">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Offsides</td><td>5 yards, replay down</td></tr>
                      <tr><td>Delay of game</td><td>5 yards, replay down</td></tr>
                      <tr><td>Holding / Illegal block</td><td>5 yards + loss of down</td></tr>
                      <tr><td>QB crossing LOS before pass</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Forward pass behind LOS</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Illegal procedure (trips)</td><td>5 yards, replay down</td></tr>
                      <tr><td>Offensive pass interference</td><td>5 yards + loss of down</td></tr>
                      <tr><td>Flag guarding</td><td>10 yards + loss of down</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>15 yards (personal foul)</td></tr>
                      <tr><td>Impeding the rusher</td><td>5 yards + loss of down</td></tr>
                    </tbody>
                  </table>

                  <h5>Defensive Penalties</h5>
                  <table className="table table-bordered table-sm mt-2">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Holding / Illegal flag pull</td><td>+5 yards</td></tr>
                      <tr><td>Stripping the ball</td><td>+5 yards</td></tr>
                      <tr><td>Roughing the passer</td><td>10 yards + automatic first down</td></tr>
                      <tr><td>Illegal rush (not 5 yards back)</td><td>5 yards, replay down</td></tr>
                      <tr><td>Bull rush</td><td>10 yards, replay down</td></tr>
                      <tr><td>Illegal contact</td><td>10 yards, replay down</td></tr>
                      <tr><td>Pass interference</td><td>Automatic first down at spot</td></tr>
                      <tr><td>PI in end zone</td><td>1st & goal at 1-yard line</td></tr>
                      <tr><td>Unsportsmanlike conduct</td><td>15 yards + automatic first down</td></tr>
                      <tr><td>Force out</td><td>Spot foul + automatic first down</td></tr>
                    </tbody>
                  </table>

                  <PdfDownload filename="5-man-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 7. 8-Man Non-Eligible Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading7">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                  8-Man Non-Eligible Rules
                </button>
              </h2>
              <div id="collapse7" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>Starting a Game</h5>
                  <ul>
                    <li>Game starts at scheduled time. Coin flip for receive — <strong>no deferment.</strong></li>
                    <li>Teams switch directions at halftime.</li>
                    <li>Minimum 6 legal players required at game time.</li>
                    <li>Teams cannot be forced to start early.</li>
                    <li>Forfeiting teams may practice but must vacate the field 10 minutes before the next game.</li>
                    <li>Forfeiting team must pay <strong>both</strong> teams' referee fees before their next game.</li>
                  </ul>

                  <h5>Uniforms</h5>
                  <ul>
                    <li>Jersey must be same basic color and numbered; no number = listed as #99.</li>
                    <li>Footwear: one-piece molded rubber shoes or screwed-in football cleats. <strong>No metal spikes.</strong></li>
                    <li>Pants/shorts <strong>must</strong> be a different color than the flags.</li>
                    <li>Baseball caps worn backward.</li>
                    <li>Ball: regulation college football; each team provides their own ball.</li>
                    <li>Flag belt: official Flag-A-Tag Sonic Flag Football belts. Flags must contrast with pants/trim/shorts.</li>
                    <li>No clothing may cover the flag belt.</li>
                    <li>Jersey must be at least 2 inches above the waistline, or tucked in (5-yard penalty otherwise).</li>
                    <li>No pads — helmets, shoulder pads, and forearm pads are prohibited.</li>
                    <li>No stickum. Prescription eyeglasses must be strapped.</li>
                  </ul>

                  <h5>Timing</h5>
                  <ul>
                    <li>40-minute game (two 20-minute halves); 5-minute halftime.</li>
                    <li>2 timeouts per half per team.</li>
                    <li>Referees keep official time; 25-second play clock.</li>
                    <li>Final 2 minutes: clock stops on — incomplete passes/spike, out-of-bounds, score, timeout, non-loss-of-down penalties, change of possession, and fair catch.</li>
                  </ul>

                  <h5>Overtime</h5>
                  <ul>
                    <li>Coin toss; one end zone used.</li>
                    <li>Winner chooses offense or defense.</li>
                    <li>Team chooses: 1 point from the 3-yard line or 2 points from the 10-yard line.</li>
                    <li>If the first team fails, the second team can win by scoring.</li>
                    <li>Interception returned during OT = win for the returning team.</li>
                    <li>If both teams score, OT continues.</li>
                  </ul>

                  <h5>The Field</h5>
                  <ul>
                    <li>80 yards long (100 yards including end zones), 40 yards wide, 10-yard end zones.</li>
                    <li>First downs at 20-yard intervals.</li>
                  </ul>

                  <h5>Kickoff</h5>
                  <ul>
                    <li>Kicked from the 20-yard line. Receiving team has 4 players at the 40-yard line.</li>
                    <li>Ball must travel over the 40 in the air; otherwise spotted where it hits.</li>
                    <li>Touchback: receiving team's 20-yard line.</li>
                    <li>Kick out of bounds: receiving team takes ball where it goes out, or at their 35-yard line.</li>
                    <li>Onside kicks allowed in the final 2 minutes only if the kicking team trails by 18 points or fewer.</li>
                  </ul>

                  <h5>Game Play</h5>
                  <ul>
                    <li>1 foot in bounds for a legal catch.</li>
                    <li>Minimum 5 players on the line of scrimmage (3 linemen + 1 eligible receiver each side).</li>
                    <li>Mercy rule: game ends at the 2-minute warning if one team leads by 18+.</li>
                    <li>Blocking: open hands only — no forearms.</li>
                    <li>Hurdling: allowed only over a falling player; cannot leave feet into a defender.</li>
                    <li>Linemen are not required to wear flags; if a flag falls off a lineman, a one-hand touch ends the play.</li>
                    <li>Zero tolerance for vulgar language.</li>
                    <li>Offense is responsible for retrieving overthrown balls.</li>
                  </ul>

                  <h5>Punting</h5>
                  <ul>
                    <li>Must be declared to the referee before the play.</li>
                    <li>Shotgun snap; punter must be 3+ yards behind the center.</li>
                    <li>Defense must have 4+ players at the line of scrimmage (3 heads-up).</li>
                  </ul>

                  <h5>Offense</h5>
                  <ul>
                    <li>Center and 2 tackles are ineligible receivers.</li>
                    <li>Must have a tight end or receiver outside each tackle.</li>
                    <li>Scoring: TD = 6 pts | 1 PAT from 3 yd | 2 PAT from 10 yd; all extra points may be returned for 2 pts.</li>
                  </ul>

                  <h5>Defense</h5>
                  <ul>
                    <li>Must have 3 men lined up heads-up to the center and 2 tackles.</li>
                    <li>Open-hand contact on receivers within 5 yards of the LOS is allowed.</li>
                  </ul>

                  <h5>Penalties</h5>
                  <table className="table table-bordered table-sm mt-2 mb-3">
                    <thead className="table-dark"><tr><th>Foul</th><th>Penalty</th></tr></thead>
                    <tbody>
                      <tr><td>Taunting / Arguing (1st offense)</td><td>15 yards + automatic first down</td></tr>
                      <tr><td>Taunting / Arguing (2nd offense)</td><td>Ejection</td></tr>
                      <tr><td>False start / Offsides (offense)</td><td>5 yards, replay down</td></tr>
                      <tr><td>Illegal motion</td><td>5 yards, replay down</td></tr>
                      <tr><td>Delay of game</td><td>5 yards, replay down</td></tr>
                      <tr><td>Illegal formation</td><td>5 yards, replay down</td></tr>
                      <tr><td>Offensive pass interference</td><td>10 yards + loss of down</td></tr>
                      <tr><td>Holding / Illegal block / Clipping / Diving / Hurdling</td><td>10 yards (spot foul)</td></tr>
                      <tr><td>Flag guarding</td><td>10 yards + loss of down</td></tr>
                      <tr><td>Hands to face (offense)</td><td>10 yards</td></tr>
                      <tr><td>Intentional grounding</td><td>10 yards + previous spot + loss of down (or spot if &gt;10 yards back; safety if in own end zone)</td></tr>
                      <tr><td>Charging / Lowering shoulder</td><td>10 yards + loss of down</td></tr>
                      <tr><td>Offsides (defense)</td><td>5 yards</td></tr>
                      <tr><td>Encroachment</td><td>5 yards</td></tr>
                      <tr><td>Defensive pass interference</td><td>Spot foul + automatic first down</td></tr>
                      <tr><td>Roughing the QB</td><td>15 yards + automatic first down</td></tr>
                      <tr><td>Defensive holding</td><td>10-yard spot foul</td></tr>
                      <tr><td>Illegal contact on WR (beyond 5 yd, ball not in air)</td><td>5-yard spot foul</td></tr>
                      <tr><td>Illegal formation (defense)</td><td>5 yards</td></tr>
                      <tr><td>Hands to face (defense)</td><td>10 yards</td></tr>
                      <tr><td>Tackling</td><td>10 yards</td></tr>
                      <tr><td>Last-man tackle (clear path to EZ)</td><td>1st & goal from 1-yard line</td></tr>
                      <tr><td>Pushing receiver out of bounds</td><td>15 yards roughing</td></tr>
                    </tbody>
                  </table>

                  <h5>Additional Rules</h5>
                  <ul>
                    <li>Defender must hand the flag back to the ball carrier after pulling it.</li>
                  </ul>

                  <PdfDownload filename="8-man-non-eligible-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 8. 8-Man Eligible Rules ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading8">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                  8-Man Eligible Rules
                </button>
              </h2>
              <div id="collapse8" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>The Field</h5>
                  <ul>
                    <li>Elite / A / B Divisions: 45 yards × 100 yards with 10-yard end zones.</li>
                    <li>C Division and some B: 45 yards × 80 yards.</li>
                    <li>All teams play on the larger field for playoffs and championships.</li>
                    <li>First down system: 4 zones of 20 yards each; once a zone line is crossed, it cannot be re-crossed in the same series.</li>
                  </ul>

                  <h5>Timing</h5>
                  <ul>
                    <li>4 quarters of 12 minutes each.</li>
                    <li>Clock stops only on timeouts or injuries.</li>
                    <li>Last 2 minutes: stop-clock rules — incomplete pass, timeout, out-of-bounds, and penalty.</li>
                    <li>25-second play clock.</li>
                    <li>3 timeouts per half; unused timeouts do not carry over to the next half.</li>
                  </ul>

                  <h5>Format &amp; Rosters</h5>
                  <ul>
                    <li>8 players per side; game may start with 7.</li>
                    <li>If a team is reduced to only 6 players, the opposing team takes the score or wins 7–0.</li>
                    <li>Maximum 20 players on the roster; due before the first game.</li>
                    <li>Rosters are frozen after the 4th game.</li>
                    <li>Within the first 2 weeks, players may switch teams but may only play 1 game per day.</li>
                    <li>Elite Division players <strong>cannot</strong> fill in for lower-division teams.</li>
                  </ul>

                  <h5>Padding &amp; Equipment</h5>
                  <ul>
                    <li>No pads on upper torso, arms, or hands. Kneepads are allowed.</li>
                    <li>Ace bandages for muscle pulls are permitted.</li>
                    <li>Mouthpieces and eye protection are encouraged.</li>
                    <li>Knee brace or prosthesis hinges must be covered.</li>
                    <li>No hats with brims; no casts; no metal cleats.</li>
                    <li>Same-colored uniform required (bring dark and light sets — coin toss decides if colors conflict).</li>
                    <li>Teams provide their own flags and footballs; balls must be official collegiate or NFL size.</li>
                  </ul>

                  <h5>Kick-offs &amp; Punts</h5>
                  <ul>
                    <li><strong>No kickoffs.</strong> Ball is placed on the team's own 20-yard line at the start, second half, and after scores.</li>
                    <li>All punts must be declared to the referee before the play.</li>
                    <li>No direct snap for a punt; punter must kick immediately in continuous forward motion upon the snap.</li>
                    <li>A scrimmage kick that fails to cross the line of scrimmage: all players are eligible to receive.</li>
                    <li>Receiving team muffs a punt = ball spotted at point of muff; punter muffs the ball = not dead, may pick up and punt.</li>
                  </ul>

                  <h5>Scoring</h5>
                  <ul>
                    <li>TD = 6 pts | 1 PAT from 5 yd | 2 PAT from 10 yd | Safety = 2 pts</li>
                    <li>Defense can score on PAT attempts: interception returned = 2 points.</li>
                    <li>After a safety, the scoring team regains the ball at their own 40-yard line (20-yard line in C Division).</li>
                  </ul>

                  <h5>Fumbles</h5>
                  <ul>
                    <li>All fumbles and muffed catches are dead; the last possessing team keeps the ball at the spot.</li>
                  </ul>

                  <h5>Offensive Formations</h5>
                  <ul>
                    <li>All 8 players are eligible receivers.</li>
                    <li>Minimum 4 players on the line of scrimmage at the snap.</li>
                    <li>Shifts are allowed; 1 player in motion (a receiver from the LOS must retreat 5 yards first).</li>
                    <li>3-point and 4-point stances are allowed; shoulders must be square to the LOS.</li>
                    <li>Direct runs are allowed — no handoff or pass is required.</li>
                  </ul>

                  <h5>Blocking</h5>
                  <ul>
                    <li>Open hands with palms facing; stay on feet at all times.</li>
                    <li>No chop blocks, no leaving feet to block, no contact above shoulders or below the waist, no tripping.</li>
                    <li>Offensive linemen on pass blocking: limited hands (thrust forward, contact inside the defender's frame).</li>
                    <li>No forearms or elbows.</li>
                    <li>"Two-on-one" blocking: only from the LOS and behind.</li>
                  </ul>

                  <h5>Passing</h5>
                  <ul>
                    <li>Unlimited forward passes from behind the line of scrimmage.</li>
                    <li>Passer may immediately spike the ball to stop the clock.</li>
                  </ul>

                  <h5>Running</h5>
                  <ul>
                    <li>No flag guarding, stiff-arming, or charging.</li>
                    <li>Ball carrier must attempt to avoid defenders.</li>
                    <li>Flags must be worn at the start of each play.</li>
                    <li>If flags are lost inadvertently, a one-hand touch between the shoulders and knees ends the play.</li>
                  </ul>

                  <h5>Defense</h5>
                  <ul>
                    <li>Any formation is permitted.</li>
                    <li>Defenders may use hands but may not hold.</li>
                    <li>Bump-and-run until the ball is thrown (NFL 5-yard rule and one-bump rule do <strong>not</strong> apply).</li>
                    <li>Defensive interference applies only once the pass crosses the line of scrimmage.</li>
                    <li>No holding, tackling, or pushing a player out of bounds.</li>
                    <li>May attempt to strip the ball without fouling.</li>
                  </ul>

                  <h5>Overtime (Hybrid College Rules)</h5>
                  <ul>
                    <li>Coin toss; winner picks offense or defense.</li>
                    <li>Each team starts at the 20-yard line going toward the goal line, with 4 plays.</li>
                    <li>If the first team doesn't score, note the yardage gained — the second team must out-gain them or score a TD.</li>
                    <li>If the first team scores, they choose 1 or 2 PAT; the second team must match.</li>
                    <li>If the second team gains more total yards = game over. If both TDs and PATs match = 2nd OT (opposite team starts).</li>
                    <li>3rd OT: teams must go for the 2-point PAT.</li>
                    <li>Penalties are enforced as normal during OT.</li>
                  </ul>

                  <h5>Protests</h5>
                  <ul>
                    <li>Manager uses a timeout to question a rule interpretation. If the ruling is wrong, the timeout is returned; if it stands, the timeout is forfeited.</li>
                    <li>Illegal-player protest: make the request before the game (official asks the opposing manager) or during the game (official notes the name, notifies the manager, play resumes, submitted to League Director).</li>
                    <li>Ineligible player = automatic forfeit; player and manager suspended.</li>
                    <li>Opposing manager may accept the game result or take a 7–0 forfeit win.</li>
                  </ul>

                  <h5>Ejections</h5>
                  <ul>
                    <li>Ejected player must leave the playing area (including sidelines) within 3 minutes.</li>
                    <li>Manager provides the player's full name; automatic 1-game suspension.</li>
                    <li>Multiple ejections may result in removal for the season.</li>
                  </ul>

                  <h5>Conduct &amp; Miscellaneous</h5>
                  <ul>
                    <li>Zero tolerance for physical or verbal abuse. Bodily harm = immediate removal + incident report to SDPD. All threats are taken seriously.</li>
                    <li>Profanity: 15-yard unsportsmanlike; 2nd penalty = ejection.</li>
                    <li>Blood rule: bleeding player removed until wound is treated, bleeding stopped, and bloody clothing replaced.</li>
                    <li>No alcoholic beverages on the field or consumed by players during games. Inebriated players are not allowed.</li>
                    <li>Children must be supervised and kept 15 yards from the sideline. Spectators must stay 10 yards from the sideline.</li>
                    <li>No vehicles, glass containers, smoking, dogs, or bicycles on the field.</li>
                    <li>Managers are responsible for ensuring all trash is removed.</li>
                  </ul>

                  <PdfDownload filename="8-man-eligible-rules.pdf" />

                </div>
              </div>
            </div>

            {/* ── 9. Referral Fee ── */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading9">
                <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                  $100 Referral Program
                </button>
              </h2>
              <div id="collapse9" suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby="heading9" data-bs-parent="#rulesAccordion">
                <div className="accordion-body">

                  <h5>How It Works</h5>
                  <ul>
                    <li>Receive a <strong>$100.00 discount</strong> off your team&apos;s registration fees for every new team you refer to X Flag Football.</li>
                    <li>The credit is applied once the referred team pays their <strong>full registration fees and forfeit bond.</strong></li>
                    <li>There is no limit on the number of teams you can refer.</li>
                  </ul>

                  <PdfDownload filename="referral-program.pdf" />

                </div>
              </div>
            </div>

          </div>{/* end accordion */}
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
}
