// ================================
// AxianQuest – Dungeon Events (FULL DECK) – BILINGUAL (FR default + EN)
// Based on your previous full English data.js (no re-extraction)
// ================================

// NOTE: probability is now managed in app.js via d6 threshold (x/6).
// This constant can remain for UI display if you want, but app.js uses thresholds.
// Keep it here only if your UI still references it somewhere.
const DRAW_PROBABILITY = 0.30;

// Special card injected when reshuffling (adds uncertainty)
const RESHUFFLE_CARD = {
  id: "deck-reshuffled",
  icon: "🔀",
  tags: ["Rule"],
  i18n: {
    fr: {
      title: "Deck remélangé",
      text: [
        "Les murs frémissent, comme si le labyrinthe se réécrivait.",
        "Le deck a été reformé en remélangeant la défausse."
        
      ]
    },
    en: {
      title: "Deck reshuffled",
      text: [
        "The dungeon shifts and reshapes itself.",
        "The discard pile has been reshuffled into a new deck."
        
      ]
    }
  }
};

const EVENT_CARDS = [
  {
    id: "mischievous-fairy",
    icon: "🧚",
    tags: ["Creature", "Gold"],
    i18n: {
      fr: {
        title: "Fée malicieuse",
        text: [
          "Une fée malicieuse apparaît et psalmodie des mots magiques qui brouillent l’esprit des héros.",
          "Chaque héros doit lancer un dé pour chaque PM qu’il possède et tenter d’obtenir au moins un 6.",
          "En cas d’échec, la moitié des pièces d’or en sa possession disparaît."
        ]
      },
      en: {
        title: "Mischievous Fairy",
        text: [
          "A mischievous fairy appears and chants magic words that confound the heroes' minds.",
          "Each hero must roll a die for every MP they have, and try to roll at least one six.",
          "If they fail, half of the coins in their possession disappear."
        ]
      }
    }
  },
  {
    id: "gentle-fairy",
    icon: "🧚‍♀️",
    tags: ["Creature", "Heal", "Gold"],
    i18n: {
      fr: {
        title: "Fée bienveillante",
        text: [
          "Une fée bienveillante approche un héros choisi au hasard et propose de soigner magiquement tous ses PC et PM perdus en échange de 100 pièces d’or."
        ]
      },
      en: {
        title: "Gentle Fairy",
        text: [
          "A gentle fairy approaches one random hero and offers to magically heal all their lost BP and MP in exchange for 100 coins."
        ]
      }
    }
  },

  {
    id: "abandoned-meal",
    icon: "🍽️",
    tags: ["Roll", "Heal"],
    i18n: {
      fr: {
        title: "Repas abandonné",
        text: [
          "Un héros repère un rôti abandonné sur une assiette en métal, dans un coin.",
          "Il peut décider de le manger ou de le passer à un autre héros, etc.",
          "S’il est mangé, lancez 1d6 pour déterminer l’effet :"
        ]
      },
      en: {
        title: "Abandoned Meal",
        text: [
          "A random hero spots an abandoned roast on a tin plate in a corner.",
          "He can decide to eat it or pass it to another hero, and so on.",
          "If a hero eats it, roll 1d6 to determine the effect:"
        ]
      }
    },
    roll: {
      sides: 6,
      resultsI18n: {
        fr: {
          1: "Empoisonné ? Perdez 1 PC !",
          2: "Empoisonné ? Perdez 1 PC !",
          3: "Savoureux… mais sans effet.",
          4: "Délicieux ! Récupérez 2 PC perdus.",
          5: "Délicieux ! Récupérez 2 PC perdus.",
          6: "Délicieux ! Récupérez 2 PC perdus."
        },
        en: {
          1: "Was it poisoned? Lose 1 BP!",
          2: "Was it poisoned? Lose 1 BP!",
          3: "Tasty, but no effect.",
          4: "Delicious! Recover 2 lost BP.",
          5: "Delicious! Recover 2 lost BP.",
          6: "Delicious! Recover 2 lost BP."
        }
      }
    }
  },
  {
    id: "winds-of-magic",
    icon: "🌀",
    tags: ["Magic", "Recover"],
    i18n: {
      fr: {
        title: "Vents de magie",
        text: [
          "Les vents de magie se renforcent : chaque héros peut récupérer 1 carte de sort déjà utilisée (s’il en a)."
        ]
      },
      en: {
        title: "Winds of Magic",
        text: [
          "The winds of magic grow stronger, and every hero can recover 1 of their used spell cards (if any)."
        ]
      }
    }
  },
  {
    id: "sleeping-dart-trap",
    icon: "🏹",
    tags: ["Trap"],
    i18n: {
      fr: {
        title: "Piège : dard soporifique",
        text: [
          "Un héros choisi au hasard active involontairement un piège qui tire un dard soporifique.",
          "Le héros doit obtenir au moins deux boucliers blancs avec ses dés de défense, sinon il perd son prochain tour et ne peut pas se défendre tant qu’il n’obtient pas un bouclier blanc en lançant 1 dé au début de ses tours suivants."
        ]
      },
      en: {
        title: "Sleeping Dart Trap",
        text: [
          "A random hero inadvertently activates a trap that shoots a sleeping dart.",
          "The hero must roll at least two white shields with his defense dice, or he will miss his next turn and be unable to defend until he rolls a white shield with one die at the beginning of his following turns."
        ]
      }
    }
  },
  {
    id: "poisonous-gas-trap",
    icon: "☠️",
    tags: ["Trap"],
    i18n: {
      fr: {
        title: "Piège : gaz toxique",
        text: [
          "Un trou dans le mur libère soudain un nuage de gaz toxique qui va remplir l’air et faire perdre 1 PC à tous les héros,",
          "sauf si un nain (ou un autre héros possédant une boîte à outils ou une capacité équivalente) réussit à désamorcer le piège immédiatement, avant que le gaz n’envahisse la zone."
        ]
      },
      en: {
        title: "Poisonous Gas Trap",
        text: [
          "A hole in the wall suddenly releases a cloud of poisonous gas that will fill the air and cause all the heroes to lose 1 BP,",
          "unless a dwarf (or another hero with a toolkit or equivalent ability) successfully rolls to disarm the trap immediately before the gas fills the air."
        ]
      }
    }
  },

  // --- Page 2 (9 cards) ---
  {
    id: "boulder-trap",
    icon: "🪨",
    tags: ["Trap"],
    i18n: {
      fr: {
        title: "Piège : rocher roulant",
        text: [
          "Un énorme rocher dévale le couloir ou la salle où se trouvent le plus de héros.",
          "Ils perdent 1 PC à moins d’obtenir 5 ou 6 sur 1 dé ; ils sont tous repoussés vers une extrémité du couloir ou un côté de la salle.",
          "Puis le rocher se brise et le couloir/la salle redevient praticable."
        ]
      },
      en: {
        title: "Boulder Trap",
        text: [
          "A massive boulder comes rolling down the corridor or room with more heroes.",
          "They lose 1 BP unless they roll a 5 or 6 on a die; they are all pushed to one end of the corridor or side of the room, then the boulder breaks and the corridor or room can be moved through again."
        ]
      }
    }
  },
/*   {
    id: "treasure-map",
    icon: "🗺️",
    tags: ["Map", "Treasure"],
    i18n: {
      fr: {
        title: "Carte au trésor",
        text: [
          "Les héros trouvent une carte sommaire indiquant l’emplacement d’un trésor (mais pas le chemin pour y accéder).",
          "Le joueur le plus jeune doit révéler l’emplacement exact du plus gros trésor de la quête.",
          "Piochez une autre carte s’il n’y a aucun trésor dans le donjon, ou s’il n’y a pas de joueur le joueur le plus jeune."
        ]
      },
      en: {
        title: "Treasure Map",
        text: [
          "The heroes find a crude map showing the location of a treasure (but not the path to it).",
          "The youngest player must reveal the exact location of the largest treasure in the quest.",
          "Draw another card if there is no treasure in the dungeon, or if there is no the youngest player player."
        ]
      }
    }
  }, */
  {
    id: "phantasmagoria",
    icon: "🌀",
    tags: ["Magic", "MP"],
    i18n: {
      fr: {
        title: "Fantasmagorie",
        text: [
          "Un maelström d’apparitions illusoires et de lumières trompeuses entoure les héros.",
          "Tous les héros perdent 1 PM, sauf si un héros sacrifie 1 carte de sort pour contrer et dissiper les illusions."
        ]
      },
      en: {
        title: "Phantasmagoria",
        text: [
          "A maelstrom of illusory apparitions and deceptive lights surrounds the heroes.",
          "All heroes lose 1 MP, unless a hero sacrifices one spell card to counter and dissolve the illusions."
        ]
      }
    }
  },
  {
    id: "earthquake",
    icon: "🌋",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Tremblement de terre",
        text: [
          "Le donjon tremble violemment et des pierres tombent du plafond.",
          "Tous les héros perdent 1 PC, sauf si un héros ayant des sorts de Terre sacrifie 1 sort de Terre pour apaiser le séisme."
        ]
      },
      en: {
        title: "Earthquake",
        text: [
          "The dungeon trembles and shakes and rocks fall from the ceiling.",
          "All heroes lose 1 BP, unless a hero with earth spells sacrifices one earth spell card to placate the earthquake."
        ]
      }
    }
  },
  {
    id: "infernal-heat",
    icon: "🔥",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Chaleur infernale",
        text: [
          "La température devient insupportable : une chaleur infernale. Tous les héros perdent 1 PC,",
          "sauf si un héros ayant des sorts d’Eau sacrifie 1 sort d’Eau pour dissiper la chaleur.",
          "Ensuite, la température revient à la normale."
        ]
      },
      en: {
        title: "Infernal Heat",
        text: [
          "The temperature rises to unbearable, infernal heat and all heroes lose 1 BP,",
          "unless a hero with water spells sacrifices one water spell card to dissipate the heat.",
          "After that, the temperature returns to normal."
        ]
      }
    }
  },
  {
    id: "unnatural-cold",
    icon: "❄️",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Froid surnaturel",
        text: [
          "La température chute jusqu’à un froid glacial : tous les héros perdent 1 PC,",
          "sauf si un héros ayant des sorts de Feu sacrifie 1 sort de Feu pour réchauffer le groupe.",
          "Ensuite, la température revient à la normale."
        ]
      },
      en: {
        title: "Unnatural Cold",
        text: [
          "The temperature drops to freezing cold and all heroes lose 1 BP, unless a hero with fire spells sacrifices one fire spell card to keep all heroes warm.",
          "After that, the temperature returns to normal."
        ]
      }
    }
  },
  {
    id: "lethal-stench",
    icon: "💨",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Pestilence mortelle",
        text: [
          "Un miasme toxique envahit l’air : tous les héros perdent 1 PC,",
          "sauf si un héros ayant des sorts d’Air sacrifie 1 sort d’Air pour purifier immédiatement l’atmosphère.",
          "Ensuite, le miasme se dissipe."
        ]
      },
      en: {
        title: "Lethal Stench",
        text: [
          "A poisonous miasma fills the air and all heroes lose 1 BP, unless a hero with air spells sacrifices one air spell card to immediately cleanse the air.",
          "After that, the miasma dissipates."
        ]
      }
    }
  },
  {
    id: "ancestors-inspiration",
    icon: "✨",
    tags: ["Blessing", "Choice"],
    i18n: {
      fr: {
        title: "Inspiration des ancêtres",
        text: [
          "Un héros choisi au hasard est visité par les esprits de ses ancêtres, qui l’exhortent à accomplir de plus grands exploits.",
          "Le joueur choisit l’un des effets suivants :",
          "récupérer 1 carte de sort utilisée (s’il en a) ; récupérer 2 PC ; lancer +1 dé d’attaque (AD) jusqu’à la fin de la quête ; lancer +1 dé de défense (DD) jusqu’à la fin de la quête."
        ]
      },
      en: {
        title: "Ancestors' Inspiration",
        text: [
          "A random hero is visited by the spirits of his ancestors, who incite him to greater deeds.",
          "The player may choose one of the following effects:",
          "recover a used spell card (if any); recover 2 BP; roll +1 AD for the remainder of the quest; roll +1 DD for the remainder of the quest."
        ]
      }
    }
  },

  // --- Page 3 (9 cards) ---
  {
    id: "goblin-apprentice",
    icon: "👺",
    tags: ["Creature", "Ally"],
    i18n: {
      fr: {
        title: "L’apprenti gobelin",
        text: [
          "Un gobelin apparaît sur une case à côté d'un héros au hasard.",
          "Il veut devenir un héros et choisit un héros au hasard comme maître et guide.",
          "Désormais, ce joueur le contrôle, avant ou après son tour. En tant qu’aspirant héros, le gobelin se défend maintenant avec des boucliers blancs.",
          "Il lance 3 dés pour le mouvement. S’il survit à une quête, son maximum de PC et de PM augmente de 1, jusqu’à un maximum de 5 PC et 5 PM.",
          "Le joueur peut lui acheter de l’équipement, mais le gobelin ne peut pas utiliser d’armes à deux mains (armes incompatibles avec un bouclier)."
        ]
      },
      en: {
        title: "The Goblin Apprentice",
        text: [
          "A goblin appears on a square adjacent to a randomly selected hero.",
          "He wants to be a hero, and chooses a random hero to be his master and guide.",
          "From now on, that player controls him, before or after his turn. As an aspiring hero, the goblin now defends with white shields.",
          "He rolls 3 dice for movement. If he survives a quest, his maximum BP and MP increase by 1, up to a maximum of 5 BP and 5 MP.",
          "The player can also buy him equipment, but the goblin cannot use two-handed weapons (i.e. weapons that cannot be used together with a shield)."
        ]
      }
    },
  },
  {
    id: "mimic",
    icon: "🪑",
    tags: ["Creature", "Furniture"],
    i18n: {
      fr: {
        title: "Mimique !?",
        text: [
          "Un meuble sur le plateau, dans une pièce ou se trouve un héros tiré au hasard prend vie !",
          "Piochez de nouveau s’il n’y a aucun meuble. Les chaises et coffres utilisent les mêmes caractéristiques que les zombies.",
          "Les autres meubles utilisent les mêmes caractéristiques que les momies.",
          "Les cheminées ne peuvent pas se déplacer, mais crachent du feu pour attaquer un héros qu’elles voient.",
           ]
      },
      en: {
        title: "Mimic!?",
        text: [
          "A piece of furniture on the board, in a room containing a randomly selected hero, comes to life",
          "Draw again if there is no furniture. Chairs and chests use the same game statistics as zombies.",
          "Other pieces use the same game statistics as mummies.",
          "Fireplaces cannot move, but spit fire to attack a hero they can see.",
        ]
      }
    }
  },
 /*  {
    id: "the-ancient-king",
    icon: "👑",
    tags: ["Undead", "Spawn"],
    i18n: {
      fr: {
        title: "L’ancien roi",
        text: [
          "Un mort-vivant tourmenté émerge d’un tombeau oublié sous le sol !",
          "Une case visible par les héros s’effondre et devient une fosse (piège de fosse ouvert).",
          "Une momie en émerge et joue immédiatement. Elle a 4 PC.",
          "Si elle est vaincue, les héros peuvent piller ses bijoux royaux, d’une valeur de 100 pièces d’or.",
          "Si vous jouez sans maître du jeu, le plus jeune joueur décide où apparaissent la fosse et la momie."
        ]
      },
      en: {
        title: "The Ancient King",
        text: [
          "A restless dead emerges from a long-forgotten tomb under the floor!",
          "One square the heroes can see collapses and becomes an open pit trap.",
          "From it, a mummy emerges and plays immediately. It has 4 BP.",
          "If it is defeated, the heroes can loot its royal jewelry, worth 100 coins.",
          "If you play without a game master, the youngest player decides where the pit and mummy appear."
        ]
      }
    },
    wandering: {
      count: 1,
      noteI18n: {
        fr: "Faites apparaître 1 momie (4 PC) depuis une fosse ouverte créée sur une case visible.",
        en: "Spawn 1 mummy (4 BP) from an open pit trap created on a visible square."
      }
    }
  },
  {
    id: "restless-dead",
    icon: "💀",
    tags: ["Undead", "Spawn"],
    i18n: {
      fr: {
        title: "Morts agités",
        text: [
          "Les morts agités émergent de tombes oubliées sous le sol !",
          "Trois cases visibles par les héros s’effondrent et deviennent des fosses ouvertes.",
          "De chaque fosse, un squelette émerge et joue immédiatement.",
          "Si vous jouez sans maître du jeu, le plus jeune joueur décide où apparaissent les fosses et les squelettes."
        ]
      },
      en: {
        title: "Restless Dead",
        text: [
          "The restless dead emerge from long-forgotten tombs under the floor!",
          "Three squares the heroes can see collapse and become open pit traps.",
          "From each pit, a skeleton emerges and plays immediately.",
          "If you play without a game master, the youngest player decides where the pits and skeletons appear."
        ]
      }
    },
    wandering: {
      count: 3,
      noteI18n: {
        fr: "Faites apparaître 3 squelettes (un par nouvelle fosse ouverte, sur des cases visibles).",
        en: "Spawn 3 skeletons (one from each new open pit trap on visible squares)."
      }
    }
  },
  {
    id: "loud-monsters",
    icon: "👂",
    tags: ["Info"],
    i18n: {
      fr: {
        title: "Monstres bruyants",
        text: [
          "Le joueur le plus jeune doit révéler le nombre de monstres à l’intérieur d’une pièce non explorée.",
          "Si vous jouez sans maître du jeu, piochez une autre carte."
        ]
      },
      en: {
        title: "Loud Monsters",
        text: [
          "The youngest player must reveal the number of monsters inside an unexplored room.",
          "If you play without a game master, draw another card."
        ]
      }
    }
  }, */
  {
    id: "loose-stone-with-a-surprise",
    icon: "🪨",
    tags: ["Hazard", "Loot"],
    i18n: {
      fr: {
        title: "Pierre descellée… et surprise",
        text: [
          "Un héros choisi au hasard trébuche et se tord la cheville.",
          "Jusqu’à la fin de la quête, il lance un dé de mouvement en moins (minimum 1 dé),",
          "mais il trouve aussi quelque chose sous la pierre : piochez une carte d’équipement !"
        ]
      },
      en: {
        title: "Loose Stone, with a Surprise",
        text: [
          "A random hero stumbles and sprains his ankle.",
          "For the remainder of the quest the hero rolls one less die for movement (minimum 1 die),",
          "but also finds something under the loose stone: draw an equipment card!"
        ]
      }
    }
  },
  {
    id: "collapsed-wall",
    icon: "🧱",
    tags: ["Map", "Terrain"],
    i18n: {
      fr: {
        title: "Mur effondré",
        text: [
          "Dans un grondement, une section de mur s’effondre, créant un nouveau passage vers une pièce ou un couloir existant.",
          "Le joueur le plus jeune doit placer une porte ouverte sur un mur.",
          "Si vous jouez sans maître du jeu, le plus jeune joueur décide où placer la porte ouverte."
        ]
      },
      en: {
        title: "Collapsed Wall",
        text: [
          "With a loud rumble, a wall section collapses, creating a new passage to an existing room or corridor.",
          "The youngest player must place an open door on a wall.",
          "If you play without a game master, the youngest player decides where to place the open door."
        ]
      }
    }
  },
  {
    id: "loose-stone",
    icon: "🦶",
    tags: ["Hazard"],
    i18n: {
      fr: {
        title: "Pierre descellée",
        text: [
          "Un héros choisi au hasard trébuche et se tord la cheville.",
          "Jusqu’à la fin de la quête, il lance un dé de mouvement en moins (minimum 1 dé)."
        ]
      },
      en: {
        title: "Loose Stone",
        text: [
          "A random hero stumbles and sprains his ankle.",
          "For the remainder of the quest the hero rolls one less die for movement (minimum 1 die)."
        ]
      }
    }
  },
  /* {
    id: "too-much-calm",
    icon: "🧘",
    tags: ["Rule"],
    i18n: {
      fr: {
        title: "Trop de calme",
        text: [
          "Désormais, les événements de donjon ne se produisent que sur un résultat de 6 au lieu de 5 ou 6.",
          "Quand un 6 est obtenu, vous devez toutefois piocher trois cartes au lieu d’une, et les jouer toutes dans l’ordre de pioche.",
          "Gardez cette carte à portée de main comme rappel."
        ]
      },
      en: {
        title: "Too Much Calm",
        text: [
          "From now on, dungeon events only happen on a result of 6 instead of 5 or 6.",
          "When a 6 is rolled, however, you must draw three cards instead of one, and play them all, in the order they are drawn.",
          "Keep this card at hand as a reminder."
        ]
      }
    }
  }, */


  {
    id: "mystery-mushroom",
    icon: "🍄",
    tags: ["Roll", "MP", "BP"],
    i18n: {
      fr: {
        title: "Champignon mystérieux",
        text: [
          "Un héros repère un champignon boursouflé et lumineux.",
          "Il peut décider de le manger ou de le passer à un autre héros, etc.",
          "S’il est mangé, lancez 1d6 pour déterminer l’effet :"
        ]
      },
      en: {
        title: "Mystery Mushroom",
        text: [
          "A random hero spots a bulging, glowing mushroom.",
          "He can decide to eat it or pass it to another hero, and so on.",
          "If a hero eats it, roll 1d6 to determine the effect:"
        ]
      }
    },
    roll: {
      sides: 6,
      resultsI18n: {
        fr: {
          1: "Le héros perd 1 PM et 1 PC, mais récupère 1 carte de sort utilisée (s’il en a).",
          2: "Le héros perd 1 PC mais récupère 1 PM perdu.",
          3: "Le héros perd 1 PM mais récupère 1 PC perdu.",
          4: "Le héros récupère 1 PM perdu et 1 PC perdu.",
          5: "Le héros récupère tous ses PC et PM perdus.",
          6: "Le maximum de PM du héros augmente définitivement de +1 !"
        },
        en: {
          1: "The hero loses 1 MP and 1 BP, but recovers 1 used spell card (if any).",
          2: "The hero loses 1 BP but recovers 1 lost MP.",
          3: "The hero loses 1 MP but recovers 1 lost BP.",
          4: "The hero recovers 1 lost MP and 1 lost BP.",
          5: "The hero recovers all lost BP and MP.",
          6: "The hero's maximum MP value is permanently increased by 1!"
        }
      }
    }
  },
  {
    id: "mystery-potion",
    icon: "🧪",
    tags: ["Roll", "BP", "MP"],
    i18n: {
      fr: {
        title: "Potion mystérieuse",
        text: [
          "Un héros repère une potion bouillonnante sans étiquette.",
          "Il peut décider de la boire ou de la passer à un autre héros, etc.",
          "S’il la boit, lancez 1d6 pour déterminer l’effet :"
        ]
      },
      en: {
        title: "Mystery Potion",
        text: [
          "A random hero spots an unlabeled, bubbling potion.",
          "He can decide to drink it or pass it to another hero, and so on.",
          "If a hero drinks it, roll 1d6 to determine the effect:"
        ]
      }
    },
    roll: {
      sides: 6,
      resultsI18n: {
        fr: {
          1: "Le héros perd 1 PC mais lance +1 dé d’attaque (AD) jusqu’à la fin de la quête.",
          2: "Aucun effet.",
          3: "Le héros récupère 1 PM perdu et 1 PC perdu.",
          4: "Le héros lance +1 dé de mouvement jusqu’à la fin de la quête.",
          5: "Le héros récupère tous ses PC et PM perdus.",
          6: "Le maximum de PC du héros augmente définitivement de +1 !"
        },
        en: {
          1: "The hero loses 1 BP but also rolls +1 AD for the remainder of the quest.",
          2: "The potion has no effect at all.",
          3: "The hero recovers 1 lost MP and 1 lost BP.",
          4: "The hero rolls +1 die for movement for the remainder of the quest.",
          5: "The hero recovers all lost BP and MP.",
          6: "The hero's maximum BP value is permanently increased by 1!"
        }
      }
    }
  },
  {
    id: "dungeon-panic",
    icon: "😱",
    tags: ["MP", "Test"],
    i18n: {
      fr: {
        title: "Panique du donjon",
        text: [
          "Les ténèbres et le mal du donjon peuvent briser l’esprit d’un héros.",
          "Un héros choisi au hasard doit lancer un nombre de dés rouges égal à ses PM.",
          "S’il n’obtient pas au moins un 6, il perd 1 PM."
        ]
      },
      en: {
        title: "Dungeon Panic",
        text: [
          "The darkness and the evil of the dungeon can destroy a hero's mind.",
          "A random hero must roll a number of red dice equal to their MP.",
          "If he doesn't obtain at least a 6 with a die, he loses 1 MP."
        ]
      }
    }
  },
  {
    id: "dungeon-terror",
    icon: "😨",
    tags: ["MP", "Test"],
    i18n: {
      fr: {
        title: "Terreur du donjon",
        text: [
          "Les ténèbres et le mal du donjon peuvent briser l’esprit d’un héros.",
          "Chaque héros doit lancer un nombre de dés rouges égal à ses PM.",
          "Ceux qui n’obtiennent pas au moins un 6 perdent 1 PM."
        ]
      },
      en: {
        title: "Dungeon Terror",
        text: [
          "The darkness and the evil of the dungeon can destroy a hero's mind.",
          "Each hero must roll a number of red dice equal to their MP.",
          "Those who don't obtain at least a 6 with one die, lose 1 MP."
        ]
      }
    }
  },
  {
    id: "vampire-bat",
    icon: "🦇",
    tags: ["Creature", "Attack"],
    i18n: {
      fr: {
        title: "Chauve-souris vampire",
        text: [
          "Une chauve-souris noire de la taille d’un chien fond sur le donjon et attaque un héros au hasard avec 3 dés d’attaque (le héros se défend normalement), puis s’envole."
        ]
      },
      en: {
        title: "Vampire Bat",
        text: [
          "A black bat the size of a dog swoops through the dungeon and attacks a random hero with 3 AD (the hero defends as usual), then flies away."
        ]
      }
    }
  },
  /* {
    id: "monsters-patrol",
    icon: "🚪",
    tags: ["Spawn"],
    i18n: {
      fr: {
        title: "Patrouille de monstres",
        text: [
          "Deux monstres errants apparaissent dans une pièce ne contenant aucun héros, au choix de le joueur le plus jeune, et jouent immédiatement.",
          "Si vous jouez sans maître du jeu, le plus jeune joueur décide dans quelle pièce ils apparaissent."
        ]
      },
      en: {
        title: "Monsters Patrol",
        text: [
          "Two wandering monsters appear in a room that doesn't contain heroes, at the youngest player's discretion, and play immediately.",
          "If you play without a game master, the youngest player decides in which room they appear."
        ]
      }
    },
    wandering: {
      count: 2,
      noteI18n: {
        fr: "Faites apparaître 2 monstres errants dans une pièce sans héros.",
        en: "Spawn 2 wandering monsters in a room without heroes."
      }
    }
  }, */
  {
    id: "surprise-attack",
    icon: "⚔️",
    tags: ["Spawn", "Door"],
    i18n: {
      fr: {
        title: "Attaque surprise",
        text: [
          "La porte la plus porche d'un héros tiré au hasard s'ouvre et  tous les monstres présents dans la pièce jouent immédiatement.",
          "Piochez une autre carte s’il n’y a aucune porte fermée sur le plateau."
        ]
      },
      en: {
        title: "Surprise Attack",
        text: [
          "The door closest to a randomly selected hero opens, and all monsters in that room immediately take a turn.”",
          "Draw another card if there are no closed doors on the board."
        ]
      }
    },
    wandering: {
      count: "ALL",
      noteI18n: {
        fr: "Apparition : tous les monstres de la pièce ouverte (variable).",
        en: "Spawn: all monsters in the opened room (variable)."
      }
    }
  },
  {
    id: "hungry-rat-swarm",
    icon: "🐀",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Nuée de rats affamés",
        text: [
          "Des rats faméliques se ruent dans les couloirs et mordent tout ce qu’ils trouvent.",
          "Chaque héros perd 1 PC sauf s’il obtient un bouclier blanc avec ses dés de défense ; ensuite, la nuée s’enfuit."
        ]
      },
      en: {
        title: "Hungry Rat Swarm",
        text: [
          "Famelic rats scurry along the dungeon halls and bite everything and everyone.",
          "Every hero loses 1 BP unless they roll a white shield with their defense dice, then the swarm scampers away."
        ]
      }
    }
  },
  {
    id: "rabid-rat-swarm",
    icon: "🐀",
    tags: ["Hazard", "BP"],
    i18n: {
      fr: {
        title: "Nuée de rats enragés",
        text: [
          "Des rats furieux et affamés se ruent dans les couloirs et mordent tout ce qu’ils trouvent.",
          "Chaque héros perd 1 PC sauf s’il obtient 2 boucliers blancs avec ses dés de défense ; ensuite, la nuée s’enfuit."
        ]
      },
      en: {
        title: "Rabid Rat Swarm",
        text: [
          "Ravenous, crazed rats scurry along the dungeon halls and bite everything and everyone.",
          "Every hero loses 1 BP unless they roll 2 white shields with their defense dice, then the swarm scampers away."
        ]
      }
    }
  },

  {
    id: "the-goblin-thief",
    icon: "💰",
    tags: ["Creature", "Gold", "Attack"],
    i18n: {
      fr: {
        title: "Le gobelin voleur",
        text: [
          "Un gobelin portant un sac de trésors volés traverse le groupe en courant. Chaque héros a une opportunité de l’attaquer !",
          "Le gobelin voleur ne se défend pas et ne perd pas de PC.",
          "À la place, chaque héros qui obtient au moins un crâne fait tomber 2d6 pièces de son sac.",
          "Le héros peut ramasser l’or immédiatement. Ensuite, le gobelin s’enfuit.",
          "Si le résultat des deux dés vaut 12, au lieu de 12 pièces, le gobelin laisse tomber un objet au hasard (deck équipement).",
        ]
      },
      en: {
        title: "The Goblin Thief",
        text: [
          "A goblin with a bag full of stolen treasure runs across the group. Every hero has one opportunity to attack him!",
          "The goblin thief does not roll to defend, and doesn't lose BP.",
          "Instead, each hero who rolls at least one skull result causes 2d6 coins to fall from his bag.",
          "The hero can pick the coins up immediately. After that, the goblin flees.",
          "If the result of the two dice is 12, instead of 12 coins the goblin drops a random  item card drawn from the equipment deck.",
        ]
      }
    }
  },
  {
    id: "dungeon-carnage",
    icon: "🩸",
    tags: ["Rule", "Attack"],
    i18n: {
      fr: {
        title: "Carnage du donjon",
        text: [
          "Les esprits primordiaux du chaos et de l’effroi réclament plus de sang pour divertir leurs âmes sombres, et insufflent à toutes les créatures une fureur aveugle.",
          "Jusqu’à la fin de la quête, tous les héros et tous les monstres lancent +1 dé d’attaque (AD)."
        ]
      },
      en: {
        title: "Dungeon Carnage",
        text: [
          "The primordial spirits of chaos and dread demand more bloodshed to entertain their dark souls, and infuse all creatures in the dungeon with blind furor and rage.",
          "Until the end of the quest, all heroes and monsters roll +1 AD."
        ]
      }
    }
  },
  {
    id: "dungeon-madness",
    icon: "🧠",
    tags: ["Control"],
    i18n: {
      fr: {
        title: "Folie du donjon",
        text: [
          "Les ténèbres et le mal du donjon peuvent briser l’esprit d’un héros.",
          "Pour ce tour uniquement, le joueur le plus jeune contrôle et utilise immédiatement un héros au hasard, comme s’il s’agissait d’un monstre."
        ]
      },
      en: {
        title: "Dungeon Madness",
        text: [
          "The darkness and the evil of the dungeon can destroy a hero's mind.",
          "For this turn only, the youngest player controls and immediately uses a random hero, just like a monster."
        ]
      }
    }
  },
  {
    id: "benevolent-ghost",
    icon: "👻",
    tags: ["Blessing", "Heal"],
    i18n: {
      fr: {
        title: "Fantôme bienveillant",
        text: [
          "L’esprit d’un héros mort depuis longtemps apparaît et bénit les aventuriers.",
          "Ils récupèrent 1 PC perdu et 1 PM perdu. Puis l’esprit se dissout."
        ]
      },
      en: {
        title: "Benevolent Ghost",
        text: [
          "The spirit of a long-dead hero appears and blesses the heroes.",
          "They recover 1 lost BP and 1 lost MP. Then it dissolves."
        ]
      }
    }
  },
  {
    id: "helpful-ghost",
    icon: "👻",
    tags: ["Info", "Objective"],
    i18n: {
      fr: {
        title: "Fantôme serviable",
        text: [
          "L’esprit d’un aventurier défunt apparaît et révèle l’emplacement exact de l’objectif des héros sur le plateau (mais pas le chemin pour y parvenir). Puis il se dissout.",
          "Si vous jouez sans maître du jeu, piochez une autre carte."
        ]
      },
      en: {
        title: "Helpful Ghost",
        text: [
          "The spirit of a dead adventurer appears and reveals the exact location of the heroes' objective on the board (but not the path to it). Then it dissolves.",
          "If you play without a game master, draw another card."
        ]
      }
    }
  },
  {
    id: "ambush",
    icon: "🗡️",
    tags: ["Spawn"],
    i18n: {
      fr: {
        title: "Embuscade",
        text: [
          "Un nombre de monstres errants égal au nombre de héros apparaît, chacun dans une pièce différente choisie par le joueur le plus jeune, et ils jouent immédiatement.",
          "Si vous jouez sans maître du jeu, le plus jeune joueur décide dans quelles pièces apparaissent les monstres."
        ]
      },
      en: {
        title: "Ambush",
        text: [
          "A number of wandering monsters equal to the number of heroes appear, each in a different room chosen by the youngest player, and play immediately.",
          "If you play without a game master, the youngest player decides in which rooms the monsters appear."
        ]
      }
    },
    wandering: {
      count: "=#heroes",
      noteI18n: {
        fr: "Faites apparaître autant de monstres errants que de héros, chacun dans une pièce différente.",
        en: "Spawn that many wandering monsters, each in a different room."
      }
    }
  },
 /*  {
    id: "the-slayer",
    icon: "🛡️",
    tags: ["Spawn", "Boss"],
    i18n: {
      fr: {
        title: "Le Pourfendeur",
        text: [
          "Un guerrier terrifiant apparaît à l’entrée du donjon et joue immédiatement.",
          "Il est équipé d’une arbalète que les héros peuvent récupérer s’ils le vainquent."
        ]
      },
      en: {
        title: "The Slayer",
        text: [
          "A dreadful warrior appears at the dungeon entrance and plays immediately.",
          "He is equipped with a crossbow that can be looted by the heroes if they defeat him."
        ]
      }
    },
    wandering: {
      count: 1,
      noteI18n: {
        fr: "Faites apparaître 1 guerrier terrifiant à l’entrée du donjon (Le Pourfendeur).",
        en: "Spawn 1 dreadful warrior at the dungeon entrance (The Slayer)."
      }
    }
  }, */
