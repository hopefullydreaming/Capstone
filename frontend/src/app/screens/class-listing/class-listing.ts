import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Classes } from '../../services/classes';


@Component({
  imports: [CommonModule],
  selector: 'app-class-listing',
  styleUrl: './class-listing.css',
  templateUrl: './class-listing.html',
})
export class ClassListing {
classes= signal<any[]>([]);

  constructor(private userService: Classes) {}

  ngOnInit() {
    this.userService.getClasses().subscribe({
      next: (data) => {
        this.classes.set(data);
        console.log("CLASSES: ", this.classes())

      },
      error: (err) => console.error(err)
    });
  }

}
