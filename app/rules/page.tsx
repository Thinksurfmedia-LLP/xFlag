import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { rulebooks, type RuleItem } from '@/app/api/rules/content';

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

// Renders **bold** markdown spans inside rule text as <strong> elements,
// so the webpage stays in sync with the same source data used for the PDF.
function renderInline(text: string): ReactNode {
  const parts = text.split('**');
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function RuleContentBlock({ block }: { block: RuleItem }) {
  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag style={block.indent ? { listStyleType: 'disc', marginLeft: '1.5rem' } : undefined}>
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ListTag>
    );
  }

  if (block.type === 'text') {
    return <p>{renderInline(block.value)}</p>;
  }

  return (
    <table className="table table-bordered table-sm mt-2">
      <thead className="table-dark">
        <tr><th>Foul</th><th>Penalty</th></tr>
      </thead>
      <tbody>
        {block.rows.map(([foul, penalty], i) => (
          <tr key={i}><td>{renderInline(foul)}</td><td>{renderInline(penalty)}</td></tr>
        ))}
      </tbody>
    </table>
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
            {rulebooks.map((book, idx) => {
              const n = idx + 1;
              return (
                <div className="accordion-item" key={book.filename}>
                  <h2 className="accordion-header" id={`heading${n}`}>
                    <button className="accordion-button collapsed" type="button" suppressHydrationWarning data-bs-toggle="collapse" data-bs-target={`#collapse${n}`} aria-expanded="false" aria-controls={`collapse${n}`}>
                      {book.title}
                    </button>
                  </h2>
                  <div id={`collapse${n}`} suppressHydrationWarning className="accordion-collapse collapse" aria-labelledby={`heading${n}`} data-bs-parent="#rulesAccordion">
                    <div className="accordion-body">
                      {book.sections.map((section, sIdx) => (
                        <div key={sIdx}>
                          {section.heading && <h5>{section.heading}</h5>}
                          {section.content.map((block, bIdx) => (
                            <RuleContentBlock key={bIdx} block={block} />
                          ))}
                        </div>
                      ))}
                      <PdfDownload filename={`${book.filename}.pdf`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
}