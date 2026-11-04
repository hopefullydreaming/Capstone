import { Component, signal, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, Species, Subspecies, Background, CharacterPayload, ClassFeature, SpeciesFeature } from "../../models/models";
import { Router, ActivatedRoute } from '@angular/router'
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TooltipModule } from 'primeng/tooltip';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-character-add.component',
  styleUrl: './character-add.component.css',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  private fb = inject(FormBuilder);

  dataService = inject(DataService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  backgrounds = signal<Background[]>([]);
  classes = signal<Class[]>([]);
  subclasses = signal<Subclass[]>([]);
  filteredSubclasses = signal<Subclass[]>([]);
  species = signal<Species[]>([]);
  subspecies = signal<Subspecies[]>([]);
  filteredSubspecies = signal<Subspecies[]>([]);

  row_id = signal<number>(0);


  classFeatures = signal<ClassFeature[]>([]);
  speciesFeatures = signal<SpeciesFeature[]>([]);



  tooltipOptions: TooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'left'
  };



  form: FormGroup = this.fb.group({
    name: ["", Validators.required],
    background_row_id: [null, Validators.required],
    class_row_id: [null, Validators.required],
    subclass_row_id: [null],
    species_row_id: [null, Validators.required],
    subspecies_row_id: [null],


    level: [1, [Validators.required, Validators.max(20), Validators.min(1)]],


    strength: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    dexterity: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    constitution: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    intelligence: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    wisdom: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    charisma: [10, [Validators.required, Validators.max(20), Validators.min(1)]]
  });

  ngOnInit() {
    this.dataService.getBackgrounds().subscribe({
      next: (data: Background[]) => {
        this.backgrounds.set(data);
        // console.log("BACKGROUNDS: ", this.backgrounds())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getClasses().subscribe({
      next: (data: Class[]) => {
        this.classes.set(data);
        // console.log("CLASSES: ", this.classes())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubclasses().subscribe({
      next: (data: Subclass[]) => {
        this.subclasses.set(data);
        // console.log("SUBCLASSES: ", this.subclasses())

      },
      error: (err) => console.error(err)
    });


    this.dataService.getSpecies().subscribe({
      next: (data: Species[]) => {
        this.species.set(data);
        // console.log("SPECIES: ", this.species())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubspecies().subscribe({
      next: (data: Subspecies[]) => {
        this.subspecies.set(data);
        // console.log("SUBSPECIES: ", this.subspecies())

      },
      error: (err) => console.error(err)
    });

    let classInput = this.form.get("class_row_id");
    let levelInput = this.form.get("level");

    combineLatest([
      classInput.valueChanges.pipe(startWith(classInput.value)),
      levelInput.valueChanges.pipe(startWith(levelInput.value))
      // classInput.valueChanges, levelInput.valueChanges
    ]).subscribe(([cls, lvl]) => {


      let selectedClass = this.classes().find(c => c.row_id == cls);
      if (!!selectedClass && selectedClass.subclass_level <= lvl) {
        this.filteredSubclasses.set(this.subclasses().filter(s => s.class_row_id == cls))
      }
      else {
        this.filteredSubclasses.set([])
      }
    })

    this.form.get("species_row_id")?.valueChanges.subscribe(val => {
      this.filteredSubspecies.set(this.subspecies().filter(s => s.species_row_id == val))
    })


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


 

  getFeatures(class_row_id: number, level: number, species_row_id: number, stats: any, background_row_id: number, subclass_row_id: number = null,  subspecies_row_id: number = null) {

    let features: any = {};
    let resources: any[] = [];
    let senses: any[] = [];
    // console.log("GET FEATURES")

    this.dataService.getSpeciesFeatures(species_row_id, subspecies_row_id).subscribe({
      next: (d: SpeciesFeature[]) => {
        this.speciesFeatures.set(d);
        for (let i in d) {
          try {
            // console.log("FEATURE DATA: ", d[i].data, d[i].name);
            let featureData = JSON.parse(d[i].data)
            // console.log("FEATURE DATA: ", featureData, d[i].name);
            if (!!featureData.resource) {
              resources.push(featureData.resource);
            }
            if (!!featureData.asi) {

              Object.keys(featureData.asi).forEach((key) => {
                this.handleASI(key, stats, featureData.asi[key]);
              });
            }
            if (!!featureData.speed) {
              if (!!features.speed && featureData.speed.walking > features.speed.walking) {
                features = { ...features, speed: featureData.speed };
              }
              else if(!features.speed) {
                features = { ...features, speed: featureData.speed };
              }
            }
            if (!!featureData.sense) {

              let index = senses.findIndex(s => s.name == featureData.sense.name)

              if (index < 0) {
                senses.push(featureData.sense);
              }
              else {
                senses[index] = featureData.sense
              }


              // console.log("SENSE: ", senses, featureData.sense)
            }
          }
          catch (e) {
            continue;
          }
        }

        // this.dataService.getLevelOneClassFeatures(class_row_id, subclass_row_id).subscribe({
        //   next: (d: ClassFeature[]) => {
        //     this.classFeatures.set(d);
        //     for (let i in d) {
        //       try {
        //         let featureData = JSON.parse(d[i].data)
        //         if (!!featureData.resource) {
        //           resources.push(featureData.resource)
        //         }
        //         if (!!featureData.sense) {
        //           senses.push(featureData.sense);
        //         }
        //       }
        //       catch (e) {
        //         continue;
        //       }
        //     }

            // now all are loaded
        // console.log("FEATURES: ", resources, this.classFeatures(), this.speciesFeatures());

        let bgObj = this.backgrounds().find(b => b.row_id == background_row_id);

            let classObj = this.classes().find(c => c.row_id == class_row_id);
            let conMod = Math.floor((stats.constitution - 10) / 2);

            let maxHp = classObj.hit_dice + ((level - 1) * ((classObj.hit_dice / 2) + 1)) + (conMod * level)

            let saves = JSON.parse(classObj.data).saves
            let skills = JSON.parse(bgObj.data).skills

            let payload = {
              row_id: this.row_id(),
              stats: stats,
              level: level,
              data: JSON.stringify({
                ...features,
                saves: saves,
                skills: skills,
                max_hp: maxHp,
                hit_dice: classObj.hit_dice,
                resources: resources,
                senses: senses,
              })
            }

            console.log("PAYLOAD", payload)

            this.dataService.putCharacterData(payload, this.row_id()).subscribe(() => {
              // if (level > 1) {
                this.router.navigate(['/character',this.row_id(),'level', 1], { replaceUrl: true, state: { level: level, classObj: classObj } })
              // }
              // else {
              //   this.router.navigate(['/character', this.row_id()], { replaceUrl: true })
              // }
            })

        //   },
        //   error: (err) => console.error(err)
        // });
      },
      error: (err) => console.error(err)
    });
  }



  submit() {


    const values = this.form.getRawValue();

    let stats = {
      strength: values.strength,
      dexterity: values.dexterity,
      constitution: values.constitution,
      intelligence: values.intelligence,
      wisdom: values.wisdom,
      charisma: values.charisma,
    }


    const payload: CharacterPayload = {
      row_id: null,
      user_row_id: null,
      class_row_id: values.class_row_id,
      subclass_row_id: values.subclass_row_id,
      level: values.level,
      name: values.name,
      background_row_id: values.background_row_id,
      species_row_id: values.species_row_id,
      subspecies_row_id: values.subspecies_row_id,
      strength: values.strength,
      dexterity: values.dexterity,
      constitution: values.constitution,
      intelligence: values.intelligence,
      wisdom: values.wisdom,
      charisma: values.charisma,
      data: "{}"
    }

    // console.log("PAYLOAD: ", payload)
    this.dataService.postCharacter(payload).subscribe((val: any) => {
      this.row_id.set(val[0].insertId)

      this.getFeatures(values.class_row_id, values.level, values.species_row_id, stats, values.background_row_id, values.subclass_row_id, values.subspecies_row_id);

      console.log("POST CHAR VAL: ", val, this.row_id())
    })

  }


}
