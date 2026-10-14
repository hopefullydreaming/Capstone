import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CharacterRecord } from "../../models/models";
import { ActivatedRoute, Router } from '@angular/router'
import { FloorPipe } from '../../pipes/floor-pipe';

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




  row_id = signal<number | null>(null);
  character = signal<CharacterRecord | null>(null);
  char: CharacterRecord = null;

  data: any = {};


  ngOnInit() {
    this.route.params.subscribe(params => {
      const row_id = +params['row_id'];
      this.row_id.set(row_id);
    });

    this.dataService.getCharacterRecord(this.row_id()).subscribe({
      next: (data: CharacterRecord) => {
        this.character.set(data);
        this.char = data;
        this.data = JSON.parse(data.data)
        console.log("CharacterRecord: ", this.character(), this.data)

      },
      error: (err) => console.error(err)
    });

  }

  getProf(skill: string): number {
    if (!this.data.skills) return 0;
    return this.data.skills[skill] ?? 0;
  }

  getProfDisplay(skill: string): string {
    let prof = this.getProf(skill);

    switch (prof) {
      case 0.5:
        return "JoaT"
      case 1:
        return "Prof"
      case 2:
        return "EXP"
      default:
        return ""
    }
  }

  getSkill(skill: string): string {
    let score = 0;
    
    switch (skill) {
      case "acrobatics":
      case "sleightOfHand":
      case "stealth":
        score = this.character().dexterity;
        break;
      case "animalHandling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        score = this.character().wisdom;
        break;
      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        score = this.character().intelligence;
        break;
      case "athletics":
        score = this.character().strength;
        break;
      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        score = this.character().charisma;
        break;
    }

    let pb = Math.floor(this.character().level / 4) + 2;
    let modifier = Math.floor((score - 10) / 2)

    let skillMod = modifier + Math.floor(pb * this.getProf(skill))

    if (skillMod >= 0) {
      return "+"+skillMod
    }

    return `${skillMod}`

  }


}