/*   {
    id: "the-hired-thugs",
    icon: "🪓",
    tags: ["Spawn"],
    i18n: {
      fr: {
        title: "Les brutes engagées",
        text: [
          "Trois orcs apparaissent à l’entrée du donjon et jouent immédiatement.",
          "Chacun possède 3d6 pièces d’or qui peuvent être récupérées par les héros s’ils les vainquent."
        ]
      },
      en: {
        title: "The Hired Thugs",
        text: [
          "Three orcs appear at the dungeon entrance and play immediately.",
          "Each of them has 3d6 coins that can be looted by the heroes if they defeat them."
        ]
      }
    },
    wandering: {
      count: 3,
      noteI18n: {
        fr: "Faites apparaître 3 orcs à l’entrée du donjon.",
        en: "Spawn 3 orcs at the dungeon entrance."
      }
    }
  }, */

   {
    id: "the-hired-thugs",
    icon: "🪓",
    tags: ["Spawn"],
    i18n: {
      fr: {
    title: "Un reflet dans la lame",
    text: [
      "Dans le reflet de ton arme, une forme se dessine derrière toi.",
      "Tu te retournes juste à temps… ou presque.",
      "Placez 3 monstres errants (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
      "Les monstres attaquent immédiatement.",
      "Après résolution, le héros peut agir normalement."
    ]
  },
  en: {
    title: "A Reflection in Steel",
    text: [
      "In your blade’s reflection, a shape stands behind you.",
      "You turn just in time… almost.",
      "Place the wandering monster (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
      "The monster attacks immediately.",
      "After resolving, the hero may act normally."
    ]
  }
    },
    wandering: {
      count: 3,
      
      noteI18n: {
        fr: "Faites apparaître 3 monstre errant avec l'app HeroQuest.",
        en: "Spawn 3 wandering monster with the HeroQuest app."
      }
    }
    }, 


