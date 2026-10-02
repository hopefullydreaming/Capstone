import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, CharacterListing } from "../../models/models";
import { Router } from '@angular/router'

@Component({
  imports: [],
  selector: 'app-character-listing',
  templateUrl: './character-listing.component.html',
})
export class CharacterListingComponent {

  dataService = inject(DataService);
  router = inject(Router);

  characters = signal<CharacterListing[]>([]);


  ngOnInit() {
    this.dataService.getCharacterListing().subscribe({
      next: (data: CharacterListing[]) => {
        this.characters.set(data);
        console.log("CharacterListing: ", this.characters())

      },
      error: (err) => console.error(err)
    });
  }

  clickCharacter(row_id: number) {
    this.router.navigate(['/character', row_id]);
  }

  delete(row_id: number) {
    console.log("delete clicked for row id: ", row_id);
  }

  levelUp(row_id: number) {
    console.log("level up clicked for row id: ", row_id);
  }

}
