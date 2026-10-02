import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Class, Subclass, ClassFeature } from "../../models/models";

@Component({
  imports: [CommonModule],
  selector: 'app-class-listing',
  styleUrl: './class-listing.css',
  templateUrl: './class-listing.html',
})
export class ClassListing {
  classes= signal<Class[]>([]);
  subclasses= signal<Subclass[]>([]);
  classFeatures= signal<ClassFeature[]>([]);


  constructor(private classService: DataService) {}

  ngOnInit() {
    this.classService.getClasses().subscribe({
      next: (data: Class[]) => {
        this.classes.set(data);
        console.log("CLASSES: ", this.classes())

      },
      error: (err) => console.error(err)
    });

    this.classService.getClericSubclasses().subscribe({
      next: (data: Subclass[]) => {
        this.subclasses.set(data);
        console.log("SUBCLASSES: ", this.subclasses())

      },
      error: (err) => console.error(err)
    });

    this.classService.getLifeCleric().subscribe({
      next: (data: ClassFeature[]) => {
        this.classFeatures.set(data);
        console.log("classFeatures: ", this.classFeatures())

      },
      error: (err) => console.error(err)
    });
  }

}
