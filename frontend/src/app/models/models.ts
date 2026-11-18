
// class 
export type Class = HasSource & {
  row_id: number;
  name: string;
  description: string;
  subclass_level: number;
  hit_dice: number;
  data: string;
}

export type Subclass = HasSource & {
  row_id: number;
  class_row_id: number;
  class_name?: string;
  source_name?: string;
  name: string;
  description: string;
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
  data: string;
}




// species 
export type Species = HasSource & {
  row_id: number;
  name: string;
  description: string;
  size: string;
}

export type Subspecies = HasSource & {
  row_id: number;
  species_row_id: number;
  name: string;
  description: string;
}

export type SpeciesFeature = {
  row_id: number;
  species_row_id: number;
  subspecies_row_id?: number;
  is_printed: boolean;
  name: string;
  description: string;
  data: string;
}


export type Background = {
  row_id: number;
  name: string;
  skill_proficiencies: string;
  tool_proficiencies: string;
  languages: string;
  description: string;
  feature: string;
  feature_name: string;
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


export type CharacterDetail = {
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
  background_feature?: string;
  background_feature_name?: string;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  data: string;

  species_features: SpeciesFeature[];
  class_features: ClassFeature[];


}


export type Resource = {
  name: string;
  max: number;
  max_value?: number;
  recharge: string;
}


export interface HasSource {
  source_row_id: number;
}



export type Source = {
  row_id: number;
  name: string;
  is_homebrew: boolean;
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
















