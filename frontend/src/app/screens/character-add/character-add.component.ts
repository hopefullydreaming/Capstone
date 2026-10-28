import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, Species, Subspecies, Background, CharacterPayload } from "../../models/models";
import { Router } from '@angular/router'

// import { filter } from 'rxjs';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';



@Component({
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
  ],
  selector: 'app-character-add.component',
  styleUrl: './character-add.component.css',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  private fb = inject(FormBuilder);

  dataService = inject(DataService);
  router = inject(Router);

  backgrounds = signal<Background[]>([]);
  classes = signal<Class[]>([]);
  showSubclass = signal<boolean>(false);
  subclasses = signal<Subclass[]>([]);
  filteredSubclasses = signal<Subclass[]>([]);
  species = signal<Species[]>([]);
  subspecies = signal<Subspecies[]>([]);
  filteredSubspecies = signal<Subspecies[]>([]);



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
        console.log("BACKGROUNDS: ", this.backgrounds())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getClasses().subscribe({
      next: (data: Class[]) => {
        this.classes.set(data);
        console.log("CLASSES: ", this.classes())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubclasses().subscribe({
      next: (data: Subclass[]) => {
        this.subclasses.set(data);
        console.log("SUBCLASSES: ", this.subclasses())

      },
      error: (err) => console.error(err)
    });


    this.dataService.getSpecies().subscribe({
      next: (data: Species[]) => {
        this.species.set(data);
        console.log("SPECIES: ", this.species())

      },
      error: (err) => console.error(err)
    });

    this.dataService.getAllSubspecies().subscribe({
      next: (data: Subspecies[]) => {
        this.subspecies.set(data);
        console.log("SUBSPECIES: ", this.subspecies())

      },
      error: (err) => console.error(err)
    });

    this.form.get("class_row_id")?.valueChanges.subscribe(val => {
      this.filteredSubclasses.set(this.subclasses().filter(s => s.class_row_id == val))
    })

    this.form.get("species_row_id")?.valueChanges.subscribe(val => {
      this.filteredSubspecies.set(this.subspecies().filter(s => s.species_row_id == val))
    })


  }



  submit() {


    const values = this.form.getRawValue();


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

    console.log("PAYLOAD: ", payload)
    this.dataService.postCharacter(payload).subscribe(val => {
      console.log("POST CHAR VAL: ", val)
    })

  }


}
