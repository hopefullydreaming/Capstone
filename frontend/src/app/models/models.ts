
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



export type Item = {
  id: string;
  label: string;
}





export const SKILLS: Item[] = [
  { id: "acrobatics", label: "Acrobatics" },
  { id: "animalHandling", label: "Animal Handling" },
  { id: "arcana", label: "Arcana" },
  { id: "athletics", label: "Athletics" },
  { id: "deception", label: "Deception" },
  { id: "history", label: "History" },
  { id: "insight", label: "Insight" },
  { id: "intimidation", label: "Intimidation" },
  { id: "investigation", label: "Investigation" },
  { id: "medicine", label: "Medicine" },
  { id: "nature", label: "Nature" },
  { id: "perception", label: "Perception" },
  { id: "performance", label: "Performance" },
  { id: "persuasion", label: "Persuasion" },
  { id: "religion", label: "Religion" },
  { id: "sleightOfHand", label: "Sleight of Hand" },
  { id: "stealth", label: "Stealth" },
  { id: "survival", label: "Survival" }
];

export const TOOLS: Item[] = [
  { id: "thieves", label: "Thieves' tools" },
  { id: "navigators", label: "Navigator's tools" },
  { id: "alchemists", label: "Alchemist's supplies" },
  { id: "brewers", label: "Brewer's supplies" },
  { id: "calligraphers", label: "Calligrapher's supplies" },
  { id: "carpenters", label: "Carpenter's tools" },
  { id: "cartographers", label: "Cartographer's tools" },
  { id: "cobblers", label: "Cobbler's tools" },
  { id: "cooks", label: "Cook's utensils" },
  { id: "glassblowers", label: "Glassblower's tools" },
  { id: "jewelers", label: "Jeweler's tools" },
  { id: "leatherworkers", label: "Leatherworker's tools" },
  { id: "masons", label: "Mason's tools" },
  { id: "painters", label: "Painter's supplies" },
  { id: "potters", label: "Potter's tools" },
  { id: "smiths", label: "Smith's tools" },
  { id: "tinkers", label: "Tinker's tools" },
  { id: "weavers", label: "Weaver's tools" },
  { id: "woodcarvers", label: "Woodcarver's tools" },
  { id: "herbalism", label: "Herbalism kit" },
  { id: "disguise", label: "Disguise kit" },
  { id: "forgery", label: "Forgery kit" },
];



export const ABILITIES: Item[] = [
  { id: "strength", label: "STR" },
  { id: "dexterity", label: "DEX" },
  { id: "constitution", label: "CON" },
  { id: "intelligence", label: "INT" },
  { id: "wisdom", label: "WIS" },
  { id: "charisma", label: "CHA" }
];


export const ARMOR: Item[] = [
  { id: "light", label: "Light armor" },
  { id: "medium", label: "Medium armor" },
  { id: "heavy", label: "Heavy armor" },
  { id: "all", label: "All armor" },
  { id: "shield", label: "Shields" }
];


export const ALL_WEAPONS: Item[] = [
  { id: "simple", label: "Simple weapons" },
  { id: "martial", label: "Martial weapons" },
  { id: "club", label: "Club" },
  { id: "dagger", label: "Dagger" },
  { id: "greatclub", label: "Greatclub" },
  { id: "handaxe", label: "Handaxe" },
  { id: "javelin", label: "Javelin" },
  { id: "hammer_light", label: "Light Hammer" },
  { id: "mace", label: "Mace" },
  { id: "quarterstaff", label: "Quarterstaff" },
  { id: "sickle", label: "Sickle" },
  { id: "spear", label: "Spear" },
  { id: "crossbow_light", label: "Light Crossbow" },
  { id: "dart", label: "Dart" },
  { id: "shortbow", label: "Shortbow" },
  { id: "sling", label: "Sling" },
  { id: "battleaxe", label: "Battleaxe" },
  { id: "flail", label: "Flail" },
  { id: "glaive", label: "Glaive" },
  { id: "greataxe", label: "Greataxe" },
  { id: "greatsword", label: "Greatsword" },
  { id: "halberd", label: "Halberd" },
  { id: "lance", label: "Lance" },
  { id: "longsword", label: "Longsword" },
  { id: "maul", label: "Maul" },
  { id: "morningstar", label: "Morningstar" },
  { id: "pike", label: "Pike" },
  { id: "rapier", label: "Rapier" },
  { id: "scimitar", label: "Scimitar" },
  { id: "shortsword", label: "Shortsword" },
  { id: "trident", label: "Trident" },
  { id: "warpick", label: "War Pick" },
  { id: "warhammer", label: "Warhammer" },
  { id: "whip", label: "Whip" },
  { id: "blowgun", label: "Blowgun" },
  { id: "crossbow_hand", label: "Hand Crossbow" },
  { id: "crossbow_heavy", label: "Heavy Crossbow" },
  { id: "longbow", label: "Longbow" },
  { id: "net", label: "Net" },
];



export const SIMPLE_WEAPONS: Item[] = [
  { id: "club", label: "Club" },
  { id: "dagger", label: "Dagger" },
  { id: "greatclub", label: "Greatclub" },
  { id: "handaxe", label: "Handaxe" },
  { id: "javelin", label: "Javelin" },
  { id: "hammer_light", label: "Light Hammer" },
  { id: "mace", label: "Mace" },
  { id: "quarterstaff", label: "Quarterstaff" },
  { id: "sickle", label: "Sickle" },
  { id: "spear", label: "Spear" },
  { id: "crossbow_light", label: "Light Crossbow" },
  { id: "dart", label: "Dart" },
  { id: "shortbow", label: "Shortbow" },
  { id: "sling", label: "Sling" }
];


export const MARTIAL_WEAPONS: Item[] = [
  { id: "battleaxe", label: "Battleaxe" },
  { id: "flail", label: "Flail" },
  { id: "glaive", label: "Glaive" },
  { id: "greataxe", label: "Greataxe" },
  { id: "greatsword", label: "Greatsword" },
  { id: "halberd", label: "Halberd" },
  { id: "lance", label: "Lance" },
  { id: "longsword", label: "Longsword" },
  { id: "maul", label: "Maul" },
  { id: "morningstar", label: "Morningstar" },
  { id: "pike", label: "Pike" },
  { id: "rapier", label: "Rapier" },
  { id: "scimitar", label: "Scimitar" },
  { id: "shortsword", label: "Shortsword" },
  { id: "trident", label: "Trident" },
  { id: "warpick", label: "War Pick" },
  { id: "warhammer", label: "Warhammer" },
  { id: "whip", label: "Whip" },
  { id: "blowgun", label: "Blowgun" },
  { id: "crossbow_hand", label: "Hand Crossbow" },
  { id: "crossbow_heavy", label: "Heavy Crossbow" },
  { id: "longbow", label: "Longbow" },
  { id: "net", label: "Net" },
];






