
// class 
export type Class = {
  row_id: number;
  name: string;
  description: string;
  subclass_level: number;
  source_row_id: number;
}

export type Subclass = {
  row_id: number;
  class_row_id: number;
  class_name?: string;
  source_name?: string;
  name: string;
  description: string;
  source_row_id: number;
}

export type ClassFeature = {
  row_id: number;
  class_row_id: number;
  subclass_row_id?: number;
  class_name?: string;
  subclass_name?: string;
  level: number;
  name: string;
  description: string;
}




// species 
export type Species = {
  row_id: number;
  name: string;
  description: string;
  size: string;
  source_row_id: number;
}

export type Subspecies = {
  row_id: number;
  species_row_id: number;
  name: string;
  description: string;
  source_row_id: number;
}

export type SpeciesFeature = {
  row_id: number;
  species_row_id: number;
  subspecies_row_id?: number;
  is_printed: boolean;
  name: string;
  description: string;
}


export type Background = {
  row_id: number;
  name: string;
  description: string;
  data: string;
}




//character

export type CharacterListing = {
  row_id: number;
  name: string;
  level: number;
  class_row_id: number;
  class_name?: string;
  subclass_row_id?: number;
  subclass_name?: string;
  species_row_id: number;
  species_name?: string;
  subspecies_row_id?: number;
  subspecies_name?: string;
}



export type CharacterRecord = {
  row_id: number;
  name: string;
  level: number;
  class_row_id: number;
  class_name?: string;
  subclass_row_id?: number;
  subclass_name?: string;
  species_row_id: number;
  species_name?: string;
  subspecies_row_id?: number;
  subspecies_name?: string;

  background_row_id?: number;
  background_name?: string;
  background_description?: string;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

data: string;


}








export type CharacterPayload = {
  row_id?: number;
  user_row_id?: number;
  name: string;
  level: number;
  class_row_id: number;
  subclass_row_id?: number;
  species_row_id: number;
  subspecies_row_id?: number;

  background_row_id?: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

data: string;


}
















