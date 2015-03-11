"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// types of things you can have

// character
// weapon
// magic
// inventory
//

var character = (function () {
  function character(options) {
    _classCallCheck(this, character);

    this.cname = options.cname;
    this.race = options.race;
    this.clique = options.clique;
    this.baseStrength = options.baseStrength;
    this.baseAgility = options.baseAgility;
    this.baseIntelligence = options.baseIntelligence;
    this.baseMovement = options.baseMovement;
    this.baseDefense = options.baseDefense;
    this.baseMeleeOB = options.baseMeleeOB;
    this.baseMissileOB = options.baseMissileOB;
    this.baseGeneral = options.baseGeneral;
    this.baseSubterfuge = options.baseBubterfuge;
    this.basePerception = options.basePerception;
    this.baseMagical = options.baseMagical;
    this.fullLife = options.fullLife;
    this.currentLife = options.currentLife;
    this.experience = options.experience;
    this.weapon = options.weapon;
    this.level = options.level, this.levelUp = options.levelUp;
  }

  _createClass(character, {
    unequipWeapon: {
      value: function unequipWeapon() {
        this.strength -= this.weapon.damage;
        this.weapon = "hand";
      }
    },
    equipWeapon: {
      value: function equipWeapon(weapon) {
        this.weapon = weapon;
        this.strength = this.baseStrength + weapon.damage;
      }
    },
    takeDamage: {
      value: function takeDamage(damage) {
        this.currentLife -= damage;
      }
    },
    render: {
      value: function render() {
        for (var i in this) {
          console.log("" + i + ": " + this[i]);
        }
      }
    }
  });

  return character;
})();

var weapon = (function () {
  function weapon(options) {
    _classCallCheck(this, weapon);

    this.title = options.title;
    this.damage = options.damage;
    this.defense = options.defense;
    this.agility = options.agility;

    this.render();
  }

  _createClass(weapon, {
    render: {
      value: function render() {
        console.log(this);
      }
    }
  });

  return weapon;
})();

var magic = (function () {
  function magic(options) {
    _classCallCheck(this, magic);

    this.title = options.title;
    this.damage = options.damage;
  }

  _createClass(magic, {
    use: {
      value: function use() {}
    },
    render: {
      value: function render() {
        console.log(this);
      }
    }
  });

  return magic;
})();

var sword = new weapon({
  title: "Sword",
  damage: 5,
  defense: 7,
  agility: 6
});

var thandion = new character({
  cname: "Thandion",
  race: "Elf",
  clique: "Bard",
  baseStrength: 1,
  baseAgility: 1,
  baseIntelligence: 3,
  baseMovement: 1,
  baseDefense: 1,
  baseMeleeOB: 0,
  baseMissileOB: 1,
  baseGeneral: 1,
  baseSubterfuge: 0,
  basePerception: 2,
  baseMagical: 1,
  fullLife: 40,
  currentLife: 40,
  experience: 0,
  weapon: "hand",
  level: 4,
  levelUp: 150
});

var speed = new magic({
  title: "Speed",
  damage: 4
});