/*   {
    id: "the-murderers",
    icon: "🔪",
    tags: ["Spawn", "Loot"],
    i18n: {
      fr: {
        title: "Les assassins",
        text: [
          "Quatre gobelins apparaissent à l’entrée du donjon et jouent immédiatement.",
          "Ils sont équipés de dagues qu’ils peuvent lancer sur les héros.",
          "S’ils sont tués, ils peuvent être pillés : pour chaque gobelin, lancez 1 dé et soustrayez 3 ; le résultat est le nombre de dagues récupérables."
        ]
      },
      en: {
        title: "The Murderers",
        text: [
          "Four goblins appear at the dungeon entrance and play immediately.",
          "They are equipped with daggers that they can throw at the heroes.",
          "If killed, they can be looted for daggers: for each goblin, roll a die and subtract 3, and the result is the number of usable daggers that can be looted."
        ]
      }
    },
    wandering: {
      count: 4,
      noteI18n: {
        fr: "Faites apparaître 4 gobelins à l’entrée du donjon.",
        en: "Spawn 4 goblins at the dungeon entrance."
      }
    }
  }, */

 {
    id: "the-murderers",
    icon: "🔪",
    tags: ["Spawn", "Loot"],
    i18n: {
      fr: {
    title: "Le faux silence",
    text: [
      "Le donjon devient trop silencieux… anormalement silencieux.",
      "Puis un grondement bref annonce une attaque soudaine.",
      "Placez le monstre errant (voir notes de quête) sur une case adjacente au héros qui cherche.",
      "Le monstre attaque immédiatement.",
      "Remettez cette carte sous le paquet."
    ]
  },
  en: {
    title: "The False Quiet",
    text: [
      "The dungeon grows too quiet… unnaturally so.",
      "Then a short rumble signals a sudden attack.",
      "Place the wandering monster (see Quest Notes) on a square adjacent to the searching hero.",
      "The monster attacks immediately.",
      "Return this card to the bottom of the deck."
    ]
  }
    },
    wandering: {
      count: 4,
      
      noteI18n: {
        fr: "Faites apparaître 4 monstre errant avec l'app HeroQuest.",
        en: "Spawn 4 wandering monster with the HeroQuest app."
      }
    }
    }, 




