var commonItemAttributes = {
  name: {
    key: "name",
    value: "",
    type: "textunique",
    required: true,
    tooltip: "How the entry is uniquely identified. Keep the name precise and clearly understood."
  },
  target: {
    key: "target",
    value: "",
    type: "dropdowndefined",
    dropdownItems: [
      "AoE", "Self", "Target", "Touch"
    ],
    required: true,
    tooltip: "Input must be an item from the dropdown.<br>The target of the spell or ability. If there is no target, it should probably be Self.<br><b>AoE:</b> will target all inside the Area of Effect; center is determined by Range.<br><b>Self:</b> only able to target self.<br><b>Target:</b> selectively target within Range.<b>Touch:</b> selectively target within Range of 5ft."
  },
  numTargets: {
    key: "number of targets",
    type: "number",
    value: "",
    required: false,
    tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>If a spell or ability has a specific number of targets, you can set it here.<br>If target is Self or AoE, leave blank."
  },
  range: {
    key: "range (ft)",
    type: "number",
    value: "",
    required: false,
    tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>If the Radius type is Beam, the Range indicates the length of a beam. Otherwise, Range may extends the spell or ability's center to that Range."
  },
  radius: {
    key: "radius (ft)",
    type: "number",
    value: "",
    required: false,
    tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>See Radius type for different Radius effects."
  },
  radiusType: {
    key: "radius type",
    type: "dropdowndefined",
    dropdownItems: [
      "Beam", "Cone", "Cylinder", "Sphere"
    ],
    value: "",
    required: false,
    tooltip: "Input must be an item from the dropdown.<br>Beam: Range long and Radius wide.<br>Cone: Radius long and Radius wide at end making a cone shape.<br>Cylinder: circle of Radius around target and infinite height.<br>Sphere: sphere of Radius around target."
  },
  damage: {
    key: "damage",
    type: "dicenumber",
    value: "",
    required: true,
    tooltip: "Entry can be a positive number or a dice number. A dice number looks like 2d6+4; meaning roll 2 six-sided dice and add 4 to the end result. The modifier can be (+, -, *, or /) and a number, and is not required.<br>Extra damage a weapon inflicts if it hits."
  },
  damageType: {
    key: "damage type",
    type: "dropdowndefined",
    dropdownItems: [
      "Acid", "Bludgeoning", "Cold", "Fire", "Force", "Lightning", "Piercing", "Poison", "Psychic", "Slashing", "Holy", "Unholy"
    ],
    value: "",
    required: true,
    tooltip: "Input must be an item from the dropdown.<br>Type of damage the weapon deals if it hits."
  },
  rarity: {
    key: "rarity",
    type: "dropdowndefined",
    dropdownItems: [
      "Common", "Uncommon", "Rare", "Legendary"
    ],
    value: "",
    required: true,
    tooltip: "Input must be an item from the dropdown.<br>The likelihood of coming across this item.<b>Common:</b> can be purchased at typical market.<br><b>Uncommon:</b> usually only found by adventuring.<br><b>Rare:</b> about 10x less common than Uncommon.<br><b>Legendary:</b> only the greatest of heroes find such an item."
  },
  description: {
    key: "description",
    value: "",
    type: "textarea",
    required: true,
    tooltip: "Input should clearly descripe the entry. Add any properties of the entry that were not already defined in other fields."
  },
  hiddenProperty: {
    key: "hidden property",
    value: "",
    type: "textarea",
    required: false,
    tooltip: "This property is only revealed when the item is used. If the item can be tested in certain ways, they can be listed here as well."
  },
  ammunitionType: {
    key: "type of ammunition",
    value: "",
    type: "dropdowndefined",
    dropdownItems: [
      "Arrow", "Bolt", "Bullet", "None"
    ],
    required: true,
    tooltip: "Input can be an item from the dropdown or a custom item.<br>Most ranged weapons require a particular ammunition type, as specified here."
  }
}

