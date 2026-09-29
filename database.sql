-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2026 at 07:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `row_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(500) NOT NULL,
  `subclass_level` int(11) NOT NULL DEFAULT 3,
  `source_row_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`row_id`, `name`, `description`, `subclass_level`, `source_row_id`) VALUES
(1, 'Barbarian', 'For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.', 3, 1),
(2, 'Bard', 'Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds. The bard is a master of song, speech, and the magic they contain.', 3, 1),
(3, 'Cleric', 'Clerics are intermediaries between the mortal world and the distant planes of the gods. As varied as the gods they serve, clerics strive to embody the handiwork of their deities. No ordinary priest, a cleric is imbued with divine magic.', 1, 1),
(4, 'Druid', 'Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature\'s resilience, cunning, and fury. They claim no mastery over nature, but see themselves as extensions of nature\'s indomitable will.', 2, 1),
(5, 'Fighter', 'Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.', 3, 1),
(6, 'Monk', 'Monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.', 3, 1),
(7, 'Paladin', 'Whether sworn before a god\'s altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin\'s oath is a powerful bond.', 3, 1),
(8, 'Ranger', 'Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.', 3, 1),
(9, 'Rogue', 'Rogues rely on skill, stealth, and their foes\' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.', 3, 1),
(10, 'Sorcerer', 'Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. No one chooses sorcery; the power chooses the sorcerer.', 1, 1),
(11, 'Warlock', 'Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. Through pacts made with mysterious beings of supernatural power, warlocks unlock magical effects both subtle and spectacular.', 1, 1),
(12, 'Wizard', 'Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_features`
--

CREATE TABLE `class_features` (
  `row_id` int(11) NOT NULL,
  `class_row_id` int(11) DEFAULT NULL,
  `subclass_row_id` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `name` varchar(50) NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_features`
--

INSERT INTO `class_features` (`row_id`, `class_row_id`, `subclass_row_id`, `level`, `name`, `description`) VALUES
(1, 1, NULL, 1, 'Rage', 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\r\n\r\nWhile raging, you gain the following benefits if you aren\'t wearing heavy armor:\r\n\r\nYou have advantage on Strength checks and Strength saving throws.\r\nWhen you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\r\nYou have resistance to bludgeoning, piercing, and slashing damage.\r\nIf you are able to cast spells, you can\'t cast them or concentrate on them while raging.\r\n\r\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven\'t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\r\n\r\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.'),
(2, 1, NULL, 1, 'Unarmored Defense', 'While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.'),
(3, 1, NULL, 2, 'Danger Sense', 'At 2nd level, you gain an uncanny sense of when things nearby aren\'t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can\'t be blinded, deafened, or incapacitated.'),
(4, 1, NULL, 2, 'Reckless Attack', 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.'),
(5, 1, NULL, 5, 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.'),
(6, 1, NULL, 5, 'Fast Movement', 'Starting at 5th level, your speed increases by 10 feet while you aren\'t wearing heavy armor.'),
(7, 1, NULL, 7, 'Feral Instinct', 'By 7th level, your instincts are so honed that you have advantage on initiative rolls.\r\n\r\nAdditionally, if you are surprised at the beginning of combat and aren\'t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.'),
(8, 1, NULL, 9, 'Brutal Critical', 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.\r\n\r\nThis increases to two additional dice at 13th level and three additional dice at 17th level.'),
(9, 1, NULL, 11, 'Relentless Rage', 'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you\'re raging and don\'t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.\r\n\r\nEach time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.'),
(10, 1, NULL, 15, 'Persistent Rage', 'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.'),
(11, 1, NULL, 18, 'Indomitable Might', 'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.'),
(12, 1, NULL, 20, 'Primal Champion', 'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.'),
(13, 1, 1, 3, 'Frenzy', 'Starting when you choose this path at 3rd level, you can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.'),
(14, 1, 1, 6, 'Mindless Rage', 'Beginning at 6th level, you can\'t be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.'),
(15, 1, 1, 10, 'Intimidating Presence', 'Beginning at 10th level, you can use your action to frighten someone with your menacing presence. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC equal to 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the end of your next turn. On subsequent turns, you can use your action to extend the duration of this effect on the frightened creature until the end of your next turn. This effect ends if the creature ends its turn out of line of sight or more than 60 feet away from you.\r\n\r\nIf the creature succeeds on its saving throw, you can\'t use this feature on that creature again for 24 hours.'),
(16, 1, 1, 14, 'Retaliation', 'Starting at 14th level, when you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.'),
(17, 1, 2, 3, 'Spirit Seeker', 'Yours is a path that seeks attunement with the natural world, giving you a kinship with beasts. At 3rd level when you adopt this path, you gain the ability to cast the Beast Sense and Speak with Animals spells, but only as rituals.'),
(18, 1, 2, 3, 'Totem Spirit', 'At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object – an amulet or similar adornment – that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick-skinned, or if your totem is the eagle, your eyes turn bright yellow.\r\n\r\nYour totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.\r\n\r\nBear. While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.\r\n\r\nEagle. While you\'re raging and aren\'t wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can use the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.\r\n\r\nWolf. While you\'re raging, your friends have advantage on melee attack rolls against any creature within 5 feet of you that is hostile to you. The spirit of the wolf makes you a leader of hunters.'),
(19, 1, 2, 6, 'Aspect of the Beast', 'At 6th level, you gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.\r\n\r\nBear. You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.\r\n\r\nEagle. You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn\'t impose disadvantage on your Wisdom (Perception) checks.\r\n\r\nWolf. You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace.'),
(20, 1, 2, 10, 'Spirit Walker', 'At 10th level, you can cast the Commune with Nature spell, but only as a ritual. When you do so, a spiritual version of one of the animals you chose for Totem Spirit or Aspect of the Beast appears to you to convey the information you seek.'),
(21, 1, 2, 14, 'Totemic Attunement', 'At 14th level, you gain a magical benefit based on a totem animal of your choice. You can choose the same animal you selected previously or a different one.\r\n\r\nBear. While you\'re raging, any creature within 5 feet of you that\'s hostile to you has disadvantage on attack rolls against targets other than you or another character with this feature. An enemy is immune to this effect if it can\'t see or hear you or if it can\'t be frightened.\r\n\r\nEagle. While raging, you have a flying speed equal to your current walking speed. This benefit works only in short bursts; you fall if you end your turn in the air and nothing else is holding you aloft.\r\n\r\nWolf. While you\'re raging, you can use a bonus action on your turn to knock a Large or smaller creature prone when you hit it with melee weapon attack.'),
(22, 2, NULL, 1, 'Spellcasting', 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.\r\n\r\nCantrips\r\nYou know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Bard table.\r\n\r\nSpell Slots\r\nThe Bard table shows how many spell slots you have to cast your bard spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell\'s level or higher. You regain all expended spell slots when you finish a long rest. For example, if you know the 1st-level spell Cure Wounds and have a 1st-level and a 2nd-level spell slot available, you can cast Cure Wounds using either slot.\r\n\r\nSpells Known of 1st Level and Higher\r\nYou know four 1st-level spells of your choice from the bard spell list.\r\n\r\nThe Spells Known column of the Bard table shows when you learn more bard spells of your choice. Each of these spells must be of a level for which you have spell slots, as shown on the table. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.\r\n\r\nAdditionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots.\r\n\r\nSpellcasting Ability\r\nCharisma is your spellcasting ability for your bard spells. Your magic comes from the heart and soul you pour into the performance of your music or oration. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast and when making an attack roll with one.\r\n\r\nSpell save DC = 8 + your proficiency bonus + your Charisma modifier\r\n\r\nSpell attack modifier = your proficiency bonus + your Charisma modifier\r\n\r\nRitual Casting\r\nYou can cast any bard spell you know as a ritual if that spell has the ritual tag.\r\n\r\nSpellcasting Focus\r\nYou can use a musical instrument (found in chapter 5) as a spellcasting focus for your bard spells.'),
(23, 2, NULL, 1, 'Bardic Inspiration', 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.\r\n\r\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.\r\n\r\nYou can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.\r\n\r\nYour Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.'),
(24, 2, NULL, 2, 'Jack of All Trades', 'Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.'),
(25, 2, NULL, 2, 'Song of Rest', 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points.\r\n\r\nThe extra Hit Points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level.'),
(26, 2, NULL, 3, 'Expertise', 'At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.\r\n\r\nAt 10th level, you can choose another two skill proficiencies to gain this benefit.'),
(27, 2, NULL, 5, 'Font of Inspiration', 'Beginning when you reach 5th level, you regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.'),
(28, 2, NULL, 6, 'Countercharm', 'At 6th level, you gain the ability to use musical notes or words of power to disrupt mind-influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creatures within 30 feet of you have advantage on saving throws against being frightened or charmed. A creature must be able to hear you to gain this benefit. The performance ends early if you are incapacitated or silenced or if you voluntarily end it (no action required).'),
(29, 2, NULL, 10, 'Magical Secrets', 'By 10th level, you have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any classes, including this one. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip.\r\n\r\nThe chosen spells count as bard spells for you and are included in the number in the Spells Known column of the Bard table.\r\n\r\nYou learn two additional spells from any classes at 14th level and again at 18th level.'),
(30, 2, NULL, 20, 'Superior Inspiration', 'At 20th level, when you roll initiative and have no uses of Bardic Inspiration left, you regain one use.'),
(31, 2, 3, 3, 'Bonus Proficiencies', 'When you join the College of Lore at 3rd level, you gain proficiency with three skills of your choice.'),
(32, 2, 3, 3, 'Cutting Words', 'Also at 3rd level, you learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to expend one of your uses of Bardic Inspiration, rolling a Bardic Inspiration die and subtracting the number rolled from the creature\'s roll. You can choose to use this feature after the creature makes its roll, but before the DM determines whether the attack roll or ability check succeeds or fails, or before the creature deals its damage. The creature is immune if it can\'t hear you or if it\'s immune to being charmed.'),
(33, 2, 3, 6, 'Additional Magical Secrets', 'At 6th level, you learn two spells of your choice from any class. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip. The chosen spells count as bard spells for you but don\'t count against the number of bard spells you know.'),
(34, 2, 3, 14, 'Peerless Skill', 'Starting at 14th level, when you make an ability check, you can expend one use of Bardic Inspiration. Roll a Bardic Inspiration die and add the number rolled to your ability check. You can choose to do so after you roll the die for the ability check, but before the DM tells you whether you succeed or fail.'),
(35, 2, 4, 3, 'Bonus Proficiencies', 'When you join the College of Valor at 3rd level, you gain proficiency with medium armor, shields, and martial weapons.'),
(36, 2, 4, 3, 'Combat Inspiration', 'Also at 3rd level, you learn to inspire others in battle. A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made. Alternatively, when an attack roll is made against the creature, it can use its reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, after seeing the roll but before knowing whether it hits or misses.'),
(37, 2, 4, 6, 'Extra Attack', 'Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.'),
(38, 2, 4, 14, 'Battle Magic', 'At 14th level, you have mastered the art of weaving spellcasting and weapon use into a single harmonious act. When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.'),
(39, 3, NULL, 1, 'Spellcasting', 'As a conduit for divine power, you can cast cleric spells.\r\n\r\nCantrips\r\nAt 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table.\r\n\r\nSpell Slots\r\nThe Cleric table shows how many spell slots you have to cast your cleric spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell\'s level or higher. You regain all expended spell slots when you finish a long rest.\r\n\r\nYou prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.\r\n\r\nFor example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn\'t remove it from your list of prepared spells.\r\n\r\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.\r\n\r\nSpellcasting Ability\r\nWisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.\r\n\r\nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\r\n\r\nSpell attack modifier = your proficiency bonus + your Wisdom modifier\r\n\r\nRitual Casting\r\nYou can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.\r\n\r\nSpellcasting Focus\r\nYou can use a holy symbol as a spellcasting focus for your cleric spells.'),
(40, 3, NULL, 2, 'Channel Divinity', 'At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels, as noted in the domain description.\r\n\r\nWhen you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.\r\n\r\nSome Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC.\r\n\r\nBeginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests. When you finish a short or long rest, you regain your expended uses.\r\n\r\nChannel Divinity: Turn Undead\r\nAs an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\r\n\r\nA turned creature must spend its turns trying to move as far away from you as it can, and it can\'t willingly move to a space within 30 feet of you. It also can\'t take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there\'s nowhere to move, the creature can use the Dodge action.'),
(41, 3, NULL, 5, 'Destroy Undead', 'Starting at 5th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold, as shown in the Cleric table above.'),
(42, 3, NULL, 10, 'Divine Intervention', 'Beginning at 10th level, you can call on your deity to intervene on your behalf when your need is great.\r\n\r\nImploring your deity\'s aid requires you to use your action. Describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes. The DM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate. If your deity intervenes, you can\'t use this feature again for 7 days. Otherwise, you can use it again after you finish a long rest.\r\n\r\nAt 20th level, your call for intervention succeeds automatically, no roll required.'),
(43, 3, 5, 1, 'Knowledge Domain Spells', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells | \r\n| 1st	| Command, Identify | \r\n| 3rd	| Augury, Suggestion |\r\n| 5th	| Nondetection, Speak with Dead |\r\n| 7th	| Arcane Eye, Confusion |\r\n| 9th	| Legend Lore, Scrying |\r\n'),
(44, 3, 5, 1, 'Blessings of Knowledge', 'At 1st level, you learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion.\r\n\r\nYour proficiency bonus is doubled for any ability check you make that uses either of those skills.'),
(45, 3, 5, 2, 'Channel Divinity: Knowledge of the Ages', 'Starting at 2nd level, you can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool.'),
(46, 3, 5, 6, 'Channel Divinity: Read Thoughts', 'At 6th level, you can use your Channel Divinity to read a creature\'s thoughts. You can then use your access to the creature\'s mind to command it.\r\n\r\nAs an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw. If the creature succeeds on the saving throw, you can\'t use this feature on it again until you finish a long rest.\r\n\r\nIf the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute.\r\n\r\nDuring that time, you can use your action to end this effect and cast the Suggestion spell on the creature without expending a spell slot. The target automatically fails its saving throw against the spell.'),
(47, 3, 5, 8, 'Potent Spellcasting', 'Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.'),
(48, 3, 5, 17, 'Visions of the Past', 'Starting at 17th level, you can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a spell.\r\n\r\nOnce you use this feature, you can\'t use it again until you finish a short or long rest.\r\n\r\nObject Reading. Holding an object as you meditate, you can see visions of the object\'s previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as well as the most recent significant event involving the object and that owner. If the object was owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature.\r\n\r\nArea Reading. As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation.'),
(49, 3, 6, 1, ' Life Domain Spells', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Bless, Cure Wounds |\r\n| 3rd	| Lesser Restoration, Spiritual Weapon |\r\n| 5th	| Beacon of Hope, Revivify |\r\n| 7th	| Death Ward, Guardian of Faith |\r\n| 9th	| Mass Cure Wounds, Raise Dead |'),
(50, 3, 6, 1, 'Bonus Proficiency', 'When you choose this domain at 1st level, you gain proficiency with heavy armor.'),
(51, 3, 6, 1, 'Disciple of Life', 'Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell\'s level.'),
(52, 3, 6, 2, 'Channel Divinity: Preserve Life', 'Starting at 2nd level, you can use your Channel Divinity to heal the badly injured.\r\n\r\nAs an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can\'t use this feature on an undead or a construct.'),
(53, 3, 6, 6, 'Blessed Healer', 'Beginning at 6th level, the healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell\'s level.'),
(54, 3, 6, 8, 'Divine Strike', 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8.'),
(55, 3, 6, 17, 'Supreme Healing', 'Starting at 17th level, when you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die. For example, instead of restoring 2d6 hit points to a creature, you restore 12.'),
(56, 3, 7, 1, 'Light Domain Spells', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Burning Hands, Faerie Fire |\r\n| 3rd	| Flaming Sphere, Scorching Ray |\r\n| 5th	| Daylight, Fireball |\r\n| 7th	| Guardian of Faith, Wall of Fire |\r\n| 9th	| Flame Strike, Scrying |'),
(57, 3, 7, 1, 'Bonus Cantrip', 'When you choose this domain at 1st level, you gain the Light cantrip if you don\'t already know it. This cantrip doesn’t count against the number of cleric cantrips you know.'),
(58, 3, 7, 1, 'Warding Flare', 'Also at 1st level, you can interpose divine light between yourself and an attacking enemy. When you are attacked by a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll, causing light to flare before the attacker before it hits or misses. An attacker that can\'t be blinded is immune to this feature.\r\n\r\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.'),
(59, 3, 7, 2, 'Channel Divinity: Radiance of the Dawn', 'Starting at 2nd level, you can use your Channel Divinity to harness sunlight, banishing darkness and dealing radiant damage to your foes.\r\n\r\nAs an action, you present your holy symbol, and any magical darkness within 30 feet of you is dispelled. Additionally, each hostile creature within 30 feet of you must make a Constitution saving throw. A creature takes radiant damage equal to 2d10 + your cleric level on a failed saving throw, and half as much damage on a successful one. A creature that has total cover from you is not affected.'),
(60, 3, 7, 6, 'Improved Flare', 'Starting at 6th level, you can also use your Warding Flare feature when a creature that you can see within 30 feet of you attacks a creature other than you.'),
(61, 3, 7, 8, 'Potent Spellcasting', 'Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.'),
(62, 3, 7, 17, 'Corona of Light', 'Starting at 17th level, you can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action. You emit bright light in a 60-foot radius and dim light 30 feet beyond that. Your enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant damage.'),
(63, 3, 8, 1, 'Nature Domain Spells', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Animal Friendship, Speak with Animals |\r\n| 3rd	| Barkskin, Spike Growth |\r\n| 5th	| Plant Growth, Wind Wall |\r\n| 7th	| Dominate Beast, Grasping Vine |\r\n| 9th	| Insect Plague, Tree Stride |\r\n'),
(64, 3, 8, 1, 'Acolyte of Nature', 'At 1st level, you learn one cantrip of your choice from the druid spell list. This cantrip counts as a cleric cantrip for you, but it doesn’t count against the number of cleric cantrips you know. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival.'),
(65, 3, 8, 1, 'Bonus Proficiency', 'Also at 1st level, you gain proficiency with heavy armor.'),
(66, 3, 8, 2, 'Channel Divinity: Charm Animals and Plants', 'Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.\r\n\r\nAs an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate.'),
(67, 3, 8, 6, 'Dampen Elements', 'Starting at 6th level, when you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.'),
(68, 3, 8, 8, 'Divine Strike', 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 cold, fire, or lightning damage (your choice) to the target. When you reach 14th level, the extra damage increases to 2d8.'),
(69, 3, 8, 17, 'Master of Nature', 'At 17th level, you gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn.'),
(70, 3, 9, 1, 'Tempest Domain Spells ', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Fog Cloud, Thunderwave |\r\n| 3rd	| Gust of Wind, Shatter |\r\n| 5th	| Call Lightning, Sleet Storm |\r\n| 7th	| Control Water, Ice Storm |\r\n| 9th	| Destructive Wave, Insect Plague |'),
(71, 3, 9, 1, 'Bonus Proficiencies', 'At 1st level, you gain proficiency with martial weapons and heavy armor.'),
(72, 3, 9, 1, 'Wrath of the Storm', 'Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.\r\n\r\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.'),
(73, 3, 9, 2, 'Channel Divinity: Destructive Wrath', 'Starting at 2nd level, you can use your Channel Divinity to wield the power of the storm with unchecked ferocity.\r\n\r\nWhen you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.'),
(74, 3, 9, 6, 'Thunderous Strike', 'At 6th level, when you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.'),
(75, 3, 9, 8, 'Divine Strike', 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. When you reach 14th level, the extra damage increases to 2d8.'),
(76, 3, 9, 17, 'Stormborn', 'At 17th level, you have a flying speed equal to your current walking speed whenever you are not underground or indoors.'),
(77, 3, 10, 1, 'Trickery Domain Spells', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Charm Person, Disguise Self |\r\n| 3rd	| Mirror Image, Pass without Trace |\r\n| 5th	| Blink, Dispel Magic |\r\n| 7th	| Dimension Door, Polymorph |\r\n| 9th	| Dominate Person, Modify Memory |'),
(78, 3, 10, 1, 'Blessing of the Trickster', 'Starting when you choose this domain at 1st level, you can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.'),
(79, 3, 10, 2, 'Channel Divinity: Invoke Duplicity', 'Starting at 2nd level, you can use your Channel Divinity to create an illusory duplicate of yourself.\r\n\r\nAs an action, you create a perfect illusion of yourself that lasts for 1 minute, or until you lose your concentration (as if you were concentrating on a spell). The illusion appears in an unoccupied space that you can see within 30 feet of you. As a bonus action on your turn, you can move the illusion up to 30 feet to a space you can see, but it must remain within 120 feet of you.\r\n\r\nFor the duration, you can cast spells as though you were in the illusion\'s space, but you must use your own senses. Additionally, when both you and your illusion are within 5 feet of a creature that can see the illusion, you have advantage on attack rolls against that creature, given how distracting the illusion is to the target.'),
(80, 3, 10, 6, 'Channel Divinity: Cloak of Shadows', 'Starting at 6th level, you can use your Channel Divinity to vanish.\r\n\r\nAs an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell.'),
(81, 3, 10, 8, 'Divine Strike', 'At 8th level, you gain the ability to infuse your weapon strikes with poison – a gift from your deity. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 poison damage to the target. When you reach 14th level, the extra damage increases to 2d8.'),
(82, 3, 10, 17, 'Improved Duplicity', 'At 17th level, you can create up to four duplicates of yourself, instead of one, when you use Invoke Duplicity. As a bonus action on your turn, you can move any number of them up to 30 feet, to a maximum range of 120 feet.'),
(83, 3, 11, 1, 'War Domain Spells ', 'Each domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.\r\n\r\nIf you have a domain spell that doesn\'t appear on the cleric spell list, the spell is nonetheless a cleric spell for you.\r\n\r\n| Cleric Level	| Spells |\r\n| 1st	| Divine Favor, Shield of Faith |\r\n| 3rd	| Magic Weapon, Spiritual Weapon |\r\n| 5th	| Crusader\'s Mantle, Spirit Guardians |\r\n| 7th	| Freedom of Movement, Stoneskin |\r\n| 9th	| Flame Strike, Hold Monster |'),
(84, 3, 11, 1, 'Bonus Proficiency', 'At 1st level, you gain proficiency with martial weapons and heavy armor.'),
(85, 3, 11, 1, 'War Priest', 'From 1st level, your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action.\r\n\r\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.'),
(86, 3, 11, 2, 'Channel Divinity: Guided Strike', 'Starting at 2nd level, you can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.'),
(87, 3, 11, 6, 'Channel Divinity: War God\'s Blessing', 'At 6th level, when a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.'),
(88, 3, 11, 8, 'Divine Strike', 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 damage of the same type dealt by the weapon to the target. When you reach 14th level, the extra damage increases to 2d8.'),
(89, 3, 11, 17, 'Avatar of Battle', 'At 17th level, you gain resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.');

-- --------------------------------------------------------

--
-- Table structure for table `sources`
--

CREATE TABLE `sources` (
  `row_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_homebrew` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sources`
--

INSERT INTO `sources` (`row_id`, `name`, `is_homebrew`) VALUES
(1, 'Players Handbook', 0),
(2, 'Tasha\'s Cauldron of Everything', 0),
(3, 'Xanathar\'s Guide to Everything', 0);

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `row_id` int(11) NOT NULL,
  `source_row_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `size` set('Small','Medium') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`row_id`, `source_row_id`, `name`, `description`, `size`) VALUES
(1, 1, 'Human', 'In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that\'s why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.', 'Medium'),
(2, 1, 'Elf', 'Elves are a magical people of otherworldly grace, living in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry.', 'Medium'),
(3, 1, 'Dwarf', 'Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs – these common threads unite all dwarves.', 'Medium'),
(4, 1, 'Dragonborn', 'Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.', 'Medium'),
(5, 1, 'Gnome', 'A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.', 'Small'),
(6, 1, 'Half-Elf', 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.', 'Medium'),
(7, 1, 'Half-Orc', 'When alliances between humans and orcs are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.', 'Medium'),
(8, 1, 'Halfling', 'The comforts of home are the goals of most halflings\' lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies. Others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. Halflings work readily with others, and they are loyal to their friends, whether halfling or otherwise. They can display remarkable ferocity when their friends, families, or communities are threatened.', 'Small'),
(9, 1, 'Tiefling', 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children\'s children will always be held accountable.', 'Medium'),
(10, 2, 'Custom', 'Instead of choosing one of the game\'s races for your character at 1st level, you can use the following traits to represent your character\'s lineage, giving you full control over how your character\'s origin shaped them.', 'Medium');

-- --------------------------------------------------------

--
-- Table structure for table `species_features`
--

CREATE TABLE `species_features` (
  `row_id` int(11) NOT NULL,
  `species_row_id` int(11) DEFAULT NULL,
  `subspecies_row_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `is_printed` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species_features`
--

INSERT INTO `species_features` (`row_id`, `species_row_id`, `subspecies_row_id`, `name`, `description`, `is_printed`) VALUES
(1, 3, NULL, 'Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(2, 3, NULL, 'Ability Score Increase', 'Your Constitution score increases by 2.', 0),
(3, 3, NULL, 'Speed', 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.', 0),
(4, 3, NULL, 'Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.', 1),
(5, 3, NULL, 'Dwarven Combat Training', 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.', 0),
(6, 3, NULL, 'Tool Proficiency', 'You gain proficiency with the artisan\'s tools of your choice: smith\'s tools, brewer\'s supplies, or mason\'s tools.', 0),
(7, 3, NULL, 'Stonecunning', 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.', 1),
(8, 3, 1, 'Ability Score Increase', 'Your Wisdom score increases by 1.', 0),
(9, 3, 1, 'Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.', 1),
(10, 3, 2, 'Ability Score Increase', 'Your Strength score increases by 2.', 0),
(11, 3, 2, 'Dwarven Armor Training', 'You have proficiency with light and medium armor.', 0),
(12, 2, NULL, 'Ability Score Increase', ' Your Dexterity score increases by 2.', 0),
(13, 2, NULL, 'Speed', 'Your base walking speed is 30 feet.', 0),
(14, 2, NULL, 'Darkvision', 'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(15, 2, NULL, 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.', 1),
(16, 2, NULL, 'Trance', 'Elves do not sleep. Instead they meditate deeply, remaining semi-conscious, for 4 hours a day. The Common word for this meditation is \"trance.\" While meditating, you dream after a fashion; such dreams are actually mental exercises that have become reflexive after years of practice. After resting in this way, you gain the same benefit a human would from 8 hours of sleep.', 1),
(17, 2, NULL, 'Keen Senses', 'You have proficiency in the Perception skill.', 1),
(18, 2, 3, 'Ability Score Increase', 'Your Charisma score increases by 1.', 0),
(19, 2, 3, 'Superior Darkvision', 'Your darkvision has a range of 120 feet, instead of 60.', 1),
(20, 2, 3, 'Sunlight Sensitivity', 'You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you, the target of the attack, or whatever you are trying to perceive is in direct sunlight.', 1),
(21, 2, 3, 'Drow Magic', 'You know the Dancing Lights cantrip. When you reach 3rd level, you can cast the Faerie Fire spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Darkness spell once and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.', 1),
(22, 2, 3, 'Drow Weapon Training', 'You have proficiency with rapiers, shortswords, and hand crossbows.', 1),
(23, 2, 4, 'Ability Score Increase', 'Your Intelligence score increases by 1.', 0),
(24, 2, 4, 'Cantrip', 'You know one cantrip of your choice from the Wizard spell list. Intelligence is your spellcasting ability for it.', 1),
(25, 2, 4, 'Elf Weapon Training.', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.', 1),
(26, 2, 4, 'Extra Language', 'You can read, speak, and write one additional language of your choice.', 1),
(27, 2, 5, 'Ability Score Increase', 'Your Wisdom score increases by 1.', 0),
(28, 2, 5, 'Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.', 1),
(29, 2, 5, 'Fleet of Foot', 'Your base walking speed increases to 35 feet.', 1),
(30, 2, 5, 'Mask of the Wild', 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.', 1),
(31, 5, NULL, 'Ability Score Increase', 'Your Intelligence score increases by 2.', 0),
(32, 5, NULL, 'Speed', 'Your base walking speed is 25 feet.', 0),
(33, 5, NULL, 'Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(34, 5, NULL, 'Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saves against magic.', 1),
(35, 5, 6, 'Ability Score Increase', 'Your Dexterity score increases by 1.', 0),
(36, 5, 6, 'Natural Illusionist', 'You know the Minor Illusion cantrip. Intelligence is your spellcasting modifier for it.', 1),
(37, 5, 6, 'Speak with Small Beasts', 'Through sound and gestures, you may communicate simple ideas with Small or smaller beasts.', 1),
(38, 5, 7, 'Ability Score Increase', 'Your Constitution score increases by 1.', 0),
(39, 5, 6, 'Artificer\'s Lore', 'Whenever you make an Intelligence (History) check related to magical, alchemical, or technological items, you can add twice your proficiency bonus instead of any other proficiency bonus that may apply.', 1),
(40, 5, 7, 'Tinker', 'You have proficiency with artisan tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options:\r\nClockwork Toy. This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.\r\nFire Starter. The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.\r\nMusic Box. When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song\'s end or when it is closed.\r\nAt your DM\'s discretion, you may make other objects with effects similar in power to these. The Prestidigitation cantrip is a good baseline for such effects.', 1),
(41, 8, NULL, 'Ability Score Increase', 'Your Dexterity score increases by 2.', 0),
(42, 8, NULL, 'Speed', 'Your base walking speed is 25 feet.', 0),
(43, 8, NULL, 'Lucky', 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die. You must use the new result, even if it is a 1.', 1),
(44, 8, NULL, 'Brave', 'You have advantage on saving throws against being frightened.', 1),
(45, 8, NULL, 'Nimble', 'You can move through the space of any creature that is of a size larger than yours.', 1),
(46, 8, 8, 'Naturally Stealthy', 'You can attempt to hide even when you are only obscured by a creature that is at least one size larger than you.', 1),
(47, 8, 8, 'Ability Score Increase', 'Your Charisma score increases by 1.', 0),
(48, 8, 9, 'Ability Score Increase', 'Your Constitution score increases by 1.', 0),
(49, 8, 9, 'Stout Resilience', 'You have advantage on saving throws against poison, and you have resistance to poison damage.', 1),
(50, 1, NULL, 'Ability Score Increase', 'Your ability scores each increase by 1.', 0),
(51, 1, NULL, 'Speed', 'Your base walking speed is 30 feet.', 1),
(52, 6, NULL, 'Ability Score Increase', 'Your Charisma score increases by 2, and two other ability scores of your choice each increase by 1.', 0),
(53, 6, NULL, 'Speed', 'Your base walking speed is 30 feet.', 0),
(54, 6, NULL, 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.', 1),
(55, 6, NULL, 'Darkvision', 'Thanks to your elven heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(56, 6, NULL, 'Half-Elf Versatility', 'Choose one of the following traits:\r\nSkill Versatility (General). You gain proficiency in two skills of your choice.\r\nElf Weapon Training (High or Wood Elf Heritage). You have proficiency with the longsword, shortsword, shortbow, and longbow.\r\nCantrip (High Elf Heritage). You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.\r\nFleet of Foot (Wood Elf Heritage). Your base walking speed increases to 35 feet.\r\nMask of the Wild (Wood Elf Heritage). You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.\r\nDrow Magic (Dark Elf Heritage). You know the Dancing Lights cantrip. When you reach 3rd level, you can cast Faerie Fire once, and it recharges after a long rest. When you reach 5th level, you can cast Darkness once, and it recharges after a long rest. Charisma is your spellcasting ability for these spells.', 1),
(57, 7, NULL, 'Ability Score Increase', 'Your Strength score increases by 2, and your Constitution score increases by 1.', 0),
(58, 7, NULL, 'Speed', 'Your base walking speed is 30 feet.', 1),
(59, 7, NULL, 'Darkvision', 'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.', 1),
(60, 7, NULL, 'Menacing', 'You gain proficiency in the Intimidation skill.', 1),
(61, 7, NULL, 'Relentless Endurance', 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.', 1),
(62, 7, NULL, 'Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.', 1),
(63, 9, NULL, 'Ability Score Increase', 'Your Charisma score increases by 2, and your Intelligence score increases by 1.', 0),
(64, 9, NULL, 'Speed', 'Your base walking speed is 30 feet.', 0),
(65, 9, NULL, 'Darkvision', 'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.', 1),
(66, 9, NULL, 'Hellish Resistance', 'You have resistance to fire damage.', 1),
(67, 9, NULL, 'Infernal Legacy', 'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell once as a 2nd-level spell. Once you reach 5th level, you can also cast the Darkness spell once. You must finish a long rest to cast these spells again with this trait. Charisma is your spellcasting ability for these spells.', 1),
(68, 4, NULL, 'Ability Score Increase', 'Your Strength score increases by 2, and your Charisma score increases by 1.', 0),
(69, 4, NULL, 'Speed', 'Your base walking speed is 30 feet.', 0),
(70, 4, 10, 'Damage Resistance', 'You have resistance to acid damage.', 1),
(71, 4, 10, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals acid damage in a 5 by 30 ft. line. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(72, 4, 11, 'Damage Resistance', 'You have resistance to lightning damage.', 1),
(73, 4, 11, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals lightning damage in a 5 by 30 ft. line. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(74, 4, 12, 'Damage Resistance', 'You have resistance to fire damage.', 1),
(75, 4, 12, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals fire damage in a 5 by 30 ft. line. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(76, 4, 13, 'Damage Resistance', 'You have resistance to lightning damage.', 1),
(77, 4, 13, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals lightning damage in a 5 by 30 ft. line. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(78, 4, 14, 'Damage Resistance', 'You have resistance to acid damage.', 1),
(79, 4, 14, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals acid damage in a 5 by 30 ft. line. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(80, 4, 15, 'Damage Resistance', 'You have resistance to fire damage.', 1),
(81, 4, 15, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals fire damage in a 15 ft. cone. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. \r\n', 1),
(82, 4, 16, 'Damage Resistance', 'You have resistance to poison damage.', 1),
(83, 4, 16, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals poison damage in a 15 ft. cone. When you use your breath weapon, all creatures in the area must make a Constitution saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(84, 4, 17, 'Damage Resistance', 'You have resistance to fire damage.', 1),
(85, 4, 17, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals fire damage in a 15 ft. cone. When you use your breath weapon, all creatures in the area must make a Dexterity saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest. ', 1),
(86, 4, 18, 'Damage Resistance', 'You have resistance to cold damage.', 1),
(87, 4, 18, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals cold damage in a 15 ft. cone. When you use your breath weapon, all creatures in the area must make a Constitution saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest.', 1),
(88, 4, 19, 'Damage Resistance', 'You have resistance to cold damage.', 1),
(89, 4, 19, 'Breath Weapon', 'You can use your action to exhale destructive energy. It deals cold damage in a 15 ft. cone. When you use your breath weapon, all creatures in the area must make a Constitution saving throw. The DC of this saving throw is 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increase to 3d6 at 6th level, 4d6 at 11th, and 5d6 at 16th level. After using your breath weapon, you cannot use it again until you complete a short or long rest.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subclasses`
--

CREATE TABLE `subclasses` (
  `row_id` int(11) NOT NULL,
  `class_row_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `source_row_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subclasses`
--

INSERT INTO `subclasses` (`row_id`, `class_row_id`, `name`, `description`, `source_row_id`) VALUES
(1, 1, 'Berserker', 'For some barbarians, rage is a means to an end – that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker\'s rage, you thrill in the chaos of battle, heedless of your own health or well-being.', 1),
(2, 1, 'Totem Warrior', 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage.\r\n\r\nMost barbarian tribes consider a totem animal to be kin to a particular clan. In such cases, it is unusual for an individual to have more than one totem animal spirit, though exceptions exist.', 1),
(3, 2, 'Lore', 'Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. Whether singing folk ballads in taverns or elaborate compositions in royal courts, these bards use their gifts to hold audiences spellbound. When the applause dies down, the audience members might find themselves questioning everything they held to be true, from their faith in the priesthood of the local temple to their loyalty to the king.', 1),
(4, 2, 'Valor', 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past, and thereby inspire a new generation of heroes. These bards gather in mead halls or around great bonfires to sing the deeds of the mighty, both past and present. They travel the land to witness great events firsthand and to ensure that the memory of those events doesn\'t pass from the world. With their songs, they inspire others to reach the same heights of accomplishment as the hero', 1),
(5, 3, 'Knowledge', 'The gods of knowledge – including Oghma, Boccob, Gilean, Aureon, and Thoth – value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse.', 1),
(6, 3, 'Life', 'The Life domain focuses on the vibrant positive energy – one of the fundamental forces of the universe – that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath.', 1),
(7, 3, 'Light', 'Gods of light – including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakhty – promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others are tireless sentinels whose eyes pierce every shadow and see through every deception. ', 1),
(8, 3, 'Nature', 'Gods of nature are as varied as the natural world itself; from inscrutable gods of the deep forests (such as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly deities associated with particular springs and groves (such as Eldath). Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue. ', 1),
(9, 3, 'Tempest', 'Gods whose portfolios include the Tempest domain – including Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor – govern storms, sea, and, sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts.', 1),
(10, 3, 'Trickery', 'Gods of trickery – such as Tymora, Beshaba, Olidammara, the Traveler, Garl Glittergold, and Loki – are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They\'re patrons of thieves, scoundrels, gamblers, rebels, and liberators. ', 1),
(11, 3, 'War', 'War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers. ', 1),
(12, 4, 'Land', 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle\'s wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle\'s mysterio', 1),
(13, 4, 'Moon', 'Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid.', 1),
(14, 5, 'Battle Master', 'Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.', 1),
(15, 5, 'Champion', 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.', 1),
(16, 5, 'Eldritch Knight', 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic: abjuration and evocation. Abjuration spells grant an Eldritch Knight additional protection in battle, and evocation spells deal damage to many foes at once, extending the fighter\'s reach in combat. These knights learn a comparatively small number', 1),
(17, 6, 'Four Elements', 'You follow a monastic tradition that teaches you to harness the elements. When you focus your ki, you can align yourself with the forces of creation and bend the four elements to your will, using them as an extension of your body. Some members of this tradition dedicate themselves to a single element, but others weave the elements together.', 1),
(18, 6, 'Open Hand', 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm.', 1),
(19, 6, 'Shadow', 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge. These monks might be called ninjas or shadowdancers, and they serve as spies and assassins. Sometimes the members of a ninja monastery are family members, forming a clan sworn to secrecy about their arts and missions. Other monasteries are more like thieves\' guilds, hiring out their services to nobles, rich merchants, or anyone else who can pay their fees. Regardless of their methods, the heads of these monasteries', 1),
(20, 7, 'Ancients', 'The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness because they love the beautiful and life-giving things of the world, not necessarily because they believe in principles of honor, courage, and justice. They adorn their armor and clothing with images of growing things-leaves, antlers, or ', 1),
(21, 7, 'Devotion', 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor, acting with honor in pursuit of justice and the greater good. They hold themselves to the highest standards of conduct, and some, for better or worse, hold the rest of the world to the same standards. Many who swear this oath are devoted to gods of law and good and use their gods\' tene', 1),
(22, 7, 'Vengence', 'The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves\' guild grows too violent and powerful, when a dragon rampages through the countryside – at times like these, paladins arise and swear an Oath of Vengeance to set right that which has gone wrong. To these paladins – sometimes called avengers or dark knights – their own purity is not a', 1),
(23, 8, 'Beast Master', 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike. Emulating the Beast Master archetype means committing yourself to this ideal, working in partnership with an animal as its companion and friend.', 1),
(24, 8, 'Hunter', 'Some rangers seek to master weapons to better protect civilization from the terrors of the wilderness. Members of the Hunter Conclave learn specialized fighting techniques for use against the most dire threats, from rampaging ogres and hordes of orcs to towering giants and terrifying dragons.', 1),
(25, 9, 'Arcane Trickster', 'Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers.', 1),
(26, 9, 'Assassin', 'You focus your training on the grim art of death. Those who adhere to this archetype are diverse: hired killers, spies, bounty hunters, and even specially anointed priests trained to exterminate the enemies of their deity. Stealth, poison, and disguise help you eliminate your foes with deadly efficiency.', 1),
(27, 9, 'Thief', 'You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype, but so do rogues who prefer to think of themselves as professional treasure seekers, explorers, delvers, and investigators. In addition to improving your agility and stealth, you learn skills useful for delving into ancient ruins, reading unfamiliar languages, and using magic items you normally couldn\'t employ.', 1),
(28, 10, 'Draconic Bloodline', 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent. Some of these bloodlines are well established in the world, but most are obscure. Any given sorcerer could be the first of a new bloodline, as a result of a pact or some other exceptional circumstance.', 1),
(29, 10, 'Wild Magic', 'Your innate magic comes from the wild forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo, the Elemental Planes, or the mysterious Far Realm. Perhaps you were blessed by a powerful fey creature or marked by a demon. Or your magic could be a fluke of your birth, with no apparent cause or reason. However it came to be, this chaotic magic churns within you, waiting for any outlet.', 1),
(30, 11, 'Archfey', 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being\'s motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges. Beings of this sort include the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; her consort Oberon, the Green Lord; Hyrsam, the Prince of Fool', 1),
(31, 11, 'Fiend', 'You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz\'Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yug', 1),
(32, 11, 'Great Old One', 'Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends. Its motives are incomprehensible to mortals, and its knowledge so immense and ancient that even the greatest libraries pale in comparison to the vast secrets it holds. The Great Old One might be unaware of your existence or entirely indifferent to you, but the secrets you have learned a', 1),
(33, 12, 'Abjuration', 'The School of Abjuration emphasizes magic that blocks, banishes, or protects. Detractors of this school say that its tradition is about denial, negation rather than positive assertion. You understand, however, that ending harmful effects, protecting the weak, and banishing evil influences is anything but a philosophical void. It is a proud and respected vocation.', 1),
(34, 12, 'Conjuration', 'As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant.', 1),
(35, 12, 'Divination', 'The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight.', 1),
(36, 12, 'Enchantment', 'As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between.', 1),
(37, 12, 'Evocation', 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants.', 1),
(38, 12, 'Illusion', 'You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk. Your magic is subtle, but the illusions crafted by your keen mind make the impossible seem real. Some illusionists – including many gnome wizards – are benign tricksters who use their spells to entertain. Others are more sinister masters of deception, using their illusions to frighten and fool others for their personal gain.', 1),
(39, 12, 'Necromancy', 'The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things. As you progress, you learn to sap the life force from a creature as your magic destroys its body, transforming that vital energy into magical power you can manipulate.', 1),
(40, 12, 'Transmutation', 'You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality\'s forge.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subspecies`
--

CREATE TABLE `subspecies` (
  `row_id` int(11) NOT NULL,
  `species_row_id` int(11) NOT NULL DEFAULT 4,
  `source_row_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subspecies`
--

INSERT INTO `subspecies` (`row_id`, `species_row_id`, `source_row_id`, `name`, `description`) VALUES
(1, 3, 1, 'Hill Dwarf', 'As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience. The gold dwarves of Faerun in their mighty southern kingdom are hill dwarves, as are the exiled Neidar and the debased Klar of Krynn in the Dragonlance setting.'),
(2, 3, 1, 'Mountain Dwarf', 'As a mountain dwarf, you\'re strong and hardy, accustomed to a difficult life in rugged terrain. You\'re probably on the tall side (for a dwarf), and tend toward lighter coloration, The shield dwarves of northern Faerun, as well as the ruling Hylar clan and the noble Daewar clan of Dragonlance, are mountain dwarves.'),
(3, 2, 1, 'Dark Elf', 'Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world for following the goddess Lolth down the path to evil and corruption. Now they have built their own civilization in the depths of the Underdark, patterned after the Way of Lolth. Also called dark elves. The drow have black skin that resembles polished obsidian and stark white or pale yellow hair. They commonly have very pale eyes (so pale as to be mistaken for white) in shades of lilac, silver, pink, red, and blue. They tend to be smaller and thinner than most elves.\r\n\r\nDrow adventurers are rare, and the race does not exist in all worlds. Check with your Dungeon Master to see if you can play a drow character.'),
(4, 2, 1, 'High Elf', 'As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk. the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common and more friendly, and often encountered among humans and other races.'),
(5, 2, 1, 'Wood Elf', 'As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests. This category includes the wild elves (grugach) of Greyhawk and the Kagonesti of Dragonlance, as well as the races called wood elves in Greyhawk and the Forgotten Realms. In Faerun, wood elves (also called wild elves. green elves, or forest elves) are reclusive and distrusting of non-elves.\r\n\r\nWood elf skin tends to be copperish in hue, sometimes with traces of green. Their hair tends toward browns and blacks, but it is occasionally blond or copper-colored. Their eyes are green, brown, or hazel.'),
(6, 5, 1, 'Forest Gnome', 'As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. In the worlds of D&D, forest gnomes are rare and secretive. They gather in hidden communities in sylvan forests, using illusions and trickery to conceal themselves from threats or to mask their escape should they be detected. Forest gnomes tend to be friendly with other good-spirited woodland folk, and they regard elves and good fey as their most important allies. These gnomes also befriend small forest animals and rely on them for information about threats that might prowl their lands.'),
(7, 5, 1, 'Rock Gnome', 'As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. Most gnomes in the worlds of D&D are rock gnomes, including the tinker gnomes of the Dragonlance setting.'),
(8, 8, 1, 'Lightfoot Halfling', 'As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You\'re inclined to be affable and get along well with others. In the Forgotten Realms, lightfoot halflings have spread the farthest and thus are the most common variety.\r\n\r\nLightfoots are more prone to wanderlust than other halflings, and often dwell alongside other races or take up a nomadic life. In the world of Grayhawk, these halflings are called hairfeet or tallfellows.'),
(9, 8, 1, 'Stout Halfling', 'As a stout halfling, you\'re hardier than average and have some resistance to poison. Some say that stouts have dwarven blood. In the Forgotten Realms, these halflings are called stronghearts, and they\'re most common in the south.'),
(10, 4, 1, 'Black Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(11, 4, 1, 'Blue Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(12, 4, 1, 'Brass Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(13, 4, 1, 'Bronze Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(14, 4, 1, 'Copper Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(15, 4, 1, 'Gold Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(16, 4, 1, 'Green Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(17, 4, 1, 'Red Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(18, 4, 1, 'Silver Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.'),
(19, 4, 1, 'White Dragonborn', 'You are distantly related to a particular kind of dragon. Choose a type of dragon from the below list; this determines the damage and area of your breath weapon, and the type of resistance you gain.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `source_row_id` (`source_row_id`);

--
-- Indexes for table `class_features`
--
ALTER TABLE `class_features`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `class_row_id` (`class_row_id`),
  ADD KEY `subclass_row_id` (`subclass_row_id`);

--
-- Indexes for table `sources`
--
ALTER TABLE `sources`
  ADD PRIMARY KEY (`row_id`);

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `source_row_id` (`source_row_id`);

--
-- Indexes for table `species_features`
--
ALTER TABLE `species_features`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `species_row_id` (`species_row_id`),
  ADD KEY `subspecies_row_id` (`subspecies_row_id`);

--
-- Indexes for table `subclasses`
--
ALTER TABLE `subclasses`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `class_row_id` (`class_row_id`),
  ADD KEY `source_row_id` (`source_row_id`);

--
-- Indexes for table `subspecies`
--
ALTER TABLE `subspecies`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `species_row_id` (`species_row_id`),
  ADD KEY `source_row_id` (`source_row_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `class_features`
--
ALTER TABLE `class_features`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `sources`
--
ALTER TABLE `sources`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `species_features`
--
ALTER TABLE `species_features`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `subclasses`
--
ALTER TABLE `subclasses`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `subspecies`
--
ALTER TABLE `subspecies`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`source_row_id`) REFERENCES `sources` (`row_id`);

--
-- Constraints for table `class_features`
--
ALTER TABLE `class_features`
  ADD CONSTRAINT `class_features_ibfk_1` FOREIGN KEY (`class_row_id`) REFERENCES `classes` (`row_id`),
  ADD CONSTRAINT `class_features_ibfk_2` FOREIGN KEY (`subclass_row_id`) REFERENCES `subclasses` (`row_id`);

--
-- Constraints for table `species`
--
ALTER TABLE `species`
  ADD CONSTRAINT `species_ibfk_1` FOREIGN KEY (`source_row_id`) REFERENCES `sources` (`row_id`);

--
-- Constraints for table `species_features`
--
ALTER TABLE `species_features`
  ADD CONSTRAINT `species_features_ibfk_1` FOREIGN KEY (`species_row_id`) REFERENCES `species` (`row_id`),
  ADD CONSTRAINT `species_features_ibfk_2` FOREIGN KEY (`subspecies_row_id`) REFERENCES `subspecies` (`row_id`);

--
-- Constraints for table `subclasses`
--
ALTER TABLE `subclasses`
  ADD CONSTRAINT `subclasses_ibfk_1` FOREIGN KEY (`class_row_id`) REFERENCES `classes` (`row_id`),
  ADD CONSTRAINT `subclasses_ibfk_2` FOREIGN KEY (`source_row_id`) REFERENCES `sources` (`row_id`);

--
-- Constraints for table `subspecies`
--
ALTER TABLE `subspecies`
  ADD CONSTRAINT `subspecies_ibfk_1` FOREIGN KEY (`species_row_id`) REFERENCES `species` (`row_id`),
  ADD CONSTRAINT `subspecies_ibfk_2` FOREIGN KEY (`source_row_id`) REFERENCES `sources` (`row_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
