import fs from 'fs';

let content = fs.readFileSync('app/news-details/page.tsx', 'utf8');

// The original converted file has this ending:
//                 <div className="text-center d-md-none mt-4">
//                     <a href="#" className="btn btn-primary">See More</a>
//                 </div>
//
//         </section>
//       <Footer />
//     </div>
//   );
// }

// Let's accurately replace it to add the missing </div>
content = content.replace(
    '<div className="text-center d-md-none mt-4">\n                    <a href="#" className="btn btn-primary">See More</a>\n                </div>\n\n        </section>',
    '<div className="text-center d-md-none mt-4">\n                    <a href="#" className="btn btn-primary">See More</a>\n                </div>\n            </div>\n        </section>'
);

fs.writeFileSync('app/news-details/page.tsx', content);

// Also fix the span tag in app/page.tsx which keeps getting overwritten
let content2 = fs.readFileSync('app/page.tsx', 'utf8');
content2 = content2.replace(
    '<i className="fa-regular fa-hourglass-half"></i>50 Minutes</span>',
    '<i className="fa-regular fa-hourglass-half"></i><span>50 Minutes</span>'
);
fs.writeFileSync('app/page.tsx', content2);
