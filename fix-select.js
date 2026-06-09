import fs from 'fs';
let content = fs.readFileSync('app/schedules/page.tsx', 'utf8');
content = content.replace(/<select name="tournament" id="tournament" className="form-select">\s*<option value="" selected disabled>States<\/option>/g, '<select name="state" id="state-select" className="form-select" defaultValue="">\n                        <option value="" disabled>States</option>');
content = content.replace(/<select name="tournament" id="tournament" className="form-select">\s*<option value="" selected disabled>Leagues<\/option>/g, '<select name="league" id="league-select" className="form-select" defaultValue="">\n                        <option value="" disabled>Leagues</option>');
content = content.replace(/<select name="tournament" id="tournament" className="form-select">\s*<option value="" selected disabled>All teams<\/option>/g, '<select name="team" id="team-select" className="form-select" defaultValue="">\n                        <option value="" disabled>All teams</option>');
fs.writeFileSync('app/schedules/page.tsx', content);
