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
  // classObj = signal<Class>(null);
  // subclasses = signal<Subclass[]>([]);
  // subclass_level = signal<number | null>(null);
  // filteredSubclasses = signal<Subclass[]>([]);
  // species = signal<Species[]>([]);
  // subspecies = signal<Subspecies[]>([]);
  // filteredSubspecies = signal<Subspecies[]>([]);

  row_id = signal<number | null>(null);
  character = signal<CharacterRecord | null>(null);
  char: CharacterRecord = null;

  classFeatures = signal<ClassFeature[]>([])
  speciesFeatures = signal<SpeciesFeature[]>([])

  choiceOptions: any[] = [];
  choiceId: string = "";

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
  choiceArray = signal<FormArray>(null);

  form: FormGroup = this.fb.group({});

  ngOnInit() {
    console.log("\n\nINIT\n\n")
    this.loadData();


    // let class_id = history.state.class_row_id
    // this.dataService.getClasses().subscribe({
    //   next: (data: Class[]) => {
    //     this.classes.set(data);
    //     console.log("CLASSES: ", this.classes())

    //     console.log("class id", class_id, this.classes())

    //     this.classObj.set(this.classes().find(c => c.row_id == class_id));

    //     console.log("class obj", this.classObj())
    //     this.subclass_level.set(this.classObj().subclass_level)

    //     console.log("subclass lvl", this.subclass_level())

    //   },
    //   error: (err) => console.error(err)
    // });

    // this.dataService.getSubclasses(class_id).subscribe({
    //   next: (data: Subclass[]) => {
    //     this.subclasses.set(data);
    //     console.log("SUBCLASSES: ", this.subclasses())

    //   },
    //   error: (err) => console.error(err)
    // });


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


        let features: any = {};
        let resources: any[] = [];
        let senses: any[] = [];

        this.dataService.getClassFeatures(this.char.class_row_id, this.level, this.char.subclass_row_id).subscribe({
          next: (d: ClassFeature[]) => {
            this.classFeatures.set(d);

            for (let i in d) {
              try {
                console.log("DATA: ", d[i].data)
                let featureData = JSON.parse(d[i].data)
                console.log("DATA: ", featureData)

                if (!!featureData.choice) {
                  console.log("ADD CHOICE")
                  this.addChoice(featureData.choice)
                }

              }
              catch (e) {
                continue;
              }
            }



          },
          error: (err) => console.error(err)
        });


        // if first level, add skill proficiencies
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

  addChoice(choiceObj: any) {

    this.choiceOptions = choiceObj.options
    this.choiceId = choiceObj.id;

    let choicesArray = this.fb.array([])

    for (let i = 0; i < choiceObj.number; i++) {
      choicesArray.push(new FormControl(null, [Validators.required]))
      console.log("ADD CONTROL")
    }
    console.log("choice ARRAY", choicesArray)
    console.log("choice opts", this.choiceOptions)

    this.form.registerControl("choiceArray", choicesArray)

    this.choiceArray.set(choicesArray);

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
        console.log("DATA: ", this.classFeatures()[i].data)
        let featureData = JSON.parse(this.classFeatures()[i].data)
        console.log("DATA: ", featureData)
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

    let choices = this.data.choices ?? {}
    console.log("choices BEFORE:", this.data.choices)

    if (this.choiceArray() != null) {
      let values = this.choiceArray().getRawValue();
      console.log("SKILLS RAW VALUE", values)
      for (let s in values) choices[this.choiceId] = values[s];

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

      payload = {
        row_id: this.row_id(),
        stats: stats,
        level: this.targetLevel,
        data: JSON.stringify({
          ...features,
          speed: this.data.speed,
          saves: this.data.saves,
          skills: skills,
          choices: choices,
          max_hp: maxHp,
          hit_dice: this.data.hit_dice,
          resources: [...this.data.resources, ...resources],
          senses: [...this.data.senses, ...senses],
        })
      }
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