var itemTypesConfig = [
  {
    value: "ability",
    config: {
      title: {
        plural: "abilities",
        singular: "ability",
        tooltip: "Abilities are either passive or activated.  Passive abilities are either always occuring or activate upon given conditions.  Activated abilities require the player to activate them as an action.  Activated abilities usually have long cooldowns or require special circumstances."
      },
      // all input for create view
      input: [
        {
          key: commonItemAttributes.name.key,
          value: commonItemAttributes.name.value,
          type: commonItemAttributes.name.type,
          required: commonItemAttributes.name.required,
          tooltip: commonItemAttributes.name.tooltip
        },
        {
          key: "type of ability",
          value: "",
          type: "dropdowndefined",
          dropdownItems: [
            "Action", "Defense", "Movement", "Sense"
          ],
          required: true,
          tooltip: "Input must be an item from the dropdown.<br>Only certain types of abilities can be used in certain form entries."
        },
        {
          key: commonItemAttributes.target.key,
          value: commonItemAttributes.target.value,
          type: commonItemAttributes.target.type,
          dropdownItems: commonItemAttributes.target.dropdownItems,
          required: commonItemAttributes.target.required,
          tooltip: commonItemAttributes.target.tooltip
        },
        {
          key: commonItemAttributes.numTargets.key,
          value: commonItemAttributes.numTargets.value,
          type: commonItemAttributes.numTargets.type,
          required: commonItemAttributes.numTargets.required,
          tooltip: commonItemAttributes.numTargets.tooltip
        },
        {
          key: commonItemAttributes.range.key,
          value: commonItemAttributes.range.value,
          type: commonItemAttributes.range.type,
          required: commonItemAttributes.range.required,
          tooltip: commonItemAttributes.range.tooltip
        },
        {
          key: commonItemAttributes.radius.key,
          value: commonItemAttributes.radius.value,
          type: commonItemAttributes.radius.type,
          required: commonItemAttributes.radius.required,
          tooltip: commonItemAttributes.radius.tooltip
        },
        {
          key: commonItemAttributes.radiusType.key,
          value: commonItemAttributes.radiusType.value,
          type: commonItemAttributes.radiusType.type,
          dropdownItems: commonItemAttributes.radiusType.dropdownItems,
          required: commonItemAttributes.radiusType.required,
          tooltip: commonItemAttributes.radiusType.tooltip
        },
        {
          key: commonItemAttributes.description.key,
          value: commonItemAttributes.description.value,
          type: commonItemAttributes.description.type,
          required: commonItemAttributes.description.required,
          tooltip: commonItemAttributes.description.tooltip
        }
      ]
    }
  },
  {
    value: "item",
    config: {
      title: {
        plural: "items",
        singular: "item",
        tooltip: "Items are objects that can be carried and used by characters."
      },
      // all input for create view
      input: [
        {
          key: commonItemAttributes.name.key,
          value: commonItemAttributes.name.value,
          type: commonItemAttributes.name.type,
          required: commonItemAttributes.name.required,
          tooltip: commonItemAttributes.name.tooltip
        },
        {
          key: "weight (lbs)",
          type: "number",
          value: "",
          required: false,
          tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>For determining if carrier is overloaded. 0 Weight signifies that there is no burden for carrying the item."
        },
        {
          key: "value (gold)",
          type: "bignumber",
          value: "",
          required: false,
          tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>What the standard purchase price is of an item. However, items of 0 value cost 1, but sell for 0."
        },
        {
          key: "primary type",
          value: "",
          type: "dropdowndefined",
          dropdownItems: [
            "Ammunition", "Arcane", "Armor", "Consumable", "Gear", "Melee Weapon", "Miscellaneous", "Ranged Weapon", "Tool", "Valuable"
          ],
          required: true,
          tooltip: "Input must be an item from the dropdown.<br>Different items have different properties.",
          moreAttributes: {
            "Ammunition": [
              {
                key: "quantity for value",
                type: "number",
                value: "",
                required: false,
                tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>Number of this item you can purchase for the given Value."
              },
              {
                key: commonItemAttributes.ammunitionType.key,
                value: commonItemAttributes.ammunitionType.value,
                type: commonItemAttributes.ammunitionType.type,
                dropdownItems: commonItemAttributes.ammunitionType.dropdownItems,
                required: commonItemAttributes.ammunitionType.required,
                tooltip: commonItemAttributes.ammunitionType.tooltip
              }
            ],
            "Arcane": [
              {
                key: commonItemAttributes.rarity.key,
                value: commonItemAttributes.rarity.value,
                type: commonItemAttributes.rarity.type,
                dropdownItems: commonItemAttributes.rarity.dropdownItems,
                required: commonItemAttributes.rarity.required,
                tooltip: commonItemAttributes.rarity.tooltip
              },
              {
                key: commonItemAttributes.hiddenProperty.key,
                value: commonItemAttributes.hiddenProperty.value,
                type: commonItemAttributes.hiddenProperty.type,
                required: commonItemAttributes.hiddenProperty.required,
                tooltip: commonItemAttributes.hiddenProperty.tooltip
              }
            ],
            "Armor": [
              {
                key: "type of armor",
                value: "",
                type: "dropdowndefined",
                dropdownItems: [
                  "Cloth", "Light", "Medium", "Heavy", "Other", "Shield"
                ],
                required: true,
                tooltip: "Input must be an item from the dropdown.<br>Different armor types affect the wearer.<br><b>Cloth:</b> no effect.<br><b>Light:</b> Armor modifier + DEX<br><b>Medium:</b> Armor modifier + STR<br><b>Heavy:</b> Armor modifier + STR. Specify that there is a disadvantage Stealth check in the Description.<br><b>Other:</b> if not body armor. Specify which part of the body it covers in the Description.<br><b>Shield:</b> held in one hand."
              },
              {
                key: "armor modifier",
                type: "negnumber",
                value: "",
                required: false,
                tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>Added to defense against physical attacks. If hit by physical attack, hit roll is reduced by Armor amount. Can be negative."
              },
              {
                key: "dodge modifier",
                type: "negnumber",
                value: "",
                required: false,
                tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>Added to defense when dodge is specified.  Can be negative."
              },
              {
                key: "magic resist modifier",
                type: "negnumber",
                value: "",
                required: false,
                tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>Added to defense against magical attacks. If hit by magical attack, hit roll is reduced by Magic resist amount. Can be negative."
              }
            ],
            "Consumable": [
              {
                key: "type of consumable",
                value: "",
                type: "dropdowndefined",
                dropdownItems: [
                  "Ingredient", "Potion", "Scroll"
                ],
                required: true,
                tooltip: "Input must be an item from the dropdown.<br>Different items have different properties."
              },
              {
                key: commonItemAttributes.rarity.key,
                value: commonItemAttributes.rarity.value,
                type: commonItemAttributes.rarity.type,
                dropdownItems: commonItemAttributes.rarity.dropdownItems,
                required: commonItemAttributes.rarity.required,
                tooltip: commonItemAttributes.rarity.tooltip
              },
              {
                key: "locality of ingredient",
                value: "",
                type: "dropdowndefined",
                dropdownItems: [
                  "Hot and dry", "Wetlands and swamps", "Underground and caves", "Artificial", "Forests", "Plains", "Cold and icy", "Crypts and graveyards", "Underwater", "Volcanoes", "Magical areas", "In air", "Holy lands", "Demonic lands", "Mountains and rocks"
                ],
                required: false,
                tooltip: "Input must be an item from the dropdown.<br>In what conditions can you typically find this ingredient (if ingredient)."
              },
              {
                key: commonItemAttributes.hiddenProperty.key,
                value: commonItemAttributes.hiddenProperty.value,
                type: commonItemAttributes.hiddenProperty.type,
                required: commonItemAttributes.hiddenProperty.required,
                tooltip: commonItemAttributes.hiddenProperty.tooltip
              }
            ],
            "Gear": [],
            "Melee Weapon": [
              {
                key: "throw range",
                type: "number",
                value: "",
                required: false,
                tooltip: "Entry must be a number. Units (e.g. ft, lbs) should not be included.<br>Maximum range at which a weapon can be thrown to deal damage. Leave blank if weapon cannot be thrown."
              },
              {
                key: "property",
                value: "",
                type: "dropdowndefined",
                dropdownItems: [
                  "Heavy", "Light", "Two-Handed"
                ],
                required: false,
                tooltip: "Input must be an item from the dropdown.<br>Type of weapon.<br><b>Heavy:</b> Cannot dual wield, but can use a shield.<br><b>Light:</b> Can dual wield, and DEX modifier can be used instead of STR.<br><b>Two-Handed:</b> Requires both hands to use."
              },
              {
                key: commonItemAttributes.damage.key,
                value: commonItemAttributes.damage.value,
                type: commonItemAttributes.damage.type,
                required: commonItemAttributes.damage.required,
                tooltip: commonItemAttributes.damage.tooltip
              },
              {
                key: commonItemAttributes.damageType.key,
                value: commonItemAttributes.damageType.value,
                type: commonItemAttributes.damageType.type,
                dropdownItems: commonItemAttributes.damageType.dropdownItems,
                required: commonItemAttributes.damageType.required,
                tooltip: commonItemAttributes.damageType.tooltip
              },
              {
                key: "add damage type",
                value: "",
                type: "addAttribute",
                addAttribute: [
                  {
                    key: "Additional " + commonItemAttributes.damage.key,
                    value: commonItemAttributes.damage.value,
                    type: commonItemAttributes.damage.type,
                    required: commonItemAttributes.damage.required,
                    tooltip: commonItemAttributes.damage.tooltip
                  },
                  {
                    key: "Additional " + commonItemAttributes.damageType.key,
                    value: commonItemAttributes.damageType.value,
                    type: commonItemAttributes.damageType.type,
                    dropdownItems: commonItemAttributes.damageType.dropdownItems,
                    required: commonItemAttributes.damageType.required,
                    tooltip: commonItemAttributes.damageType.tooltip
                  }
                ],
                required: false,
                tooltip: "Add an additional damage type."
              }
            ],
            "Miscellaneous": [],
            "Ranged Weapon": [
              {
                key: commonItemAttributes.range.key,
                value: commonItemAttributes.range.value,
                type: commonItemAttributes.range.type,
                required: commonItemAttributes.range.required,
                tooltip: commonItemAttributes.range.tooltip
              },
              {
                key: commonItemAttributes.ammunitionType.key,
                value: commonItemAttributes.ammunitionType.value,
                type: commonItemAttributes.ammunitionType.type,
                dropdownItems: commonItemAttributes.ammunitionType.dropdownItems,
                required: commonItemAttributes.ammunitionType.required,
                tooltip: commonItemAttributes.ammunitionType.tooltip
              },
              {
                key: "property",
                value: "",
                type: "dropdowndefined",
                dropdownItems: [
                  "Two-Handed"
                ],
                required: false,
                tooltip: "Input must be an item from the dropdown.<br>Type of weapon.<br><b>Two-Handed:</b> Requires both hands to use."
              },
              {
                key: commonItemAttributes.damage.key,
                value: commonItemAttributes.damage.value,
                type: commonItemAttributes.damage.type,
                required: commonItemAttributes.damage.required,
                tooltip: commonItemAttributes.damage.tooltip
              },
              {
                key: commonItemAttributes.damageType.key,
                value: commonItemAttributes.damageType.value,
                type: commonItemAttributes.damageType.type,
                dropdownItems: commonItemAttributes.damageType.dropdownItems,
                required: commonItemAttributes.damageType.required,
                tooltip: commonItemAttributes.damageType.tooltip
              },
              {
                key: "add damage type",
                value: "",
                type: "addAttribute",
                addAttribute: [
                  {
                    key: "Additional " + commonItemAttributes.damage.key,
                    value: commonItemAttributes.damage.value,
                    type: commonItemAttributes.damage.type,
                    required: commonItemAttributes.damage.required,
                    tooltip: commonItemAttributes.damage.tooltip
                  },
                  {
                    key: "Additional " + commonItemAttributes.damageType.key,
                    value: commonItemAttributes.damageType.value,
                    type: commonItemAttributes.damageType.type,
                    dropdownItems: commonItemAttributes.damageType.dropdownItems,
                    required: commonItemAttributes.damageType.required,
                    tooltip: commonItemAttributes.damageType.tooltip
                  }
                ],
                required: false,
                tooltip: "Add an additional damage type."
              }
            ],
            "Tool": [],
            "Valuable": [
              {
                key: commonItemAttributes.rarity.key,
                value: commonItemAttributes.rarity.value,
                type: commonItemAttributes.rarity.type,
                dropdownItems: commonItemAttributes.rarity.dropdownItems,
                required: commonItemAttributes.rarity.required,
                tooltip: commonItemAttributes.rarity.tooltip
              }
            ]
          }
        },
        {
          key: commonItemAttributes.description.key,
          value: commonItemAttributes.description.value,
          type: commonItemAttributes.description.type,
          required: commonItemAttributes.description.required,
          tooltip: commonItemAttributes.description.tooltip
        }
      ]
    }
  },
  {
    value: "skill",
    config: {
      title: {
        plural: "skills",
        singular: "skill",
        tooltip: "Skills are active actions that a player/creature can perform. This is usually done outside of combat. Skill success is determined by a d20 roll against a DM defined difficulty. Skills have modifiers that can modify the d20 roll."
      },
      // all input for create view
      input: [
        {
          key: commonItemAttributes.name.key,
          value: commonItemAttributes.name.value,
          type: commonItemAttributes.name.type,
          required: commonItemAttributes.name.required,
          tooltip: commonItemAttributes.name.tooltip
        },
        {
          key: "attribute",
          value: "",
          type: "dropdowndefined",
          dropdownItems: [
            "STR", "DEX", "INF", "WIS"
          ],
          required: true,
          tooltip: "Input must be an item from the dropdown.<br>Must be one of the four attributes. Attributes determine what skills can be increased and raw skill when needed.<br><b>STR (Strength):</b> Affects maximum health and weapon damage.<br><b>DEX (Dexterity):</b> Affects dodge modifier and hit chance.<br><b>INF (Influence):</b> Affects most spell casting and charisma.<br><b>WIS (Wisdom):</b> Affects overall perception of a character."
        },
        {
          key: "type",
          type: "dropdownsuggested",
          dropdownItems: [
            "Core", "Special"
          ],
          value: "",
          required: true,
          tooltip: "Input can be an item from the dropdown or a custom item.<br>CORE skills are common rules that any character can start with. You may create other skills, but the use of such is still TBD."
        },
        {
          key: commonItemAttributes.description.key,
          value: commonItemAttributes.description.value,
          type: commonItemAttributes.description.type,
          required: commonItemAttributes.description.required,
          tooltip: commonItemAttributes.description.tooltip
        }
      ]
    }
  },
  {
    value: "spell",
    config: {
      title: {
        plural: "spells",
        singular: "spell",
        tooltip: "Spells are actions that a player/creature can perform by consuming mana. Spells are aquired by different classes at certain levels."
      },
      // all input for create view
      input: [
        {
          key: commonItemAttributes.name.key,
          value: commonItemAttributes.name.value,
          type: commonItemAttributes.name.type,
          required: commonItemAttributes.name.required,
          tooltip: commonItemAttributes.name.tooltip
        },
        {
          key: "level",
          type: "number",
          value: "",
          required: true,
          tooltip: "Entry must be a number.<br>Before a spell of a given level can be used, a character must meet that requirement for his Class or Race. Higher level spells are usually more powerful."
        },
        {
          key: "mana cost",
          type: "number",
          value: "",
          required: false,
          tooltip: "Entry must be a number.<br>Spells consume mana; powerful spells that deal heavy damage cost high mana, whereas bursty spells cost little mana. Mana is slowly regenerated."
        },
        {
          key: "cast type",
          type: "dropdowndefined",
          dropdownItems: [
            "Action", "Ritual"
          ],
          value: "",
          required: true,
          tooltip: "Input must be an item from the dropdown.<br><b>Action:</b> Cast Time is in actions points.<br><b>Ritual: Cast time is in minutes.</b>"
        },
        {
          key: "cast time",
          type: "number",
          value: "",
          required: true,
          tooltip: "Entry must be a number.<br>See Cast Type for cast time units (either action points or minutes).<br>Enter 0 if instant cast time."
        },
        {
          key: "name",
          value: "",
          type: "textarea",
          required: false,
          tooltip: "Certain spells require special components before being cast (usually rituals). You may provide a list of requirements here."
        },
        {
          key: "duration type",
          type: "dropdowndefined",
          dropdownItems: [
            "Instant", "Encounter", "Turns", "Minutes", "Hours", "Days", "Years"
          ],
          value: "",
          required: true,
          tooltip: "Input must be an item from the dropdown.<br><b>Instant:</b> Either the spell has immediate results or the spell's effects are permanent.<br><b>Encounter:</b> Lasts as long as an encounter.<br><b>Turns:</b> Meaning a round of turns."
        },
        {
          key: "duration time",
          type: "number",
          value: "",
          required: true,
          tooltip: "Entry must be a number.<br>See Duration Type for duration time units.<br>Enter 0 if no duration (instant or permanent)."
        },
        {
          key: commonItemAttributes.target.key,
          value: commonItemAttributes.target.value,
          type: commonItemAttributes.target.type,
          dropdownItems: commonItemAttributes.target.dropdownItems,
          required: commonItemAttributes.target.required,
          tooltip: commonItemAttributes.target.tooltip
        },
        {
          key: commonItemAttributes.numTargets.key,
          value: commonItemAttributes.numTargets.value,
          type: commonItemAttributes.numTargets.type,
          required: commonItemAttributes.numTargets.required,
          tooltip: commonItemAttributes.numTargets.tooltip
        },
        {
          key: commonItemAttributes.range.key,
          value: commonItemAttributes.range.value,
          type: commonItemAttributes.range.type,
          required: commonItemAttributes.range.required,
          tooltip: commonItemAttributes.range.tooltip
        },
        {
          key: commonItemAttributes.radius.key,
          value: commonItemAttributes.radius.value,
          type: commonItemAttributes.radius.type,
          required: commonItemAttributes.radius.required,
          tooltip: commonItemAttributes.radius.tooltip
        },
        {
          key: commonItemAttributes.radiusType.key,
          value: commonItemAttributes.radiusType.value,
          type: commonItemAttributes.radiusType.type,
          dropdownItems: commonItemAttributes.radiusType.dropdownItems,
          required: commonItemAttributes.radiusType.required,
          tooltip: commonItemAttributes.radiusType.tooltip
        },
        {
          key: commonItemAttributes.damage.key,
          value: commonItemAttributes.damage.value,
          type: commonItemAttributes.damage.type,
          required: false,
          tooltip: commonItemAttributes.damage.tooltip
        },
        {
          key: commonItemAttributes.damageType.key,
          value: commonItemAttributes.damageType.value,
          type: commonItemAttributes.damageType.type,
          dropdownItems: commonItemAttributes.damageType.dropdownItems,
          required: false,
          tooltip: commonItemAttributes.damageType.tooltip
        },
        {
          key: "add damage type",
          value: "",
          type: "addAttribute",
          addAttribute: [
            {
              key: commonItemAttributes.damage.key,
              value: commonItemAttributes.damage.value,
              type: commonItemAttributes.damage.type,
              required: false,
              tooltip: commonItemAttributes.damage.tooltip
            },
            {
              key: commonItemAttributes.damageType.key,
              value: commonItemAttributes.damageType.value,
              type: commonItemAttributes.damageType.type,
              dropdownItems: commonItemAttributes.damageType.dropdownItems,
              required: false,
              tooltip: commonItemAttributes.damageType.tooltip
            }
          ],
          required: false,
          tooltip: "Add an additional damage type."
        },
        {
          key: commonItemAttributes.description.key,
          value: commonItemAttributes.description.value,
          type: commonItemAttributes.description.type,
          required: commonItemAttributes.description.required,
          tooltip: commonItemAttributes.description.tooltip
        }
      ]
    }
  }
];


