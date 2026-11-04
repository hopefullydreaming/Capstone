import { Component, signal, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, Species, Subspecies, Background, CharacterPayload, ClassFeature, SpeciesFeature, Resource, CharacterRecord } from "../../models/models";
import { Router, ActivatedRoute } from '@angular/router'
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TooltipModule } from 'primeng/tooltip';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TooltipOptions } from 'primeng/api';



@Component({
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TooltipModule,
  ],
  selector: 'app-character-level.component',
  styleUrl: './character-level.component.css',
  templateUrl: './character-level.component.html',
})
export class CharacterLevelComponent {

  private fb = inject(FormBuilder);

  router = inject(Router);
  route = inject(ActivatedRoute);
  dataService = inject(DataService);


  // backgrounds = signal<Background[]>([]);
  // classes = signal<Class[]>([]);
  // subclasses = signal<Subclass[]>([]);
  // filteredSubclasses = signal<Subclass[]>([]);
  // species = signal<Species[]>([]);
  // subspecies = signal<Subspecies[]>([]);
  // filteredSubspecies = signal<Subspecies[]>([]);

  row_id = signal<number | null>(null);
  character = signal<CharacterRecord | null>(null);
  char: CharacterRecord = null;

  classFeatures = signal<ClassFeature[]>([])
  speciesFeatures = signal<SpeciesFeature[]>([])


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



  data: any = {};

  skillChoices: any[] = [];

  level: number;
  targetLevel: number;

  // resources: Resource[] = []
  // senses: any[] = []


  // tooltipOptions: TooltipOptions = {
  //   showDelay: 150,
  //   autoHide: false,
  //   tooltipEvent: 'hover',
  //   tooltipPosition: 'left'
  // };

  skillArray = signal<FormArray>(null);

  form: FormGroup = this.fb.group({
    // name: ["", Validators.required],
    // background_row_id: [null, Validators.required],
    // class_row_id: [null, Validators.required],
    // subclass_row_id: [null],
    // species_row_id: [null, Validators.required],
    // subspecies_row_id: [null],


    // level: [1, [Validators.required, Validators.max(20), Validators.min(1)]],


    // strength: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    // dexterity: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    // constitution: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    // intelligence: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    // wisdom: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    // charisma: [10, [Validators.required, Validators.max(20), Validators.min(1)]]
  });

  ngOnInit() {
    console.log("\n\nINIT\n\n")
    this.loadData();

  }

  loadData() {
    console.log("\n\nLOAD\n\n")
    this.route.params.subscribe(params => {
      const row_id = +params['row_id'];
      this.row_id.set(row_id);
    });

    this.route.params.subscribe(params => {
      const level = +params['level'];
      this.level = level
    });

    this.targetLevel = history.state.level


    this.dataService.getCharacterRecord(this.row_id()).subscribe({
      next: (data: CharacterRecord) => {
        this.character.set(data);
        this.char = data;
        this.data = JSON.parse(data.data);
        console.log("CharacterRecord: ", this.character(), this.data);
        // this.getFeatures();

        // this.resources = this.data.resources;
        // this.senses = this.data.senses;

        // if (this.level > 1) {

        this.dataService.getClassFeatures(this.char.class_row_id, this.level, this.char.subclass_row_id).subscribe({
          next: (d: ClassFeature[]) => {
            this.classFeatures.set(d);
          },
          error: (err) => console.error(err)
        });

        // }
        if (this.level == 1) {
          let classObj = history.state.classObj;

          let data = JSON.parse(classObj.data);

          console.log("CLASSS OBJ", classObj, data)


          this.skillChoices = this.skillList.filter(s => data.choice.skills.find((skill: any) => skill === s.id) !== undefined)

          let skillsArray = this.fb.array([])

          for (let i = 0; i < data.choice.number; i++) {
            skillsArray.push(new FormControl(null, [Validators.required]))
            console.log("ADD CONTROL")
          }
          console.log("SKILL ARRAY", skillsArray)
          console.log("skill choices", this.skillChoices)

          this.form.registerControl("skillArray", skillsArray)

          this.skillArray.set(skillsArray);

        }
        else {
          this.skillArray.set(null);
        }

      },
      error: (err) => console.error(err)
    });


  }


