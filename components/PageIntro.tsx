import { renderInline } from '@/lib/cms/inline';
import type { IntroSection } from '@/lib/cms/pageTypes';

interface PageIntroProps {
  intro: IntroSection;
}

// Optional CMS text block rendered above a page's main content.
export default function PageIntro({ intro }: PageIntroProps) {
  if (!intro.enabled || (!intro.heading && intro.paragraphs.length === 0)) return null;
  return (
    <section className="section-padding bg-white text-dark about-page-content pb-0">
      <div className="container">
        {intro.heading && <h2>{intro.heading}</h2>}
        {intro.paragraphs.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
      </div>
    </section>
  );
}