module.exports = function(app, pool, STATICS, bodyParser, itemTypes) {
  function isValidItemType(itemType) {
    return itemTypes.indexOf(itemType) >= 0;
  }

  function fixRowAttributes(rows, itemType) {
    var rowI, row;
    for (rowI = 0; rowI < rows.length; rowI++) {
      row = rows[rowI];

      deleteKey(row, 'rpg');
      renameKey(row, 'targetNum', 'number of targets');
      renameKey(row, 'range', 'range (ft)');
      renameKey(row, 'radius', 'radius (ft)');
      renameKey(row, 'radiusType', 'radius type');

      if (itemType === 'ability') {
        renameKey(row, 'type', 'type of ability');
      }
    }
  }

  /**
   * CITE: http://stackoverflow.com/questions/4647817/javascript-object-rename-key
   */
  function renameKey(obj, oldKey, newKey) {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }

  function deleteKey(obj, key) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }

  /**
   * API: GET ITEM TYPES
   */
  app.get(STATICS.routes.getItemTypes, function(req, res) {
    var i, data = [];

    for (i = 0; i < itemTypes.length; i++) {
      data.push({
        value: itemTypes[i]
      });
    }
    res.send(data);
  });

  /**
   * API: GET SELECTED ITEM TYPES
   */
  app.get(STATICS.routes.getSelectedItemType + "/:itemType", function(req, res) {
    var i,
        itemType = req.params.itemType;

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    for (i = 0; i < itemTypesConfig.length; i++) {
      if (itemTypesConfig[i].value === itemType) {
        res.send(itemTypesConfig[i].config);
        return;
      }
    }
    res.status(500).send("No item type config for specified item type.");
  });

  /**
   * API: GET ITEMS OF TYPE
   */
  app.get(STATICS.routes.getAllItemsOfType + "/:itemType", function(req, res) {
    var i,
        itemType = req.params.itemType;

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        console.error("ERROR: Connection could not be established.\n");
        res.status(500).send('Could not connect to the database.');
        if (connection) {
          connection.release();
        }
        return;
      }
      // get the test notification numbers from the db
      connection.query('SELECT * FROM ' + itemType, function(err, rows, fields) {
        if (!rows || !rows.length) {
          res.send([]);
          connection.release();
          return;
        }
        fixRowAttributes(rows, itemType);
        res.send(rows);
        connection.release();
      });
    });
  });
};