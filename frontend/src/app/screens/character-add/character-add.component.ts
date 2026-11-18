import { Component, signal, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, Species, Subspecies, Background, CharacterPayload, ClassFeature, SpeciesFeature, Source, HasSource } from "../../models/models";
import { Router, ActivatedRoute } from '@angular/router'
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TooltipModule } from 'primeng/tooltip';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
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
    CheckboxModule,
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
  species = signal<Species[]>([]);
  subspecies = signal<Subspecies[]>([]);


  filteredSubclassesByClass = signal<Subclass[]>([]);
  filteredSubspeciesBySpecies = signal<Subspecies[]>([]);

  filteredSubclasses = computed(() => this.filterBySource(this.filteredSubclassesByClass()));
  filteredSubspecies = computed(() => this.filterBySource(this.filteredSubspeciesBySpecies()));

  row_id = signal<number>(0);
  showFilters = signal<boolean>(false);

  sources = signal<Source[]>([]);
  officialSources = signal<Source[]>([]);
  homebrewSources = signal<Source[]>([]);

  classFeatures = signal<ClassFeature[]>([]);
  speciesFeatures = signal<SpeciesFeature[]>([]);


  homebrewArray = signal<FormArray>(null);
  officialArray = signal<FormArray>(null);

  officialChecked = signal<boolean[]>([]);
  homebrewChecked = signal<boolean[]>([]);


  activeSourceIds = computed(() => {
    const allowedIds = new Set<number>();

    const officialList = this.officialSources();
    const officialBools = this.officialChecked();
    officialList.forEach((source, index) => {
      if (officialBools[index]) allowedIds.add(source.row_id);
    });

    const homebrewList = this.homebrewSources();
    const homebrewBools = this.homebrewChecked();
    homebrewList.forEach((source, index) => {
      if (homebrewBools[index]) allowedIds.add(source.row_id);
    });

    return allowedIds;
  });



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

  filterForm: FormGroup = this.fb.group({
    allOfficial: [true],
    officialArray: this.fb.array([]),
    allHomebrew: [true],
    homebrewArray: this.fb.array([])
  });

  ngOnInit() {
    this.dataService.getBackgrounds().subscribe({
      next: (data: Background[]) => {
        this.backgrounds.set(data);

      },
      error: (err) => console.error(err)
    });

    this.dataService.getClasses().subscribe({
      next: (data: Class[]) => {
        this.classes.set(data);

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubclasses().subscribe({
      next: (data: Subclass[]) => {
        this.subclasses.set(data);

      },
      error: (err) => console.error(err)
    });


    this.dataService.getSpecies().subscribe({
      next: (data: Species[]) => {
        this.species.set(data);

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubspecies().subscribe({
      next: (data: Subspecies[]) => {
        this.subspecies.set(data);

      },
      error: (err) => console.error(err)
    });


    this.dataService.getSources().subscribe({
      next: (data: Source[]) => {
        this.sources.set(data);
        this.officialSources.set(this.sources().filter(s => !s.is_homebrew))
        this.homebrewSources.set(this.sources().filter(s => s.is_homebrew))

        let officialArray = this.filterForm.get("officialArray") as FormArray;
        for (let i in this.officialSources()) {
          officialArray.push(new FormControl(true));
        }

        this.filterForm.registerControl("officialArray", officialArray)
        this.officialArray.set(officialArray);


        this.officialArray().valueChanges
          .subscribe((values: boolean[]) => {
            this.officialChecked.set(values); 
            const allChecked = values.length > 0 && values.every(Boolean);
            this.filterForm.get("allOfficial")?.setValue(allChecked, { emitEvent: false });
          });

        this.filterForm.get("allOfficial")?.valueChanges
          .subscribe((isChecked: boolean) => {
            const updatedValues = this.officialArray().controls.map(() => isChecked);
            this.officialArray().setValue(updatedValues, { emitEvent: false });
          });


        let homebrewArray = this.filterForm.get("homebrewArray") as FormArray;
        for (let i in this.homebrewSources()) {
          homebrewArray.push(new FormControl(true));
        }

        this.filterForm.registerControl("homebrewArray", homebrewArray)
        this.homebrewArray.set(homebrewArray);


        this.homebrewArray().valueChanges
          .subscribe((values: boolean[]) => {
            this.homebrewChecked.set(values); 
            const allChecked = values.length > 0 && values.every(Boolean);
            this.filterForm.get("allHomebrew")?.setValue(allChecked, { emitEvent: false });
          });

        this.filterForm.get("allHomebrew")?.valueChanges
          .subscribe((isChecked: boolean) => {
            const updatedValues = this.homebrewArray().controls.map(() => isChecked);
            this.homebrewArray().setValue(updatedValues, { emitEvent: false });
          });


      },
      error: (err) => console.error(err)
    });


    this.form.get("class_row_id")?.valueChanges.subscribe(val => {
      this.filteredSubclassesByClass.set(this.subclasses().filter(s => s.class_row_id == val))
    })

    this.form.get("species_row_id")?.valueChanges.subscribe(val => {
      this.filteredSubspeciesBySpecies.set(this.subspecies().filter(s => s.species_row_id == val))
    })


  }


  filterBySource<T extends HasSource>(items: T[]): T[] {
    const allowed = this.activeSourceIds();
    return items.filter((item) => allowed.has(item.source_row_id));
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

  toggleFilters() {
    this.showFilters.set(!this.showFilters())
  }




  getFeatures(class_row_id: number, level: number, species_row_id: number, stats: any, background_row_id: number, subclass_row_id: number = null, subspecies_row_id: number = null) {

    let features: any = {};
    let skills: any = {};
    let resources: any[] = [];
    let senses: any[] = [];

    this.dataService.getSpeciesFeatures(species_row_id, subspecies_row_id).subscribe({
      next: (d: SpeciesFeature[]) => {
        this.speciesFeatures.set(d);
        for (let i in d) {
          try {
            let featureData = JSON.parse(d[i].data)
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
              else if (!features.speed) {
                features = { ...features, speed: featureData.speed };
              }
            }
            if (!!featureData.skills) {
              skills = { ...skills, ...featureData.skills };
            }
            if (!!featureData.sense) {

              let index = senses.findIndex(s => s.name == featureData.sense.name)

              if (index < 0) {
                senses.push(featureData.sense);
              }
              else {
                senses[index] = featureData.sense
              }
            }
          }
          catch (e) {
            continue;
          }
        }

        let bgObj = this.backgrounds().find(b => b.row_id == background_row_id);

        let classObj = this.classes().find(c => c.row_id == class_row_id);
        let conMod = Math.floor((stats.constitution - 10) / 2);

        let maxHp = classObj.hit_dice + ((level - 1) * ((classObj.hit_dice / 2) + 1)) + (conMod * level)

        let saves = JSON.parse(classObj.data).saves
        let allskills = { ...skills, ...JSON.parse(bgObj.data).skills }

        let payload = {
          row_id: this.row_id(),
          stats: stats,
          level: level,
          data: JSON.stringify({
            ...features,
            saves: saves,
            skills: allskills,
            max_hp: maxHp,
            hit_dice: classObj.hit_dice,
            resources: resources,
            senses: senses,
          })
        }

        this.dataService.putCharacterData(payload, this.row_id()).subscribe(() => {
          this.router.navigate(['/character', this.row_id(), 'level', 1], { replaceUrl: true, state: { level: level, classObj: classObj } })
        });
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

    this.dataService.postCharacter(payload).subscribe((val: any) => {
      this.row_id.set(val[0].insertId);
      this.getFeatures(values.class_row_id, values.level, values.species_row_id, stats, values.background_row_id, values.subclass_row_id, values.subspecies_row_id);
    })

  }


}
