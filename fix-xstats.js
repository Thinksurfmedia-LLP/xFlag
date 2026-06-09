import fs from 'fs';

let content = fs.readFileSync('app/xstats/page.tsx', 'utf8');
content = content.replace(/X-States/g, 'Xstats');
content = content.replace(/XStates/g, 'Xstats');
fs.writeFileSync('app/xstats/page.tsx', content);

let footerContent = fs.readFileSync('components/Footer.tsx', 'utf8');
footerContent = footerContent.replace(/<Link href="#">Xstats<\/Link>/g, '<Link href="/xstats">Xstats</Link>');
fs.writeFileSync('components/Footer.tsx', footerContent);

console.log('Fixed xstats');
