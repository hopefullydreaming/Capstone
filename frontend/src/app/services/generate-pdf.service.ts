import { Injectable, inject } from '@angular/core';
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from 'pdf-lib';
import { ClassFeature, SpeciesFeature, Resource } from "../models/models";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import datatable from '@primeng/themes/aura/datatable';

export interface StatBlock {
  str: number; dex: number; con: number; int: number; wis: number; cha: number;
}

export interface CharacterData {
  name: string;
  class_name: string;
  level: number;
  max_hp: number;
  hit_dice: number;
  ac: number;
  speed: any;
  stats: StatBlock;
  senses: any[];
  skills: any;
  saves: any;
  choices: any;
  resources: Resource[];
  background_feature?: string;
  background_feature_name?: string;
  class_features: ClassFeature[];
  species_features: SpeciesFeature[];
}

const BLUE = rgb(0, 0, 0);
const RED = rgb(0, 0, 0);
const PURPLE = rgb(0, 0, 0);
const GRAY = rgb(0.6, 0.6, 0.6);
const BLACK = rgb(0, 0, 0);
const WHITE = rgb(1,1,1);

// const BLUE = rgb(0.2, 0.5, 0.8);
// const RED = rgb(0.8, 0.5, 0.6);
// const PURPLE = rgb(0.5, 0.3, 0.7);
// const GRAY = rgb(0.6, 0.6, 0.6);
// const BLACK = rgb(0, 0, 0);