  handleASI(ability: string, stats: any, increase: number): any {

    switch (ability) {
      case "dex":
        return stats.dexterity += increase;
      case "wis":
        return stats.wisdom += increase;
      case "int":
        return stats.intelligence += increase;
      case "str":
        return stats.strength += increase;
      case "cha":
        return stats.charisma += increase;
      case "con":
        return stats.constitution += increase;
    }
    return stats;
  }




  getFeatures() {

    let features: any = {};
    let resources: any[] = [];
    let senses: any[] = [];

    let stats = {
      strength: this.char.strength,
      dexterity: this.char.dexterity,
      constitution: this.char.constitution,
      intelligence: this.char.intelligence,
      wisdom: this.char.wisdom,
      charisma: this.char.charisma,
    }

    for (let i in this.classFeatures()) {
      try {
        let featureData = JSON.parse(this.classFeatures()[i].data)
        if (!!featureData.resource) {
          resources.push(featureData.resource)
        }
        if (!!featureData.sense) {
          senses.push(featureData.sense);
        }
      }
      catch (e) {
        continue;
      }
    }
    let skills = this.data.skills
    console.log("SKILLS BEFORE:", this.data.skills)

    if (this.skillArray() != null) {
      let values = this.skillArray().getRawValue();
      console.log("SKILLS RAW VALUE", values)
      for (let s in values) skills[values[s].id] = 1;

      console.log("SKILLS AFTER: ", skills)
    }

    // now all are loaded
    console.log("FEATURES: ", this.data, resources, this.classFeatures(), this.speciesFeatures());

    let conMod = Math.floor((stats.constitution - 10) / 2);
    let maxHp;

    if (this.level > 1) {
      maxHp = this.data.max_hp + ((this.data.hit_dice / 2) + 1) + conMod
    }
    else {
      maxHp = this.data.hit_dice + conMod
    }
    let payload;
    // let saves = JSON.parse(classObj.data).saves

    // if (this.level > 1) {
      payload = {
        row_id: this.row_id(),
        stats: stats,
        level: this.targetLevel,
        data: JSON.stringify({
          ...features,
          speed: this.data.speed,
          saves: this.data.saves,
          skills: skills,
          max_hp: maxHp,
          hit_dice: this.data.hit_dice,
          resources: [...this.data.resources, ...resources],
          senses: [...this.data.senses, ...senses],
        })
      }
    // }
    // else {
    //   payload = {
    //     row_id: this.row_id(),
    //     stats: stats,
    //     data: JSON.stringify(
    //       this.data
    //       {
    //       ...features,
    //       speed: this.data.speed,
    //       saves: this.data.saves,
    //       max_hp: maxHp,
    //       hit_dice: this.data.hit_dice,
    //       resources: [...resources],
    //       senses: [...senses],
    //       }

    //     )
    //   }

    // }

    console.log("PAYLOAD: ", payload)

    this.dataService.putCharacterData(payload, this.row_id()).subscribe(() => {
      if (this.targetLevel > this.level) {
        this.router.navigate(['/character', this.row_id(), 'level', this.level + 1], { replaceUrl: true, state: { level: this.targetLevel } });
        this.loadData();
        console.log("LEVEL", this.level, this.targetLevel)
      }
      else {
        this.router.navigate(['/character', this.row_id()], { replaceUrl: true })
        console.log("CHAR", this.level, this.targetLevel)
      }
    })


  }

  ngOnDestroy() {
console.log("\n\nDESTROY\n\n")
  }

  submit() {
    console.log("SUBMIT")

    this.getFeatures();

  }


}
