import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CharacterRecord, ClassFeature, SpeciesFeature, Resource, CharacterDetail } from "../../models/models";
import { ActivatedRoute, Router } from '@angular/router'
import { FloorPipe } from '../../pipes/floor-pipe';
import { GeneratePdfService, CharacterData, StatBlock } from '../../services/generate-pdf.service'



@Component({
  imports: [FloorPipe],
  selector: 'app-character-edit',
  styleUrl: './character-edit.component.css',
  templateUrl: './character-edit.component.html',
})
export class CharacterEditComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  dataService = inject(DataService);
  pdfService = inject(GeneratePdfService);




  row_id = signal<number | null>(null);
  character = signal<CharacterDetail | null>(null);
  char: CharacterDetail = null;

  rowDisplay: any[] = [];

  data: any = {};

  resources: Resource[] = []
  senses: any[] = []

  skillList = [
    { id: "acrobatics", label:"Acrobatics" },
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


  abilityList = [
    { id: "strength", label:"STR" },
    { id: "dexterity", label: "DEX" },
    { id: "constitution", label: "CON" },
    { id: "intelligence", label: "INT" },
    { id: "wisdom", label: "WIS" },
    { id: "charisma", label: "CHA" }
  ]


  ngOnInit() {
    this.route.params.subscribe(params => {
      const row_id = +params['row_id'];
      this.row_id.set(row_id);
    });

    this.dataService.getCharacterRecord(this.row_id()).subscribe({
      next: (data: CharacterDetail) => {
        this.character.set(data);
        this.char = data;
        this.data = JSON.parse(data.data);

        // this.resources = this.data.resources; 
        this.data.resources.forEach((r: Resource) => {
          this.resources.push({...r, max_value: this.getResourceMax(r.max)})
        })


        this.senses = this.data.senses;

        let rowNum = 13 + this.senses.length - this.resources.length

        for (let i = 0; i < rowNum; i++) {

          this.rowDisplay.push({ id: i });
        }

      },
      error: (err) => console.error(err)
    });


  }


  getResourceMax(data: any): number {
    if (data.table) {
      return data.table[this.character().level - 1]
    }
    if (data.stat) {
      let mod = this.getModifier(data.stat);
      return mod > 0 ? mod : 1
    }
    if (data.statplus) {
      let mod = this.getModifier(data.stat) + data.plus;
      return mod > 0 ? mod : 1
    }
    if (data.number) {
      return data.number
    }
    if (data.level) {
      return this.character().level * data.level
    }

    return 1;
  }

  // getFeatures() {

  //   this.dataService.getClassFeatures(this.character().class_row_id, this.character().level, this.character().subclass_row_id).subscribe({
  //     next: (data: ClassFeature[]) => {
  //       this.classFeatures.set(data);
  //     },
  //     error: (err) => console.error(err)
  //   });


  //   this.dataService.getSpeciesFeatures(this.character().species_row_id, this.character().subspecies_row_id).subscribe({
  //     next: (data: SpeciesFeature[]) => {
  //       this.speciesFeatures.set(data);
  //     },
  //     error: (err) => console.error(err)
  //   });


  // }

  displayModifier(ability: string): string {
    let mod = this.getModifier(ability);

    let pb = Math.floor((this.character().level -1 )/ 4) + 2;

    let prof = this.getProf(ability);

    return this.formatModifier(mod + Math.floor(pb * prof));
  }

  formatModifier(modifier: number): string {
    return `${modifier >= 0 ? "+" : ""}${modifier}`;
  }

  levelUp(row_id: number) {
    this.router.navigate(['/character', row_id, 'level', this.char.level + 1], { replaceUrl: true, state: { level: this.char.level + 1, class_row_id: this.char.class_row_id } });
  }

  async downloadPdf(row_id: number) {
    console.log("download clicked for row id: ", row_id, this.char, this.data);


    let data = {
      ac: 10 + this.getModifier("dex"),
      stats: {
        str: this.char.strength,
        dex: this.char.dexterity,
        con: this.char.constitution,
        int: this.char.intelligence,
        wis: this.char.wisdom,
        cha: this.char.charisma,
      },
      speed: this.data.speed,
      max_hp: this.data.max_hp,
      level: this.char.level,
      name: this.char.name,
      class_name: this.char.class_name,
      hit_dice: this.data.hit_dice,
      skills: this.data.skills,
      saves: this.data.saves,
      senses: this.data.senses,
      choices: this.data.choices,
      resources: this.resources,

      background_feature: this.char.background_feature,
      background_feature_name: this.char.background_feature_name,

      class_features: this.char.class_features,
      species_features: this.char.species_features } as CharacterData;

    console.log("DATA", data)

    await this.pdfService.generateAccessibleBooklet(data);
  }


  getScore(ability: string): number {

    switch (ability) {
      case "dexterity":
        return this.character().dexterity;
      case "wisdom":
        return this.character().wisdom;
      case "intelligence":
        return this.character().intelligence;
      case "strength":
        return this.character().strength;
      case "charisma":
        return this.character().charisma;
      case "constitution":
        return this.character().constitution;
    }
    return 10;
  }

  getModifier(ability: string): number {
    let score = 0;

    switch (ability) {
      case "dex":
      case "dexterity":
      case "acrobatics":
      case "sleightOfHand":
      case "stealth":
        score = this.character().dexterity;
        break;
      case "wis":
      case "wisdom":
      case "animalHandling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        score = this.character().wisdom;
        break;
      case "int":
      case "intelligence":
      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        score = this.character().intelligence;
        break;
      case "str":
      case "strength":
      case "athletics":
        score = this.character().strength;
        break;
      case "cha":
      case "charisma":
      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        score = this.character().charisma;
        break;
      case "con":
      case "constitution":
        score = this.character().constitution;
        break;
    }
    return Math.floor((score - 10) / 2);
  }

  getProf(ability: string): number {
    let prof = 0;

    if (!!this.data.skills && !!this.data.skills[ability]) {
      prof = this.data.skills[ability]
    }
    else if (!!this.data.saves && this.data.saves[ability]) {
      prof = this.data.saves[ability]
    }

    return prof
  }

  getPrinted(feature: any): string {
    let data = JSON.parse(feature.data);

    if (!!data.print) {
      let choice = this.data.choices[data.choice.id] ?? "NOT FOUND"

      let desc = data.choice.options.find((s: any) => {
        return s.name === choice
      })

      return `${data.print} ${choice}. ${desc.desc}`
    }

    return feature.description

  }

  getProfDisplay(skill: string): string {
    let prof = this.getProf(skill);

    switch (prof) {
      case 0.5:
        return "◐"
      case 1:
        return "◉"
      case 2:
        return "⬤"
      default:
        return "◎"
    }
  }

}
