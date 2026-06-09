import fs from 'fs';
import path from 'path';

const srcDir = './_old_static';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

function convertToJSX(html) {
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/tabindex=/g, 'tabIndex=')
        .replace(/assets\//g, '/assets/')
        .replace(/<img([^>]*)>/g, (match, p1) => {
            if (p1.trim().endsWith('/')) return match;
            return `<img${p1} />`;
        })
        .replace(/<input([^>]*)>/g, (match, p1) => {
            if (p1.trim().endsWith('/')) return match;
            return `<input${p1} />`;
        })
        .replace(/<br>/g, '<br />')
        .replace(/<hr>/g, '<hr />')
        // Naive style tag conversions (e.g., style="background-image: url('...');")
        .replace(/style="([^"]*)"/g, (match, p1) => {
             if (p1.includes('background-image')) {
                 const urlMatch = p1.match(/url\(['"]?(.*?)['"]?\)/);
                 if (urlMatch) {
                     return `style={{ backgroundImage: "url('" + "${urlMatch[1]}" + "')" }}`;
                 }
             }
             return match;
        })
        // HTML comments to JSX comments
        .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
    return jsx;
}

for (const file of files) {
    const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    
    // Extract content between </header> and <footer>
    const start = content.indexOf('</header>');
    let end = content.indexOf('<!-- FOOTER -->');
    if (end === -1) end = content.lastIndexOf('<footer>');
    
    let mainContent = '';
    
    if (start !== -1 && end !== -1) {
        mainContent = content.substring(start + 9, end).trim();
    } else {
        console.log(`Skipping ${file} - no header/footer found`);
        continue;
    }
    
    let jsxContent = convertToJSX(mainContent);
    
    let pageName = file.replace('.html', '');
    let destPath = '';
    let componentName = '';
    
    if (pageName === 'index') {
        destPath = './app/page.tsx';
        componentName = 'Home';
    } else {
        destPath = `./app/${pageName}/page.tsx`;
        componentName = pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        if (!fs.existsSync(`./app/${pageName}`)) {
            fs.mkdirSync(`./app/${pageName}`, { recursive: true });
        }
    }
    
    const componentCode = `
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ${componentName}() {
  return (
    <div className="wrapper">
      <Header />
      ${jsxContent}
      <Footer />
    </div>
  );
}
`;
    fs.writeFileSync(destPath, componentCode);
    console.log(`Converted ${file} to ${destPath}`);
}
