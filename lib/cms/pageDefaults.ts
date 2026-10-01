import { rulebooks } from '@/app/api/rules/content';
import type { BannerSection, IntroSection, PagesData, SeoSection } from './pageTypes';

const DEFAULT_BANNER_IMAGE = '/assets/images/about-banner.jpg';

function banner(title: string, breadcrumbLabel: string = title): BannerSection {
  return { enabled: true, title, breadcrumbLabel, image: DEFAULT_BANNER_IMAGE };
}

function seo(metaTitle: string, metaDescription: string): SeoSection {
  return { enabled: true, metaTitle, metaDescription };
}

function emptyIntro(): IntroSection {
  return { enabled: false, heading: '', paragraphs: [] };
}

// Defaults mirror the content that was hardcoded in each page before the
// pages became CMS-driven, so the site looks identical until an admin edits.
export const PAGE_DEFAULTS: PagesData = {
  'about-us': {
    seo: seo('About Us | XFlag Football', 'The story behind XFLAGFOOTBALL, the longest running flag football league in the US.'),
    banner: banner('About Us'),
    content: {
      enabled: true,
      introParagraphs: [
        'XFLAGFOOTBALL was Founded in the summer of 2007 by 5 experienced flag football players, making it the longest running flag football league in the US. The Founders played in different adult flag leagues in Southern California for many years. After realizing that many leagues were putting profits first and not the players, XFLAGFOOTBALL’s Founders decided to make a change and start XFLAGFOOTBALL - a league for the Players, by the Players.',
        'XFLAGFOOTBALL is committed to providing the best possible experience for its players, friends, and family. XFLAGFOOTBALL’s mission is to provide a safe, competitive, and family orientated environment. We provide our players a means to exercise, stay in shape, and meet others with similar interests.  We strive to promote health, fitness, recreation, sportsmanship, camaraderie, and friendly competition. XFLAGFOOTBALL believes in giving back to the community via fundraisers, charitable donations, and partnering with local schools to manage their off season passing leagues.',
      ],
      image: '/assets/images/about-img1.jpg',
      bodyParagraphs: [
        'Michael Zimmerman was one of the 5 Founders of XFLAGFOOTBALL, and today he is the CEO of the company. Michael has played over 60 seasons of flag football. He has been a lifetime athlete and has devoted his life to sports. He played football, baseball, and basketball in High school. He then went onto play Division 1 College Football. As the CEO of XFLAGFOOTBALL, he is very proud to offer multiple sports to Youth and Adults Nationwide. He is passionate about sharing his knowledge and love of sports. Michael is still an active player in the league with multiple high level teams through out XFLAGFOOTBALL. It should also be noted that Michael has competed on multiple reality television shows, having won 2 of them: Pros v Joes and Estate of Panic. He brings his competitive and winning attitude to the running, expansion, and continuing excellence of XFLAGFOOTBALL.',
        'Michael can be contacted at [mzimmerman@xflagfootball.com](mailto:mzimmerman@xflagfootball.com)',
      ],
    },
  },
  rules: {
    seo: seo('Rules | XFlag Football', 'Official XFlag Football rules for all leagues and formats.'),
    banner: banner('Rules'),
    intro: emptyIntro(),
    rulebooks: { enabled: true, rulebooks },
  },
  locations: {
    seo: seo('Locations | XFlag Football', 'Find an XFlag Football location near you.'),
    banner: banner('LOCATIONS', 'Locations'),
    intro: emptyIntro(),
    listing: { enabled: true, heading: '', emptyText: 'No locations found.' },
  },
  schedules: {
    seo: seo('Schedules | XFlag Football', 'Game schedules for every XFlag Football league.'),
    banner: banner('Schedules', 'schedules'),
    intro: emptyIntro(),
  },
  xstats: {
    seo: seo('XStats | XFlag Football', 'Standings, leaderboards and player stats for XFlag Football leagues.'),
    banner: banner('Xstats'),
    intro: emptyIntro(),
  },
  contact: {
    seo: seo('Contact Us | XFlag Football', 'Get in touch with XFlag Football.'),
    banner: banner('contact us'),
    contactInfo: {
      enabled: true,
      heading: 'contact info',
      phoneDisplay: '855 - 3524 - 411',
      phone: '8553524411',
      email: 'mzimmerman@xflagfootball.com',
    },
    form: {
      enabled: true,
      heading: 'Get in touch',
      description: 'Fill out the form below to let us know what interest you may have and we will reach out to set up an official meeting shortly.',
    },
  },
};
