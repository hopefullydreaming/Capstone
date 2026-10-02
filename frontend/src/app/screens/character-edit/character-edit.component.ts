import { Component, signal, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CharacterRecord } from "../../models/models";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  imports: [],
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


  ngOnInit() {
    this.route.params.subscribe(params => {
      const row_id = +params['row_id'];
      this.row_id.set(row_id);
    });

    this.dataService.getCharacterRecord().subscribe({
      next: (data: CharacterRecord) => {
        this.character.set(data);
        console.log("CharacterRecord: ", this.character())

      },
      error: (err) => console.error(err)
    });



  }


}
