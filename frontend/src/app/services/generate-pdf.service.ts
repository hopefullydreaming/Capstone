import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from 'pdf-lib';


@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService { }

/*
  private readonly pageW = 396;
  private readonly pageH = 612;
  private readonly margin = 50;
  private readonly contentWidth = 296;

  async generateBooklet() {
  // async generateBookletBlob(data: BookData): Promise<Blob> {


    const data = {
      title: 'My Bound Book',
      item1Val: 120.50,
      item2Val: 45.00,
      item3Val: 85.25,
      metricA: 92,
      metricB: 14,
      longTextContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec placerat libero. Vivamus fermentum justo at ante aliquam consequat. Fusce sit amet malesuada leo, quis imperdiet felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean et fringilla elit, non imperdiet ligula. Maecenas molestie magna ut finibus iaculis. Integer sed velit eleifend, interdum turpis a, venenatis nisl. Pellentesque quis dolor eu odio consequat varius. Maecenas eget porttitor felis. Aliquam vel elementum mi. Nunc iaculis mauris sed velit consectetur, at bibendum ligula pretium. Nullam non ante consectetur, faucibus massa eget, euismod neque. Fusce non vestibulum ipsum.

Aenean dictum iaculis consectetur.Pellentesque ornare est tellus, ac tristique lorem porttitor finibus.Sed eget justo in ligula elementum malesuada.Interdum et malesuada fames ac ante ipsum primis in faucibus.Integer ut urna lobortis, varius orci eu, ullamcorper ligula.Donec scelerisque porta magna.In nec ultricies sem, ut varius erat.Suspendisse non arcu quis ligula varius egestas.Nullam laoreet urna eget egestas aliquet.Donec quis lacus semper, tristique ex sed, eleifend orci.Aliquam facilisis molestie tristique.Nulla eget nisi rhoncus, egestas nisi id, viverra ante.Etiam enim nisi, mollis non fringilla imperdiet, porta non felis.Suspendisse vitae lectus hendrerit, ornare felis ac, tempus nisi.Aenean mauris lorem, dapibus ac imperdiet ut, faucibus ut massa.

Praesent dignissim tempus elit eu porta.Sed sed nibh diam.Nam eu augue a nibh malesuada bibendum.Morbi fringilla est vitae felis fermentum facilisis.Etiam leo ex, condimentum at convallis nec, cursus vitae eros.Mauris volutpat interdum bibendum.Aenean fermentum nulla eget dapibus posuere.Fusce interdum malesuada commodo.Etiam venenatis lorem sed leo fermentum ornare.Cras iaculis mi ipsum, in auctor orci ornare non.Mauris ut nunc nec mauris aliquam posuere.Praesent tincidunt feugiat finibus.Maecenas posuere mauris ante, a pharetra purus feugiat vitae.

Mauris aliquam hendrerit leo.Duis vulputate ipsum nec mi consequat ullamcorper.Sed at finibus ex.Nam sodales lorem eget urna dignissim fermentum id nec lectus.Ut a dolor dapibus, suscipit enim eget, vehicula libero.Nullam et lacus id velit aliquam venenatis eu et tellus.Cras non interdum metus.Morbi tristique erat a odio pharetra pretium.Morbi mattis, dui sed vestibulum porta, ipsum nisl sagittis eros, ac fringilla orci lorem id orci.Quisque rhoncus volutpat quam, at cursus lacus blandit ut.Etiam at justo vel neque venenatis cursus eu ac nisl.Nam consequat lacus ligula, at eleifend urna fringilla ut.Sed massa nisl, auctor dapibus sem quis, fermentum mattis nunc.

Sed sed magna vel massa dignissim malesuada sit amet a magna.Phasellus in arcu orci.In auctor aliquam velit, quis mollis libero viverra vitae.In vel enim non dui tincidunt dictum sed eu lorem.In hendrerit metus nec lacinia elementum.Donec efficitur sem sit amet enim consequat, quis cursus metus scelerisque.Praesent magna eros, posuere vel fringilla sit amet, semper non lectus.Donec interdum mi quis neque malesuada, at posuere sapien venenatis.Praesent nisl quam, ornare et consequat quis, suscipit quis quam.Pellentesque luctus eros rutrum, vehicula leo eget, ultricies magna.Nulla non felis at felis tristique tincidunt.Aenean eget rutrum nisi.Pellentesque id tristique libero, sit amet tincidunt tellus.Donec ultrices molestie pellentesque.`
    }

    const sequentialDoc = await PDFDocument.create();
    const font = await sequentialDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await sequentialDoc.embedFont(StandardFonts.HelveticaBold);

    // --- PAGE 1: FRONT COVER & STACKED TABLES ---
    const p1 = sequentialDoc.addPage([this.pageW, this.pageH]);

    // Header title block
    p1.drawText(data.title, { x: this.margin, y: 540, size: 20, font: boldFont });

    // Track our exact vertical cursor alignment position dynamically
    let currentYCursor = 500;
    const tablePadding = 0; // Set to 0 to eliminate any gaps between the tables

    // Table 1 Stack Action
    currentYCursor = this.drawComplexTableSegment(p1, this.margin, currentYCursor, font, boldFont, data.tableA);
    currentYCursor -= tablePadding;

    // Table 2 Stack Action (Starts exactly where Table 1 left off)
    currentYCursor = this.drawComplexTableSegment(p1, this.margin, currentYCursor, font, boldFont, data.tableB);
    currentYCursor -= tablePadding;

    // Table 3 Stack Action (Starts exactly where Table 2 left off)
    currentYCursor = this.drawComplexTableSegment(p1, this.margin, currentYCursor, font, boldFont, data.tableC);

    // --- PAGE 2+: AUTOMATIC TEXT PAGINATION ---
    this.paginateLongText(sequentialDoc, data.longTextContent, font, boldFont);

    // --- AUTOPAD BLANK PAGES (MULTIPLE OF 4 RULE) ---
    let currentTotalPages = sequentialDoc.getPageCount();
    const remainder = currentTotalPages % 4;
    if (remainder !== 0) {
      const pagesToAdd = 4 - remainder;
      for (let i = 0; i < pagesToAdd; i++) {
        const blankPage = sequentialDoc.addPage([this.pageW, this.pageH]);
        blankPage.drawText('[ Intentionally Left Blank ]', {
          x: this.pageW / 2 - 60, y: this.pageH / 2, size: 10, font: font, color: rgb(0.6, 0.6, 0.6)
        });
      }
    }

    // --- IMPOSITION PROCESS ---
    const finalBookletDoc = await PDFDocument.create();
    const totalPages = sequentialDoc.getPageCount();
    const sheetW = 792;
    const sheetH = 612;

    let leftIndex = totalPages - 1;
    let rightIndex = 0;

    for (let i = 0; i < totalPages / 2; i++) {
      const sheet = finalBookletDoc.addPage([sheetW, sheetH]);
      const isFrontSide = i % 2 === 0;
      const targetLeft = isFrontSide ? leftIndex : rightIndex;
      const targetRight = isFrontSide ? rightIndex : leftIndex;

      const [copiedLeft] = await finalBookletDoc.copyPages(sequentialDoc, [targetLeft]);
      const [copiedRight] = await finalBookletDoc.copyPages(sequentialDoc, [targetRight]);

      sheet.drawPage(copiedLeft, { x: 0, y: 0, width: this.pageW, height: this.pageH });
      sheet.drawPage(copiedRight, { x: this.pageW, y: 0, width: this.pageW, height: this.pageH });


      sheet.drawLine({
        start: { x: this.pageW, y: 0 }, end: { x: this.pageW, y: sheetH },
        thickness: 0.5, color: rgb(0.8, 0.8, 0.8)
      });

      leftIndex--;
      rightIndex++;
    }

    const finalBytes = await finalBookletDoc.save();

    this.triggerDownload(finalBytes, "booklet_test.pdf")
    // return new Blob([finalBytes], { type: 'application/pdf' });
  }


  private triggerDownload(bytes: Uint8Array, filename: string) {
    const arrayBuffer =
      bytes.buffer instanceof ArrayBuffer
        ? bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
        : new Uint8Array(bytes).buffer;

    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }


  /**
   * Draws a table matrix row layout and returns the final cursor Y coordinate 
   * so the next item can anchor flush against its bottom border.
   * /
  private drawComplexTableSegment(
    page: PDFPage,
    x: number,
    startY: number,
    font: PDFFont,
    boldFont: PDFFont,
    rows: TableRow[]
  ): number {
    let currentY = startY;
    const rowHeight = 20; // Exact row height
    const colWidth = 148; // contentWidth / 2

    rows.forEach((row) => {
      // 1. Structural bounding boxes (Left Column)
      page.drawRectangle({
        x: x,
        y: currentY - rowHeight,
        width: colWidth,
        height: rowHeight,
        borderColor: rgb(0.5, 0.5, 0.5),
        borderWidth: 0.5
      });

      // Text print positioning inside Left Column box
      page.drawText(row.col1, {
        x: x + 6,
        y: currentY - 14,
        size: 9,
        font: font
      });

      // 2. Structural bounding boxes (Right Column)
      page.drawRectangle({
        x: x + colWidth,
        y: currentY - rowHeight,
        width: colWidth,
        height: rowHeight,
        borderColor: rgb(0.5, 0.5, 0.5),
        borderWidth: 0.5
      });

      // Text print positioning inside Right Column box
      page.drawText(row.col2, {
        x: x + colWidth + 6,
        y: currentY - 14,
        size: 9,
        font: font
      });

      // Move height register downward for the next row
      currentY -= rowHeight;
    });

    // Return the final baseline position where this table finishes drawing
    return currentY;
  }

  private paginateLongText(doc: PDFDocument, text: string, font: PDFFont, boldFont: PDFFont) {
    const fontSize = 11;
    const lineHeight = 16;
    const bottomLimit = 60;

    let currentPage = doc.addPage([this.pageW, this.pageH]);
    let currentY = 540;

    currentPage.drawText('Section II: Continuous Analysis', { x: this.margin, y: currentY, size: 12, font: boldFont });
    currentY -= 25;

    const paragraphs = text.split('\n');

    paragraphs.forEach((para) => {
      if (!para.trim()) {
        currentY -= lineHeight;
        return;
      }

      const words = para.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > this.contentWidth) {
          currentPage.drawText(currentLine, { x: this.margin, y: currentY, size: fontSize, font });
          currentY -= lineHeight;

          if (currentY < bottomLimit) {
            currentPage = doc.addPage([this.pageW, this.pageH]);
            currentY = 540;
          }
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        currentPage.drawText(currentLine, { x: this.margin, y: currentY, size: fontSize, font });
        currentY -= lineHeight;
        if (currentY < bottomLimit) {
          currentPage = doc.addPage([this.pageW, this.pageH]);
          currentY = 540;
        }
      }
      currentY -= 8;
    });
  }
}

  private readonly pageW = 396;
  private readonly pageH = 612;
  private readonly margin = 50;
  private readonly contentWidth = 296;


  async generateBooklet() {
    // if (this.bookForm.invalid) return;

    const values = {
      title: 'My Bound Book',
      item1Val: 120.50,
      item2Val: 45.00,
      item3Val: 85.25,
      metricA: 92,
      metricB: 14
    }

    // 1. Create a workspace document containing single, sequential portrait pages
    const sequentialDoc = await PDFDocument.create();
    const font = await sequentialDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await sequentialDoc.embedFont(StandardFonts.HelveticaBold);

    // Book Dimensions: Half of a standard Letter page (5.5" x 8.5")
    //const pageW = 396;
    //const pageH = 612;

    // --- PAGE 1: FRONT COVER & FIRST TABLE ---
    const p1 = sequentialDoc.addPage([this.pageW, this.pageH]);
    p1.drawText(values.title, { x: 50, y: 540, size: 24, font: boldFont });
    p1.drawText('Table 1: Financial Breakdowns', { x: 50, y: 480, size: 14, font: boldFont });
    this.drawPDFTable(p1, 50, 440, font, boldFont, [
      ['Item Description', 'Value Assigned'],
      ['Production Item 01', `$${values.item1Val.toFixed(2)}`],
      ['Production Item 02', `$${values.item2Val.toFixed(2)}`],
      ['Production Item 03', `$${values.item3Val.toFixed(2)}`]
    ]);

    // --- PAGE 2: SECOND TABLE ---
    const p2 = sequentialDoc.addPage([this.pageW, this.pageH]);
    p2.drawText('Table 2: Performance Metrics', { x: 50, y: 540, size: 14, font: boldFont });
    this.drawPDFTable(p2, 50, 500, font, boldFont, [
      ['Metric Category', 'Measured Output'],
      ['Efficiency Rating', `${values.metricA}%`],
      ['System Delay Latency', `${values.metricB}ms`],
      ['Target Margin Status', 'Optimal Baseline']
    ]);

    // --- PAGES 3 to 8: SEQUENTIAL TEXT PAGES ---
    for (let i = 3; i <= 8; i++) {
      const pText = sequentialDoc.addPage([this.pageW, this.pageH]);
      pText.drawText(`Chapter ${i - 2}: Descriptive Analysis`, { x: 50, y: 540, size: 14, font: boldFont });

      const bodyText = `This is text documentation serving as Page ${i} inside your bound book format. When printed out double-sided, folded down the exact center line, and stitched or stapled together, this text flows sequentially. Adjust margin sizes to account for safe areas near the binding edge (the spine gutter) to maintain perfect text layout readability across sheets.`;

      pText.drawText(bodyText, { x: 50, y: 500, size: 11, font, maxWidth: 300, lineHeight: 16 });
      pText.drawText(`- Page ${i} -`, { x: 180, y: 40, size: 10, font });
    }

    // 2. Perform Imposition: Merge sequential pages side-by-side onto Landscape Letter sheets
    const finalBookletDoc = await PDFDocument.create();
    const totalPages = sequentialDoc.getPageCount(); // 8 pages

    // Booklet layout configuration blueprint [Last, First, Next, Second-to-last...]
    const bookletOrder = [
      [8, 1], // Sheet 1: Front
      [2, 7], // Sheet 1: Back
      [6, 3], // Sheet 2: Front
      [4, 5]  // Sheet 2: Back
    ];

    // Standard Landscape Letter dimensions (11" x 8.5")
    const sheetW = 792;
    const sheetH = 612;

    for (const [leftPageNum, rightPageNum] of bookletOrder) {
      const sheet = finalBookletDoc.addPage([sheetW, sheetH]);

      // Get source pages from sequential doc (0-indexed)
      const leftSourcePage = sequentialDoc.getPage(leftPageNum - 1);
      const rightSourcePage = sequentialDoc.getPage(rightPageNum - 1);
        
      // Embed pages into final doc for drawPage(...)
      const embeddedLeft = await finalBookletDoc.embedPage(leftSourcePage);
      const embeddedRight = await finalBookletDoc.embedPage(rightSourcePage);

      // Draw embedded pages onto the left and right halves of the landscape canvas
      sheet.drawPage(embeddedLeft, { x: 0, y: 0, width: this.pageW, height: this.pageH });
      sheet.drawPage(embeddedRight, { x: this.pageW, y: 0, width: this.pageW, height: this.pageH });
    
      // Optional visible centerline marker to assist manual folding
      sheet.drawLine({
        start: { x: this.pageW, y: 0 },
        end: { x: this.pageW, y: sheetH },
        thickness: 0.5,
        color: rgb(0.85, 0.85, 0.85)
      });
    }

    // Save and dispatch download
    const pdfBytes = await finalBookletDoc.save();
    this.triggerDownload(pdfBytes, 'booklet_print_ready.pdf');
  }

  private drawPDFTable(page: any, x: number, y: number, font: any, boldFont: any, data: string[][]) {
    let currentY = y;
    const rowHeight = 25;
    const colWidth = 140;

    data.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      row.forEach((cell, colIndex) => {
        page.drawText(cell, {
          x: x + (colIndex * colWidth) + 8,
          y: currentY - 18,
          size: 10,
          font: isHeader ? boldFont : font
        });
        // Cell boundary boxes
        page.drawRectangle({
          x: x + (colIndex * colWidth),
          y: currentY - rowHeight,
          width: colWidth,
          height: rowHeight,
          borderColor: rgb(0.7, 0.7, 0.7),
          borderWidth: 0.5
        });
      });
      currentY -= rowHeight;
    });
  }

  private paginateLongText(doc: PDFDocument, text: string, font: PDFFont, boldFont: PDFFont) {
    const fontSize = 11;
    const lineHeight = 16;
    const bottomLimit = 60;

    let currentPage = doc.addPage([this.pageW, this.pageH]);
    let currentY = 540;

    currentPage.drawText('Section II: Continuous Analysis', { x: this.margin, y: currentY, size: 12, font: boldFont });
    currentY -= 25;

    const paragraphs = text.split('\n');

    paragraphs.forEach((para) => {
      if (!para.trim()) {
        currentY -= lineHeight;
        return;
      }

      const words = para.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > this.contentWidth) {
          currentPage.drawText(currentLine, { x: this.margin, y: currentY, size: fontSize, font });
          currentY -= lineHeight;

          if (currentY < bottomLimit) {
            currentPage = doc.addPage([this.pageW, this.pageH]);
            currentY = 540;
          }
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        currentPage.drawText(currentLine, { x: this.margin, y: currentY, size: fontSize, font });
        currentY -= lineHeight;
        if (currentY < bottomLimit) {
          currentPage = doc.addPage([this.pageW, this.pageH]);
          currentY = 540;
        }
      }
      currentY -= 8;
    });
  }

  private triggerDownload(bytes: Uint8Array, filename: string) {
    const arrayBuffer =
      bytes.buffer instanceof ArrayBuffer
        ? bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
        : new Uint8Array(bytes).buffer;

    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }


}
*/