// NOTE: SEED DATA ONLY. Like content.ts, the live policies are stored in the
// CMS (admin → Rules & Policies → Policies) and read via readPageData('rules').
// This file is the default until an admin saves that section for the first
// time. Editing it after that has no effect on the site.
//
// Use **bold** inside any string to render emphasis (both on the
// webpage and, stripped, in the PDF).

import type { Rulebook } from '@/lib/cms/pageTypes';

export const policies: Rulebook[] = [
  {
    title: 'Forfeit Bond',
    filename: 'forfeit-bond-policy',
    sections: [
      {
        content: [{ type: 'text', value: 'A team must pay a $70 forfeit bond for each game they forfeit. If a team does not show up for a scheduled game the team will lose its Forfeit Bond.' }],
      },
    ],
  },
  {
    title: 'Privacy Notice',
    filename: 'privacy-notice',
    sections: [
      {
        content: [
          { type: 'text', value: 'This privacy notice discloses the privacy practices for xflagfootball.com. This privacy notice applies solely to information collected by this web site. It will notify you of the following:' },
          { type: 'list', items: ['What personally identifiable information is collected from you through the web site, how it is used and with whom it may be shared.', 'What choices are available to you regarding the use of your data.', 'The security procedures in place to protect the misuse of your information.', 'How you can correct any inaccuracies in the information.'] },
        ],
      },
      {
        heading: 'Information Collection, Use, and Sharing',
        content: [
          { type: 'text', value: 'We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contacts from you. We will not sell or rent this information to anyone.' },
          { type: 'text', value: 'We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.' },
          { type: 'text', value: 'Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.' },
        ],
      },
      {
        heading: 'Your Access to and Control Over Information',
        content: [
          { type: 'text', value: 'You may opt-out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:' },
          { type: 'list', items: ['See what data we have about you, if any.', 'Change/correct any data we have about you.', 'Have us delete any data we have about you.', 'Express any concern you have about our use of your data.'] },
        ],
      },
      {
        heading: 'Security',
        content: [
          { type: 'text', value: 'We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.' },
          { type: 'text', value: 'Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a closed lock icon at the bottom of your web browser, or looking for "https" at the beginning of the address of the web page.' },
          { type: 'text', value: 'While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.' },
          { type: 'text', value: '**If you feel that we are not abiding by this privacy policy, you should contact us immediately via telephone at 855-FLAG-411 or via email.**' },
          { type: 'text', value: 'Effective Date: August 1, 2007' },
        ],
      },
    ],
  },
  {
    title: 'Roster Policy',
    filename: 'roster-policy',
    sections: [
      {
        content: [
          { type: 'text', value: 'The following outlines our policy involving player eligibility and rosters over the course of a season:' },
          {
            type: 'list',
            items: [
              'Each team is allowed up to 14 players on their roster.',
              'Once a player on your roster has played games he/she cannot be removed to make room for another player.',
              'Players must play four games in the season. Exceptions will be made to this rule for players who started the season injured, serving in the military, or police duty. This exception will only be considered if it has been submitted in writing with documentation as proof prior to being added to the roster. Even if the player plays less than the four games they still must pay the full player fee before playing in playoffs and/or counties.',
              'All players playing in playoffs and/or counties must pay the full player fee.',
              'Players must play in 40% of "regular" season games to be eligible for playoffs and county championship tournaments. Exceptions may be made due to injury, military service, or police duty. Must be applied for in writing to X Flag Football.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Refund Policy',
    filename: 'refund-policy',
    sections: [
      {
        content: [
          { type: 'text', value: 'XFLAGFOOTBALL has a no refund policy in which **NO REFUNDS** will be issued after the registration has been completed. In the event of a player cancellation request, the fee that was paid can be applied to the following season or tournament. For example, if you register for a summer season and then request a cancellation for that season, you may apply the fee you paid to the fall season or tournament of the same year.' },
          { type: 'text', value: 'XFLAGFOOTBALL reserves the right to merge divisions or cancel any division based upon low enrollment and or conditions beyond our control. In the event of XFLAGFOOTBALL having to cancel a division due to low enrollment (this does not include the merger of divisions), the participant registered would be eligible for a credit for the next season or a full refund. Please send transfer requests to [mzimmerman@xflagfootball.com](mailto:mzimmerman@xflagfootball.com).' },
        ],
      },
    ],
  },
];
