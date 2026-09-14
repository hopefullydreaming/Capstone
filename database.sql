-- Database schema for the Capstone project


-- Create the capstone database
CREATE DATABASE IF NOT EXISTS capstone;


-- Make the capstone database the current database
USE capstone;
START TRANSACTION;

CREATE TABLE sources (
  row_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  is_homebrew BOOLEAN NOT NULL
);

CREATE TABLE species (
  row_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  source_row_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  size set('Small','Medium') NOT NULL,
  FOREIGN KEY (source_row_id) REFERENCES sources (row_id)
);

CREATE TABLE subspecies (
  row_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  species_row_id INTEGER NOT NULL,
  source_row_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  FOREIGN KEY (species_row_id) REFERENCES species (row_id),
  FOREIGN KEY (source_row_id) REFERENCES sources (row_id)
);

CREATE TABLE species_features (
  row_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  species_row_id INTEGER,
  subspecies_row_id INTEGER,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  is_printed BOOLEAN NOT NULL,
  FOREIGN KEY (species_row_id) REFERENCES species (row_id),
  FOREIGN KEY (subspecies_row_id) REFERENCES subspecies (row_id)
);


INSERT INTO `sources` (`row_id`, `name`, `is_homebrew`) VALUES
(1, 'Players Handbook', 0),
(2, 'Tasha\'s Cauldron of Everything', 0),
(3, 'Xanathar\'s Guide to Everything', 0);


INSERT INTO `species` (`row_id`, `name`, `description`, `size`, `source_row_id`) VALUES
(1, 'Human', 'In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that\'s why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.', 'Medium', 1),
(2, 'Elf', 'Elves are a magical people of otherworldly grace, living in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry.', 'Medium', 1),
(3, 'Dwarf', 'Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs – these common threads unite all dwarves.', 'Medium', 1),
(4, 'Dragonborn', 'Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.', 'Medium', 1),
(5, 'Gnome', 'A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.', 'Small', 1),
(6, 'Half-Elf', 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.', 'Medium', 1),
(7, 'Half-Orc', 'When alliances between humans and orcs are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.', 'Medium', 1),
(8, 'Halfling', 'The comforts of home are the goals of most halflings\' lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies. Others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. Halflings work readily with others, and they are loyal to their friends, whether halfling or otherwise. They can display remarkable ferocity when their friends, families, or communities are threatened.', 'Small', 1),
(9, 'Tiefling', 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children\'s children will always be held accountable.', 'Medium', 1),
(10, 'Custom', 'Instead of choosing one of the game\'s races for your character at 1st level, you can use the following traits to represent your character\'s lineage, giving you full control over how your character\'s origin shaped them.', 'Medium', 2);


INSERT INTO `subspecies` (`row_id`, `species_row_id`, `name`, `description`, `source_row_id`) VALUES
(1, 3, 'Hill Dwarf', 'As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience. The gold dwarves of Faerun in their mighty southern kingdom are hill dwarves, as are the exiled Neidar and the debased Klar of Krynn in the Dragonlance setting.', 1),
(2, 3, 'Mountain Dwarf', 'As a mountain dwarf, you\'re strong and hardy, accustomed to a difficult life in rugged terrain. You\'re probably on the tall side (for a dwarf), and tend toward lighter coloration, The shield dwarves of northern Faerun, as well as the ruling Hylar clan and the noble Daewar clan of Dragonlance, are mountain dwarves.', 1),
(3, 2, 'Dark Elf', 'Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world for following the goddess Lolth down the path to evil and corruption. Now they have built their own civilization in the depths of the Underdark, patterned after the Way of Lolth. Also called dark elves. The drow have black skin that resembles polished obsidian and stark white or pale yellow hair. They commonly have very pale eyes (so pale as to be mistaken for white) in shades of lilac, silver, pink, red, and blue. They tend to be smaller and thinner than most elves.\r\n\r\nDrow adventurers are rare, and the race does not exist in all worlds. Check with your Dungeon Master to see if you can play a drow character.', 1),
(4, 2, 'High Elf', 'As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk. the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common and more friendly, and often encountered among humans and other races.', 1),
(5, 2, 'Wood Elf', 'As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests. This category includes the wild elves (grugach) of Greyhawk and the Kagonesti of Dragonlance, as well as the races called wood elves in Greyhawk and the Forgotten Realms. In Faerun, wood elves (also called wild elves. green elves, or forest elves) are reclusive and distrusting of non-elves.\r\n\r\nWood elf skin tends to be copperish in hue, sometimes with traces of green. Their hair tends toward browns and blacks, but it is occasionally blond or copper-colored. Their eyes are green, brown, or hazel.', 1),
(6, 5, 'Forest Gnome', 'As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. In the worlds of D&D, forest gnomes are rare and secretive. They gather in hidden communities in sylvan forests, using illusions and trickery to conceal themselves from threats or to mask their escape should they be detected. Forest gnomes tend to be friendly with other good-spirited woodland folk, and they regard elves and good fey as their most important allies. These gnomes also befriend small forest animals and rely on them for information about threats that might prowl their lands.', 1),
(7, 5, 'Rock Gnome', 'As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. Most gnomes in the worlds of D&D are rock gnomes, including the tinker gnomes of the Dragonlance setting.', 1),
(8, 8, 'Lightfoot Halfling', 'As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You\'re inclined to be affable and get along well with others. In the Forgotten Realms, lightfoot halflings have spread the farthest and thus are the most common variety.\r\n\r\nLightfoots are more prone to wanderlust than other halflings, and often dwell alongside other races or take up a nomadic life. In the world of Grayhawk, these halflings are called hairfeet or tallfellows.', 1),
(9, 8, 'Stout Halfling', 'As a stout halfling, you\'re hardier than average and have some resistance to poison. Some say that stouts have dwarven blood. In the Forgotten Realms, these halflings are called stronghearts, and they\'re most common in the south.', 1);



INSERT INTO `species_features` (`row_id`, `species_row_id`, `subspecies_row_id`, `name`, `description`, `is_printed`) VALUES
(1, 3, NULL, 'Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(2, 3, NULL, 'Ability Score Increase', 'Your Constitution score increases by 2.', 0),
(3, 3, NULL, 'Speed', 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.', 0);