/*   {
    id: "the-hunters",
    icon: "👹",
    tags: ["Spawn"],
    i18n: {
      fr: {
        title: "Les chasseurs",
        text: [
          "Deux abominations apparaissent à l’entrée du donjon et jouent immédiatement."
        ]
      },
      en: {
        title: "The Hunters",
        text: [
          "Two abominations appear at the dungeon entrance and play immediately."
        ]
      }
    },
    wandering: {
      count: 2,
      noteI18n: {
        fr: "Faites apparaître 2 abominations à l’entrée du donjon.",
        en: "Spawn 2 abominations at the dungeon entrance."
      }
    }
  }, */
 {
    id: "the-hunters",
    icon: "👹",
    tags: ["Spawn"],
    i18n: {
      fr: {
    title: "Une lueur bouge",
    text: [
      "Ta torche vacille, comme si l’air était aspiré.",
      "Une lueur se déplace… et quelque chose jaillit de la pénombre.",
      "Placez le monstre errant (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
      "Le monstre attaque immédiatement.",
    ]
  },
  en: {
    title: "A Shifting Glow",
    text: [
      "Your torch flickers, as if the air is being pulled away.",
      "A glow shifts… and something bursts from the gloom.",
      "Place the wandering monster (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
      "The monster attacks immediately.",
    ]
  }
    },
    wandering: {
      count: 2,
    
      noteI18n: {
        fr: "Faites apparaître 2 monstre errant avec l'app HeroQuest.",
        en: "Spawn 2 wandering monster with the HeroQuest app."
      }
    }
  }, 
  {
    id: "double-trouble",
    icon: "⏳",
    tags: ["Rule", "Chain"],
    i18n: {
      fr: {
        title: "Double peine",
        text: [
          "Piochez deux cartes supplémentaires et jouez-les immédiatement, dans l’ordre de pioche."
        ]
      },
      en: {
        title: "Double Trouble",
        text: [
          "Draw two more cards and play both immediately, in the order they are drawn."
        ]
      }
    }
  },
    {
    id: "dungeon-turmoil",
    icon: "⏳",
    tags: ["Rule", "Chain"],
    i18n: {
      fr: {
        title: "Tumulte du donjon",
        text: [
          "Piochez 3 cartes supplémentaires et jouez-les immédiatement, dans l’ordre de pioche."
        ]
      },
      en: {
        title: "Double Trouble",
        text: [
          "Draw 3 more cards and play both immediately, in the order they are drawn."
        ]
      }
    }
  },
