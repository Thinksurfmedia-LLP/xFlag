export const dynamic = 'force-dynamic';

import PDFDocument from 'pdfkit';
import { rulebooks } from '../../content';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = rulebooks.find((r) => r.filename === slug);

  if (!book) {
    return new Response('Not found', { status: 404 });
  }

  const chunks: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'LETTER' });

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', resolve);
    doc.on('error', reject);

    // Title
    doc
      .fontSize(22)
      .fillColor('#c8102e')
      .font('Helvetica-Bold')
      .text(book.title, { align: 'left' });

    doc.moveDown(0.5);
    doc
      .moveTo(50, doc.y)
      .lineTo(562, doc.y)
      .strokeColor('#c8102e')
      .lineWidth(2)
      .stroke();
    doc.moveDown(0.8);

    for (const section of book.sections) {
      // Section heading — add page if less than 60px remain
      if (doc.y > doc.page.height - 100) doc.addPage();
      doc
        .fontSize(13)
        .fillColor('#111111')
        .font('Helvetica-Bold')
        .text(section.heading);
      doc.moveDown(0.3);

      for (const block of section.content) {
        if (block.type === 'list') {
          for (const item of block.items) {
            doc
              .fontSize(10)
              .fillColor('#333333')
              .font('Helvetica')
              .text(`• ${item}`, { indent: 12, lineGap: 2 });
          }
        } else if (block.type === 'text') {
          doc
            .fontSize(10)
            .fillColor('#333333')
            .font('Helvetica')
            .text(block.value, { lineGap: 2 });
        } else if (block.type === 'table') {
          const colWidths = [280, 222];
          const rowHeight = 18;
          const startX = 50;
          const bottomMargin = 60;

          const drawHeaderRow = (startY: number) => {
            doc.rect(startX, startY, colWidths[0], rowHeight).fillAndStroke('#c8102e', '#c8102e');
            doc.rect(startX + colWidths[0], startY, colWidths[1], rowHeight).fillAndStroke('#c8102e', '#c8102e');
            doc.fontSize(9).fillColor('#ffffff').font('Helvetica-Bold')
              .text('Foul', startX + 4, startY + 5, { width: colWidths[0] - 8 });
            doc.text('Penalty', startX + colWidths[0] + 4, startY + 5, { width: colWidths[1] - 8 });
            return startY + rowHeight;
          };

          let y = drawHeaderRow(doc.y + 4);

          block.rows.forEach(([foul, penalty], i) => {
            if (y + rowHeight > doc.page.height - bottomMargin) {
              doc.addPage();
              y = drawHeaderRow(doc.y);
            }
            const fill = i % 2 === 0 ? '#f8f8f8' : '#ffffff';
            doc.rect(startX, y, colWidths[0], rowHeight).fillAndStroke(fill, '#dddddd');
            doc.rect(startX + colWidths[0], y, colWidths[1], rowHeight).fillAndStroke(fill, '#dddddd');
            doc.fontSize(9).fillColor('#333333').font('Helvetica')
              .text(foul, startX + 4, y + 5, { width: colWidths[0] - 8 });
            doc.text(penalty, startX + colWidths[0] + 4, y + 5, { width: colWidths[1] - 8 });
            y += rowHeight;
          });

          doc.y = y + 4;
        }
      }

      doc.moveDown(0.8);
    }

    // Footer
    doc.moveDown(1);
    doc
      .fontSize(8)
      .fillColor('#999999')
      .font('Helvetica')
      .text('XFlag Football — xflagfootball.com', { align: 'center' });

    doc.end();
  });

  const buffer = Buffer.concat(chunks);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}.pdf"`,
    },
  });
}
