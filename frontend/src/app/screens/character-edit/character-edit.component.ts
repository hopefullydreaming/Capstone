import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  CharacterRecord, ClassFeature, SpeciesFeature, Resource, CharacterDetail,
  SKILLS, TOOLS, ABILITIES, ALL_WEAPONS, ARMOR

} from "../../models/models";
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
  tools: Array<{id: string, label: string}> = []
  toolString = signal<string>("");

  skillList = SKILLS;

  abilityList = ABILITIES;


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

        this.data.resources.forEach((r: Resource) => {
          this.resources.push({...r, max_value: this.getResourceMax(r.max)})
        })

        let toolStrArray: string[] = []

        if (this.data.tools) Object.keys(this.data.tools).forEach((key) => {
          let tool = TOOLS.find(t => t.id === key)
          if (tool) toolStrArray.push(tool.label)
        });

        this.data.armor.forEach((key: string) => {
          let armor = ARMOR.find(a => a.id === key)
          if (armor) toolStrArray.push(armor.label)
        })

        this.data.weapons.forEach((key: string) => {
          let weapon = ALL_WEAPONS.find(w => w.id === key)
          if (weapon) toolStrArray.push(weapon.label)
        })

        this.toolString.set(toolStrArray.join(", "))
        
        this.senses = this.data.senses;

        let rowNum = 13 + this.senses.length - this.resources.length

        for (let i = 0; i < rowNum; i++) {

          this.rowDisplay.push({ id: i });
        }

      },
      error: (err) => console.error(err)
    });


  }

  delete() {
    this.dataService.deleteCharacter(this.row_id()).subscribe(() => {
      this.router.navigate(['/characters'], { replaceUrl: true });
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
      tools: this.data.tools ?? {},
      armor: this.data.armor ?? [],
      weapons: this.data.weapons ?? [],
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