/*   {
    id: "dungeon-turmoil",
    icon: "🌀",
    tags: ["Rule"],
    i18n: {
      fr: {
        title: "Tumulte du donjon",
        text: [
          "Désormais, jusqu’à la fin de la partie, les événements de donjon se produisent sur un résultat de 4 ou plus au lieu de 5 ou 6.",
          "Piochez et jouez immédiatement une autre carte !",
          "Gardez cette carte à portée de main comme rappel."
        ]
      },
      en: {
        title: "Dungeon Turmoil",
        text: [
          "From now on, until the end of the game, dungeon events happen on a result of 4 or more instead of 5 or 6.",
          "Draw and play another card immediately!",
          "Keep this card at hand as a reminder."
        ]
      }
    }
  }*/
,
  // --- Added Wandering Monster cards (auto) ---
  {
    "id": "wandering-monster-01",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "Pas dans ton dos…",
        "text": [
          "Un frisson te parcourt l’échine.",
          "Quelque chose te suit dans l’ombre.",
          "Faites apparaître 1 monstre errant (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Le monstre attaque immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "Not Behind You…",
        "text": [
          "A chill crawls up your spine.",
          "Something is stalking you in the dark.",
          "Spawn 1 wandering monster (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monster attacks immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 1,
      "noteI18n": {
        "fr": "Faites apparaître 1 monstre errant avec l'app HeroQuest.",
        "en": "Spawn 1 wandering monster with the HeroQuest app."
      }
    }
  },
  {
    "id": "wandering-monster-02",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "Un souffle dans le couloir",
        "text": [
          "L’air se met à vibrer, comme un souffle retenu.",
          "Des pas pressés résonnent tout près… puis plus rien.",
          "Faites apparaître 2 monstres errants (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Les monstres attaquent immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "A Breath in the Hall",
        "text": [
          "The air trembles, like a held breath.",
          "Quick footsteps echo nearby… then vanish.",
          "Spawn 2 wandering monsters (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monsters attack immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 2,
      "noteI18n": {
        "fr": "Faites apparaître 2 monstres errants avec l'app HeroQuest.",
        "en": "Spawn 2 wandering monsters with the HeroQuest app."
      }
    }
  },
  {
    "id": "wandering-monster-03",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "Bruit de chaînes",
        "text": [
          "Un cliquetis métallique déchire le silence.",
          "Une silhouette surgit hors de la pénombre.",
          "Faites apparaître 1 monstre errant (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Le monstre attaque immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "Rattle of Chains",
        "text": [
          "A metallic rattle cuts through the silence.",
          "A shape lunges out of the gloom.",
          "Spawn 1 wandering monster (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monster attacks immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 1,
      "noteI18n": {
        "fr": "Faites apparaître 1 monstre errant avec l'app HeroQuest.",
        "en": "Spawn 1 wandering monster with the HeroQuest app."
      }
    }
  },
  {
    "id": "wandering-monster-04",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "L’ombre au coin de l’œil",
        "text": [
          "Tu crois voir une ombre bouger au coin de ton regard.",
          "Quand tu tournes la tête… elle est déjà sur toi !",
          "Faites apparaître 3 monstres errants (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Les monstres attaquent immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "Corner-of-the-Eye",
        "text": [
          "You catch a shadow moving at the edge of your sight.",
          "When you turn… it’s already upon you!",
          "Spawn 3 wandering monsters (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monsters attack immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 3,
      "noteI18n": {
        "fr": "Faites apparaître 3 monstres errants avec l'app HeroQuest.",
        "en": "Spawn 3 wandering monsters with the HeroQuest app."
      }
    }
  },
  {
    "id": "wandering-monster-05",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "Sous les gravats",
        "text": [
          "Une pierre roule, puis une autre.",
          "Quelque chose s’extirpe d’un tas de débris en grondant.",
          "Faites apparaître 4 monstres errants (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Les monstres attaquent immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "From the Rubble",
        "text": [
          "A stone shifts, then another.",
          "Something claws its way out of a pile of debris with a snarl.",
          "Spawn 4 wandering monsters (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monsters attack immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 4,
      "noteI18n": {
        "fr": "Faites apparaître 4 monstres errants avec l'app HeroQuest.",
        "en": "Spawn 4 wandering monsters with the HeroQuest app."
      }
    }
  },
  {
    "id": "wandering-monster-06",
    "icon": "👣",
    "tags": [
      "Wandering",
      "Spawn"
    ],
    "i18n": {
      "fr": {
        "title": "Un cri étouffé",
        "text": [
          "Un cri bref, étouffé, résonne derrière une porte.",
          "Puis un choc violent… et une présence surgit.",
          "Faites apparaître 2 monstres errants (voir notes de quête) sur une case adjacente ou diagonale au héros qui cherche.",
          "Les monstres attaquent immédiatement.",
          "Après l’attaque, le tour du héros continue normalement."
        ]
      },
      "en": {
        "title": "A Muffled Cry",
        "text": [
          "A short, muffled cry rings out behind a door.",
          "Then a heavy impact… and a presence bursts forth.",
          "Spawn 2 wandering monsters (see Quest Notes) on a square adjacent or diagonal to the searching hero.",
          "The monsters attack immediately.",
          "After the attack, the hero may continue their turn as normal."
        ]
      }
    },
    "wandering": {
      "count": 2,
      "noteI18n": {
        "fr": "Faites apparaître 2 monstres errants avec l'app HeroQuest.",
        "en": "Spawn 2 wandering monsters with the HeroQuest app."
      }
    }
  }
]; 
