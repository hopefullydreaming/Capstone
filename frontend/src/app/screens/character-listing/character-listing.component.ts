import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Class, Subclass, CharacterListing } from "../../models/models";
import { Router } from '@angular/router'
import { CharacterLevelComponent } from '../character-level/character-level.component';

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
    this.refreshData();
  }

  refreshData() {
    this.dataService.getCharacterListing().subscribe({
      next: (data: CharacterListing[]) => {
        this.characters.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  clickCharacter(row_id: number) {
    this.router.navigate(['/character', row_id]);
  }

  addCharacter() {
    this.router.navigate(['/character/new']);
  }

  delete(row_id: number) {
    this.dataService.deleteCharacter(row_id).subscribe(() => {
      this.refreshData();
    });
  }

  levelUp(row_id: number, char: any) {
    this.router.navigate(['/character', row_id, 'level', char.level+1], { replaceUrl: true, state: { level: char.level+1, class_row_id: char.class_row_id } });
  }

}