@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  private readonly pageW = 396;
  private readonly pageH = 612;
  private readonly margin = 25;
  private readonly contentWidth = 318;

  http = inject(HttpClient);


  skillList = [
    { id: "acrobatics", label: "Acrobatics" },
    { id: "animalHandling", label: "Animal Handling" },
    { id: "arcana", label: "Arcana" },
    { id: "athletics", label: "Athletics" },
    { id: "deception", label: "Deception" },
    { id: "history", label: "History" },
    { id: "insight", label: "Insight" },
    { id: "intimidation", label: "Intimidation" },
    { id: "investigation", label: "Investigation" },
    { id: "medicine", label: "Medicine" },
    { id: "nature", label: "Nature" },
    { id: "perception", label: "Perception" },
    { id: "performance", label: "Performance" },
    { id: "persuasion", label: "Persuasion" },
    { id: "religion", label: "Religion" },
    { id: "sleightOfHand", label: "Sleight of Hand" },
    { id: "stealth", label: "Stealth" },
    { id: "survival", label: "Survival" }
  ]


  async generateAccessibleBooklet(data: CharacterData) {

    const fontkitModule = await import('@pdf-lib/fontkit');
    // const fontkit = fontkitModule.default || fontkitModule;
    const fontkit = ('default' in fontkitModule ? fontkitModule.default : fontkitModule) as typeof fontkitModule;


    const sequentialDoc = await PDFDocument.create();
    sequentialDoc.registerFontkit(fontkit);

    // const fontBytes = await firstValueFrom(
    //   this.http.get('fonts/Quivira.otf', { responseType: 'arraybuffer' })
    // );

    // const font = await sequentialDoc.embedFont(fontBytes, { subset: false });


    const font = await sequentialDoc.embedFont(StandardFonts.Helvetica);

    sequentialDoc.setTitle(`${data.name} Character Pages`);

    const p1 = sequentialDoc.addPage([this.pageW, this.pageH]);
    this.drawPage1(p1, font, data)

    const p2 = sequentialDoc.addPage([this.pageW, this.pageH]);
    this.drawPage2(p2, font, data)

    let featuresArray: Array<{ name: string, description: string }> = [];

    data.species_features.forEach(f => {
      if (f.is_printed == true) {
        featuresArray.push({ name: f.name, description: f.description });
      }
    })

    data.class_features.forEach(f => {

      let featureData = JSON.parse(f.data) ?? null;

      if (!!featureData.print) {

        let choice = data.choices[featureData.choice.id] ?? "NOT FOUND"

        let desc = featureData.choice.options.find((s: any) => {
            return s.name === choice
          })

        featuresArray.push({ name: f.name, description: `${featureData.print}\n${choice}. ${desc?.desc ?? 'no desc'}` });
      }
      else {
        featuresArray.push({ name: f.name, description: f.description });
      }
    })


    this.paginateLongText(sequentialDoc, featuresArray, font);

    let currentTotalPages = sequentialDoc.getPageCount();
    const remainder = currentTotalPages % 4;
    if (remainder !== 0) {
      const pagesToAdd = 4 - remainder;
      for (let i = 0; i < pagesToAdd; i++) {
        const blankPage = sequentialDoc.addPage([this.pageW, this.pageH]);

        blankPage.drawText("page blank intentionally", { x: 200, y: 200, size: 8, font: font, color: WHITE });

        // blankPage.drawRectangle({ x: 20, y: 20, width: 1, height: 1, borderColor: WHITE, borderWidth: 2 });
      }
    }
    const cleanSequentialBytes = await sequentialDoc.save();

    const referenceSourceDoc = await PDFDocument.load(cleanSequentialBytes);

    const finalBookletDoc = await PDFDocument.create();

    const sheetW = 792;
    const sheetH = 612;

    let numSheets = sequentialDoc.getPageCount()/4

    let pageOrder = [];

    for (let i = 0; i < numSheets; i++){
      pageOrder.push([(4 * i) + 4, (4*i)+1]);
      pageOrder.push([(4 * i) + 2, (4 * i) + 3]);
    }
    


    for (const [leftPageNum, rightPageNum] of pageOrder) {
      const sheet = finalBookletDoc.addPage([sheetW, sheetH]);

      const [embeddedLeft] = await finalBookletDoc.embedPdf(cleanSequentialBytes, [leftPageNum - 1]);
      const [embeddedRight] = await finalBookletDoc.embedPdf(cleanSequentialBytes, [rightPageNum - 1]);

      sheet.drawPage(embeddedLeft, { x: 0, y: 0, width: this.pageW, height: this.pageH });
      sheet.drawPage(embeddedRight, { x: this.pageW + 30, y: 0, width: this.pageW, height: this.pageH });

      // sheet.drawLine({
      //   start: { x: this.pageW, y: 0 },
      //   end: { x: this.pageW, y: sheetH },
      //   thickness: 0.5,
      //   color: rgb(0.85, 0.85, 0.85)
      // });
    }

    finalBookletDoc.setTitle(`${data.name} Character Booklet`);

    const finalBytes = await finalBookletDoc.save();
    this.triggerDownload(finalBytes, `${data.name} Level ${data.level} ${data.class_name} Character Booklet`);
   
  }

  drawPage1(page: PDFPage, font: PDFFont, data: CharacterData) {

    let currentY = 587;
    this.drawAttributesGrid(page, this.margin, currentY, font, data);

    currentY -= 80;
    this.drawCoreVitalsGrid(page, this.margin + (this.contentWidth / 3), currentY, font, data);

    this.drawSkillsGrid(page, this.margin, currentY, font, data);

    currentY -= (23 + data.senses.length)* 16

    this.drawProficienciesGrid(page, this.margin, currentY, font, data) 

  }

  /** Native Vector Grid Drawer for Table A Attributes */
  private drawAttributesGrid(page: PDFPage, x: number, y: number, font: PDFFont, charData: CharacterData) {
    let stats: StatBlock = charData.stats;
    let saves: any = charData.saves;

    let labelSize = 12;
    let saveSize = 10;
    let modSize = 24;
    let spacing = 1;

    const colW = this.contentWidth / 6;
    const boxH = 60;
    const saveH = 20;
    const saveY = y - boxH;

    const statObjs = [
      {l: "STR", id: "strength", val: stats.str},
      {l: "DEX", id: "dexterity", val: stats.dex},
      {l: "CON", id: "constitution", val: stats.con},
      {l: "INT", id: "intelligence", val: stats.int},
      {l: "WIS", id: "wisdom", val: stats.wis},
      {l: "CHA", id: "charisma", val: stats.cha}
    ]


    page.drawRectangle({ x: x, y: y - (boxH + saveH), width: this.contentWidth, height: boxH + saveH, borderColor: BLUE, borderWidth: 2 });

    statObjs.forEach((label, idx) => {
      const startX = x + (idx * colW);

      // Box Path
      page.drawRectangle({ x: startX, y: y - boxH, width: colW, height: boxH, borderColor: BLUE, borderWidth: 0.75 });

      // Header Text String

      let labelX = this.centerText(label.l, colW, labelSize, font);
      page.drawText(label.l, { x: startX + labelX, y: y - 14, size: labelSize, font: font, color: BLUE });

      // Value Value Modifier Number
      const val = label.val;
      let mod = Math.floor((val - 10) / 2)

      let valText = `${val}`
      let modText = `${mod >= 0 ? "+" : ""}${mod}`

      let modX = this.centerText(modText, colW, modSize, font);
      let valX = this.centerText(modText, colW, labelSize, font);

      page.drawText(modText, { x: startX + modX, y: y - 38, size: modSize, font: font });
      page.drawText(valText, { x: startX + valX, y: y - 54, size: labelSize, font: font });

    });



    statObjs.forEach((label, idx) => {
      const startX = x + (idx * colW);

      page.drawRectangle({ x: startX, y: saveY - saveH, width: colW, height: saveH, borderColor: BLUE, borderWidth: 0.75 });

      let radioSymbol = this.getProfDisplay(label.id, null, saves);

      let modText = `${radioSymbol} Save: ${this.displayModifier(label.id, stats, charData.level, null, saves)}`

      let modX = this.centerText(modText, colW, saveSize, font);

      page.drawText(modText, { x: startX + modX, y: saveY - 14, size: saveSize, font: font });

    });
  }



  /** Native Vector Grid Drawer for Table B Vitals Panel */
  private drawCoreVitalsGrid(page: PDFPage, x: number, y: number, font: PDFFont, data: CharacterData) {
    let width = this.contentWidth * 2 / 3;
    const colW = width / 12;
    const boxH = 40;
    const rowH = 16;

    const indicators = [[
      { l: 'AC', w: 2 },
      { l: 'Initiative', w: 2 },
      { l: 'Speed', w: 2 },
      { l: 'Current HP', w: 6 }
    ],[
      { l: 'Hit Dice', w: 3 },
      { l: 'Max HP', w: 3},
      { l: 'Temp HP', w: 2 },
      { l: 'Death Saves', w: 4 }
    ]];

    let labelSize = 8;
    let valueSize = 24;
    let spacing = 1;


    page.drawRectangle({ x: x, y: y - (boxH * 2), width: width, height: boxH * 2, borderColor: PURPLE, borderWidth: 2 });

    indicators.forEach((indArr, idx) => {
      let startY = y - (boxH * idx);
      let textY = startY - 1 + (idx);
      let startX = x;

      indArr.forEach(ind => {

        let labelX = this.centerText(ind.l, colW * ind.w, labelSize, font);

        page.drawRectangle({ x: startX, y: startY - boxH, width: colW * ind.w, height: boxH, borderColor: PURPLE, borderWidth: 0.75 });
        page.drawText(ind.l, { x: startX + labelX, y: textY - (labelSize * spacing), size: labelSize, font: font, color: PURPLE });
        startX += (colW * ind.w);
      });
    });

    indicators.forEach((indArr, idx) => {
      let startY = y - (boxH * idx);
      let startX = x;

      indArr.forEach(ind => {
        switch(ind.l){
          case "AC":{
            let indText = `${data.ac}`
            let valueX = this.centerText(indText, colW * ind.w, valueSize, font);
            page.drawText(indText, { x: startX + valueX, y: startY - ((labelSize * spacing) + valueSize), size: valueSize, font: font });
            break;
          }
          case "Initiative": {
            let dexMod = Math.floor((data.stats.dex -10)/2)
            let indText = `${dexMod >= 0 ? "+" : ""}${dexMod}`
            let valueX = this.centerText(indText, colW * ind.w, valueSize, font);
            page.drawText(indText, { x: startX + valueX, y: startY - ((labelSize * spacing) + valueSize), size: valueSize, font: font });
            break;
          }
          case "Speed": {
            let indText = `${data.speed.walking}`
            let valueX = this.centerText(indText, colW * ind.w, valueSize, font);
            page.drawText(indText, { x: startX + valueX, y: startY - ((labelSize * spacing) + valueSize), size: valueSize, font: font });
            break;
          }
          case "Current HP": {
            let indText = `${data.max_hp}`
            let valueX = this.centerText(indText, colW * ind.w, valueSize, font);
            page.drawText(indText, { x: startX + valueX, y: startY - ((labelSize * spacing) + valueSize), size: valueSize, font: font, color: GRAY });
            break;
          }
          case "Hit Dice": {

            let indText = `${data.level}d${data.hit_dice}`
            let indTextA = `${data.level}`
            let indTextB = `d${data.hit_dice}`
            let valueX = this.centerText(indText, colW * ind.w, 18, font);

            page.drawText(indTextA, { x: startX + valueX, y: startY - ((labelSize * spacing) + 18), size: 18, font: font, color: GRAY });
            page.drawText(indTextB, { x: startX + valueX + font.widthOfTextAtSize(indTextA, 18), y: startY - ((labelSize * spacing) + 18), size: 18, font: font });

            let indText2 = `Max: ${data.level}d${data.hit_dice}`
            let valueX2 = this.centerText(indText2, colW * ind.w, 8, font);
            page.drawText(indText2, { x: startX + valueX2, y: startY - ((labelSize * spacing) + 28), size: 8, font: font });
            break;
          }
          case "Max HP": {
            let indText = `${data.max_hp}`
            let valueX = this.centerText(indText, colW * ind.w, valueSize, font);
            page.drawText(indText, { x: startX + valueX, y: startY - ((labelSize * spacing) + valueSize), size: valueSize, font: font });
            break;
          }
          case "Death Saves": {
            let width = colW * ind.w;
            let width1 = width * (2/5);
            let width2 = width * (3/5);
            let saveSize = 13;
            let passText = `Pass`
            let failText = `Fail`
            let indText = `◎ ◎ ◎`

            let valueX = this.centerText(indText, width2, saveSize, font);
            let passX = this.centerText(passText, width1, saveSize, font);
            let failX = this.centerText(failText, width1, saveSize, font);

            page.drawText(passText, { x: startX + passX, y: startY - ((labelSize * spacing)+ saveSize), size: saveSize, font: font });
            page.drawText(failText, { x: startX + failX, y: startY - ((labelSize * spacing) + saveSize*2.1), size: saveSize, font: font });

            page.drawText(indText, { x: startX + valueX + width1, y: startY - ((labelSize * spacing) + saveSize), size: saveSize, font: font });
            page.drawText(indText, { x: startX + valueX + width1, y: startY - ((labelSize * spacing) + saveSize*2.1), size: saveSize, font: font });
            break;
          }
        }

        startX += (colW * ind.w);

      });

    });

    let resources = data.resources;

    let currentY = y - (boxH * 2);
    let resourceH = rowH * (resources.length + 2);

    page.drawRectangle({ x: x, y: currentY - (resourceH), width: width, height: resourceH, borderColor: PURPLE, borderWidth: 2 });




    let resourcesLabel = "Resources";

    let labelX = this.centerText(resourcesLabel, width, 10, font);

    const startX = x;

    page.drawText(resourcesLabel, { x: x + labelX, y: currentY - 12, size: 10, font: font });

    currentY = currentY - rowH;

    // Draw structural cell frame boundaries ◎◐●◉
    page.drawRectangle({ x: startX, y: currentY - rowH, width: colW * 7, height: rowH, borderColor: RED, borderWidth: 0.5 });
    page.drawRectangle({ x: startX + colW * 7, y: currentY - rowH, width: colW * 2, height: rowH, borderColor: RED, borderWidth: 0.5 });
    page.drawRectangle({ x: startX + colW * 9, y: currentY - rowH, width: colW * 3, height: rowH, borderColor: RED, borderWidth: 0.5 });


    let usesX = this.centerText("Uses", colW*2, 10, font);
    let rechargeX = this.centerText("Recharge", colW*3, 10, font);


    page.drawText("Name", { x: startX + 5, y: currentY - 11, size: 10, font: font });
    page.drawText("Uses", { x: startX + (colW * 7) + usesX, y: currentY - 11, size: 10, font: font });
    page.drawText("Recharge", { x: startX + (colW * 9) + rechargeX, y: currentY - 11, size: 10, font: font });

    currentY = currentY - rowH;

    resources.forEach((resource, idx) => {


      page.drawRectangle({ x: startX, y: currentY - rowH, width: colW*7, height: rowH, borderColor: RED, borderWidth: 0.5 });
      page.drawText(resource.name, { x: startX + 5, y: currentY - 11, size: 8, font: font });


      page.drawRectangle({ x: startX + colW * 7, y: currentY - rowH, width: colW * 2, height: rowH, borderColor: RED, borderWidth: 0.5 });

      if (resource.max_value > 0) {
        let spacing = resource.max_value < 10 ? "  " : resource.max_value < 100 ? " " : "";

        let usesText = `${resource.max_value}${spacing}/${spacing}${resource.max_value}`
        let usesGrayText = `${resource.max_value}`
        let usesBlackText = `${spacing}/${spacing}${resource.max_value}`

        let valueX = this.centerText(usesText, colW * 2, 10, font);

        page.drawText(usesGrayText, { x: startX + (colW * 7) + valueX, y: currentY - 11.5, size: 10, font: font, color: GRAY });
        page.drawText(usesBlackText, { x: startX + (colW * 7) + valueX + font.widthOfTextAtSize(usesGrayText, 10), y: currentY - 11.5, size: 10, font: font });
      }

      else if (resource.max_value == -1) {

        let usesText = "∞"

        let valueX = this.centerText(usesText, colW * 2, 12, font);

        page.drawText(usesText, { x: startX + (colW * 7) + valueX, y: currentY - 12, size: 12, font: font });
      }


      page.drawRectangle({ x: startX + colW * 9, y: currentY - rowH, width: colW * 3, height: rowH, borderColor: RED, borderWidth: 0.5 });

      let rechargeText = resource.recharge === "long" ? "Long Rest" : resource.recharge === "short" ? "Short Rest" : resource.recharge;

      let valueX = this.centerText(rechargeText, colW * 3, 8, font);

      page.drawText(rechargeText, { x: startX + valueX + (colW*9), y: currentY - 11, size: 8, font: font });

      currentY = currentY - rowH;

    });


    let equipmentLabel = "Equipment";

    let equipX = this.centerText(equipmentLabel, width, 10, font);

    let equipH = rowH * (16 - data.resources.length + data.senses.length)

    page.drawRectangle({ x: x, y: currentY - equipH, width: width, height: equipH, borderColor: PURPLE, borderWidth: 2 });


    page.drawRectangle({ x: x, y: currentY - rowH, width: width, height: rowH, borderColor: PURPLE, borderWidth: 0.5 });

    page.drawText(equipmentLabel, { x: x + equipX, y: currentY - 12, size: 10, font: font });

    currentY = currentY - rowH;

    let currencies = ["PP", "GP", "SP", "CP"]


    currencies.forEach((label, idx) => {
      const startX = x + (idx * (colW * 3));

      // Box Path
      page.drawRectangle({ x: startX, y: currentY - (rowH *2), width: (colW * 3), height: rowH*2, borderColor: BLUE, borderWidth: 0.75 });

      // Header Text String

      let labelX = this.centerText(label, (colW * 3), labelSize, font);
      page.drawText(label, { x: startX + labelX, y: currentY - 28, size: labelSize, font: font, color: BLUE });

    });


    currentY = currentY - (rowH*2);

    for (let i = 0; i < (13 - data.resources.length + data.senses.length); i++){

      page.drawRectangle({ x: x, y: currentY - rowH, width: width, height: rowH, borderColor: PURPLE, borderWidth: 0.5 });

      currentY = currentY - rowH;
    }



  }

  private centerText(text: string, boxW: number, size: number, font: PDFFont): number {

    const textWidth = font.widthOfTextAtSize(text, size);

    return (boxW / 2) - (textWidth / 2);

  }

  /** Native Vector Grid Drawer for Table C Skills Checklist Matrix */
  private drawSkillsGrid(page: PDFPage, x: number, y: number, font: PDFFont, charData: CharacterData) {
    let skills: any[] = charData.skills;
    let stats: any = charData.stats;
    let level: number = charData.level;

    const rowH = 16;
    const colW = this.contentWidth / 3;

    let startY = y

    let skillsLabel = "Skills";

    let labelX = this.centerText(skillsLabel, colW, 8, font);


    page.drawRectangle({ x: x, y: startY - rowH, width: colW, height: rowH, borderColor: RED, borderWidth: 0.5 });
    page.drawRectangle({ x: x, y: startY - (rowH * 19), width: colW, height: rowH * 19, borderColor: RED, borderWidth: 2 });

    page.drawText(skillsLabel, { x: x + labelX, y: startY - 12, size: 10, font: font });



    this.skillList.forEach((skill, idx) => {

      const startX = x;
      startY = startY - rowH;

      // Draw structural cell frame boundaries ◎◐●◉
      page.drawRectangle({ x: startX, y: startY - rowH, width: colW, height: rowH, borderColor: RED, borderWidth: 0.5 });

      // Simulated Checkbox Icon / Trained Indicator Marker
      let radioSymbol =this.getProfDisplay(skill.id, skills, null);// = skill.trained ? '◐' : '●';

      // const radioSymbol = skill.trained ? '◉' : '◎';
      page.drawText(radioSymbol, { x: startX + 5, y: startY - 12, size: 10, font: font, color: RED });

      let skillBonus = this.displayModifier(skill.id, stats, level, skills, null)

      // Bonus value text modifier
      page.drawText(skillBonus, { x: startX + 20, y: startY - 11, size: 8, font: font });

      // Skill Label String
      page.drawText(skill.label, { x: startX + 40, y: startY - 11, size: 8, font: font });
    });



    startY = startY - rowH;
    let sensesLabel = "Senses";

    let sensexLabelX = this.centerText(sensesLabel, colW, 8, font);


    let sensesList = [
      { label: "Passive Perception", value: `${this.getNumberModifier('perception', stats, level, skills) + 10}`, size: 10 },
      { label: "Passive Insight", value: `${this.getNumberModifier('insight', stats, level, skills) + 10}`, size: 10 },
      { label: "Passive Investigation", value: `${this.getNumberModifier('investigation', stats, level, skills) + 10}`, size: 10 }
    ]

    charData.senses.forEach(s => {
      sensesList.push({label: s.name, value: s.value, size: 8})
    })

    page.drawRectangle({ x: x, y: startY - rowH, width: colW, height: rowH, borderColor: RED, borderWidth: 0.5 });
    page.drawRectangle({ x: x, y: startY - (rowH * (sensesList.length + 1)), width: colW, height: rowH * (sensesList.length + 1), borderColor: RED, borderWidth: 2 });

    page.drawText(sensesLabel, { x: x + sensexLabelX, y: startY - 12, size: 10, font: font });


    sensesList.forEach((sense, idx) => {

      const startX = x;
      startY = startY - rowH;

      // Draw structural cell frame boundaries ◎◐●◉
      page.drawRectangle({ x: startX, y: startY - rowH, width: colW, height: rowH, borderColor: RED, borderWidth: 0.5 });

      // sense label
      page.drawText(sense.label, { x: startX + 5, y: startY - 11, size: 8, font: font, color: RED });


      let labelX = this.centerText(sense.value, 24, sense.size, font);

      // Skill Label String
      page.drawText(sense.value, { x: startX + 82 + labelX, y: startY - 11, size: sense.size, font: font });
    });
  }


  private drawProficienciesGrid(page: PDFPage, x: number, y: number, font: PDFFont, charData: CharacterData) {

    const rowH = 16;
    const colW = this.contentWidth;

    let h = rowH * (6 - charData.senses.length);

    let startY = y

    let skillsLabel = "Other Proficiencies";



    page.drawRectangle({ x: x, y: startY - h, width: colW, height: h, borderColor: RED, borderWidth: 2 });

    page.drawText(skillsLabel, { x: x + 5, y: startY - 16, size: 12, font: font });

    // placeholder
    let profs = "Vivamus a urna imperdiet, bibendum turpis eu, vestibulum nibh. Sed eget libero diam. Praesent eget felis ut urna tempor auctor sit amet ac turpis. Praesent eget felis ut urna tempor auctor sit amet ac turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit."


    this.multiLineText(page, font, profs, startY-32, 10, 12, colW - 10)



  }


  getProfDisplay(skill: string, skills?: any, saves?: any): string {
    let prof = this.getProf(skill, skills, saves);

    switch (prof) {
      case 0.5:
        return "◐"
      case 1:
        return "◉"
      case 2:
        return "●"
      default:
        return "◎"
    }
  }


  displayModifier(ability: string, stats: any, level: number, skills: any, saves: any): string {
    let mod = this.getModifier(ability, stats);

    let pb = Math.floor((level - 1) / 4) + 2;

    let prof = this.getProf(ability, skills, saves);

    return this.formatModifier(mod + Math.floor(pb * prof));
  }


  getNumberModifier(ability: string, stats: any, level: number, skills: any): number {
    let mod = this.getModifier(ability, stats);

    let pb = Math.floor((level - 1) / 4) + 2;

    let prof = this.getProf(ability, skills, null);

    return mod + Math.floor(pb * prof);
  }


  formatModifier(modifier: number): string {
    return `${modifier >= 0 ? "+" : ""}${modifier}`;
  }


  getModifier(ability: string, stats: any): number {
    let score = 0;

    switch (ability) {
      case "dex":
      case "dexterity":
      case "acrobatics":
      case "sleightOfHand":
      case "stealth":
        score = stats.dex;
        break;
      case "wis":
      case "wisdom":
      case "animalHandling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        score = stats.wis;
        break;
      case "int":
      case "intelligence":
      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        score = stats.int;
        break;
      case "str":
      case "strength":
      case "athletics":
        score = stats.str;
        break;
      case "cha":
      case "charisma":
      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        score = stats.cha;
        break;
      case "con":
      case "constitution":
        score = stats.con;
        break;
    }
    return Math.floor((score - 10) / 2);
  }


  getProf(ability: string, skills?: any, saves?: any): number {
    let prof = 0;

    if (!!skills && !!skills[ability]) {
      prof = skills[ability]
    }
    else if (!!saves && saves[ability]) {
      prof = saves[ability]
    }

    return prof
  }


  private drawPage2(page: PDFPage, font: PDFFont, charData: CharacterData) {

    let fontSize = 10;
    let titleSize = 12;
    let spacing = 1.2;
    let lineHeight = fontSize * spacing;

    const colW = this.contentWidth - 10;



    let startY = 587;
    let bgNameText = `Background Feature: ${charData.background_feature_name}`;

    page.drawText(bgNameText, { x: this.margin + 5, y: startY - (titleSize + 5), size: titleSize, font: font });

    let currentY = 553;


    currentY = this.multiLineText(page, font, charData.background_feature, currentY, fontSize, lineHeight, colW)


    let bgHeight = startY - currentY;


    page.drawRectangle({ x: this.margin, y: startY - bgHeight, width: this.contentWidth, height: bgHeight, borderColor: BLUE, borderWidth: 2 });



    page.drawText("Inventory", { x: this.margin + 5, y: currentY - (titleSize + 3), size: titleSize, font: font });

    page.drawRectangle({ x: this.margin, y: currentY - 20, width: this.contentWidth, height: 20, borderColor: BLUE, borderWidth: 2 });

    let rows = Math.floor((currentY - 55)/16);


    currentY -= 20;


    for (let i = 0; i < rows; i++) {

      page.drawRectangle({ x: this.margin, y: currentY - 16, width: this.contentWidth, height: 16, borderColor: BLUE, borderWidth: 0.5 });
      currentY -= 16;

    }


    page.drawRectangle({ x: this.margin, y: currentY, width: this.contentWidth, height: 16*rows, borderColor: BLUE, borderWidth: 2 });


  }


  private multiLineText(page: PDFPage, font: PDFFont, text: string, y: number, fontSize: number, lineHeight: number, w: number): number {

    const paragraphs = text.split('\n');
    let currentY = y;

    paragraphs.forEach((para) => {
      const words = para.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > w) {
          page.drawText(currentLine, { x: this.margin + 5, y: currentY, size: fontSize, font });
          currentY -= lineHeight;
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        page.drawText(currentLine, { x: this.margin + 5, y: currentY, size: fontSize, font });
        currentY -= lineHeight;
      }
    });

    return currentY;

  }


  private paginateLongText(doc: PDFDocument, features: Array<{name: string, description: string}>, font: PDFFont) {
    const fontSize = 10;
    const nameSize = 12;
    const lineHeight = 12;
    const bottomLimit = 40;

    let currentPage = doc.addPage([this.pageW, this.pageH]);
    let currentY = 580;

    currentPage.drawText('Features and Traits', { x: this.margin, y: currentY-2, size: 14, font: font });
    currentY -= 24;

    features.forEach((f) => { 

      if (currentY - (lineHeight*3) < bottomLimit) {
        currentPage = doc.addPage([this.pageW, this.pageH]);
        currentY = 580;
      }

      currentPage.drawText(f.name, { x: this.margin, y: currentY, size: nameSize, font });
      currentY -= lineHeight+2;


    const paragraphs = f.description.split('\n');

    paragraphs.forEach((para) => {
      if (!para.trim()) {
        return;
      }

      let width = this.contentWidth;
      let x = this.margin;


      if (para.startsWith("\\t")) {
        para = para.slice(2)
        para = `• ${para}`
        width -= this.margin/2;
        x += this.margin/2;
      }

      const words = para.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > width) {
          currentPage.drawText(currentLine, { x: x, y: currentY, size: fontSize, font });
          currentY -= lineHeight;

          if (currentY < bottomLimit) {
            currentPage = doc.addPage([this.pageW, this.pageH]);
            currentY = 580;
          }
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        currentPage.drawText(currentLine, { x: x, y: currentY, size: fontSize, font });
        currentY -= lineHeight;
        if (currentY < bottomLimit) {
          currentPage = doc.addPage([this.pageW, this.pageH]);
          currentY = 580;
        }
      }
      currentY -= 6;
    });
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
