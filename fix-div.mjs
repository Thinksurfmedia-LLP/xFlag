import fs from 'fs';

const content = fs.readFileSync('app/news-details/page.tsx', 'utf8');
const lines = content.split(/\r?\n/);

// Find the line index of `        </section>` which is near the end
const sectionIndex = lines.lastIndexOf('        </section>');

if (sectionIndex !== -1) {
    // Insert `            </div>` right before it
    lines.splice(sectionIndex, 0, '            </div>');
    fs.writeFileSync('app/news-details/page.tsx', lines.join('\n'));
    console.log('Fixed missing div');
} else {
    console.log('Could not find section end tag');
}
