"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var person = (function () {
  function person(options) {
    _classCallCheck(this, person);

    this.fname = options.fname;
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
  }

  _createClass(person, {
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
    equipMagic: {
      value: function equipMagic(magic) {
        this.magic = magic;
        this.fullMagical = this.baseMagical + magic.damage;
      }
    },
    takeDamage: {
      value: function takeDamage(damage) {
        this.currentLife -= damage;
        if (this.currentLife <= 0) {
          this.loseFight();
        }
      }
    },
    beginFight: {
      value: function beginFight(enemy) {
        if (this.oponnent != null) {
          this.opponent = null;
        }
        this.opponent = enemy;
      }
    },
    winFight: {
      value: function winFight() {
        var enemy = this.opponent.title;
        this.opponent = null;
        console.log(enemy + " is dead! You circle around its lifeless corpse in an arrogant victory dance. Please stop shaking your rump.");
      }
    },
    loseFight: {
      value: function loseFight() {
        var enemy = this.opponent.title;
        this.opponent = null;
        console.log(enemy + " has killed you. Now it will take you home and stuff you, using you as a decoration.");
      }
    },
    physicalAttack: {
      value: function physicalAttack() {
        this.opponent.life -= this.fullMagical;
        if (this.opponent.life <= 0) {
          this.winFight();
        }
      }
    },
    castSpell: {
      value: function castSpell() {
        this.opponent.life -= this.fullMagical;
        if (this.opponent.life <= 0) {
          this.winFight();
        }
      }
    },
    render: {
      value: function render() {
        console.log(this);
      }
    }
  });

  return person;
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
    render: {
      value: function render() {
        console.log(this);
      }
    }
  });

  return magic;
})();

var enemy = function enemy(options) {
  _classCallCheck(this, enemy);

  this.title = options.title;
  this.fullLife = options.fullLife;
  this.life = options.life;
  this.damage = options.damage;
};

var sword = new weapon({
  title: "Sword",
  damage: 5,
  defense: 7,
  agility: 6
});

var thandion = new person({
  fname: "Thandion",
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
  weapon: "hand"
});

var speed = new magic({
  title: "Speed",
  damage: 4
});

var gorlak = new enemy({
  title: "Gorlak",
  damage: 3,
  life: 30,
  fullLife: 30
});
