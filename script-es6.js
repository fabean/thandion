// types of things you can have

// character
// weapon
// magic
// inventory
//

class character {
  constructor(options) {
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
    this.baseSubterfuge = options.baseSubterfuge;
    this.basePerception = options.basePerception;
    this.baseMagical = options.baseMagical;
    this.fullLife = options.fullLife;
    this.currentLife = options.currentLife;
    this.experience = options.experience;
    this.weapon = options.weapon;
    this.level = options.level,
    this.levelUp = options.levelUp
    this.render();
  }

  unequipWeapon() {
    this.strength = this.baseStrength;
    this.weapon = 'hand';
    this.render();
  }

  equipWeapon(weapon) {
    this.weapon = weapon.title;
    this.strength = this.baseStrength + weapon.damage;
    this.render();
  }

  equipMagic(magic){
    this.magic = magic;
    this.fullMagical = this.baseMagical + magic.damage;
    this.render();
  }

  takeDamage(damage) {
    this.currentLife -= damage;
    if(this.currentLife <=0){
      this.loseFight();
    }
    this.render();
  }

  beginFight(enemy){
    if(this.oponnent != null){
      this.opponent = null;
    }
    this.opponent = enemy;
    this.render();
  }

  winFight(){
    let enemy = this.opponent.title;
    this.opponent = null;
    console.log(enemy + " is dead! You circle around its lifeless corpse in an arrogant victory dance. Please stop shaking your rump.");
  }

  loseFight(){
    let enemy = this.opponent.title;
    this.opponent = null;
    console.log(enemy + " has killed you. Now it will take you home and stuff you, using you as a decoration.");
  }

  physicalAttack(){
    this.opponent.life -= this.fullMagical;
    if(this.opponent.life <= 0){
      this.winFight();
    }
    this.render();
  }

  castSpell(spell){
    this.takeDamage(spell.selfDamage);
    this.render();
    // this.opponent.life -= this.fullMagical;
    // if(this.opponent.life <= 0){
    //   this.winFight();
    // }
  }

  render() {
    let output = document.getElementById('character');
    output.innerHTML = `<h3 class="title">${this.cname}</h3>`
    for (let i in this) {
      if (i !== 'cname') {
        output.innerHTML += `${i}: ${String(this[i])} <br/>`;
      }
      console.log(`${i}: ${this[i]}`);
    }
  }
  // window.currentCharacter = this;

}

class weapon {
  constructor(options) {
    this.title = options.title;
    this.damage = options.damage;
    this.defense = options.defense;
    this.agility = options.agility;

    this.render();
  }

  render() {
    let output = document.getElementById('weapon');

    output.innerHTML = `<h3 class="title">${this.title}</h3>`
    for (let i in this) {
      if (i !== 'title') {
        output.innerHTML += `${i}: ${this[i]} <br/>`;
      }
      console.log(`${i}: ${this[i]}`);
    }
    output.innerHTML += `<button class="action" onClick="window.currentCharacter.equipWeapon(${this.title.toLocaleLowerCase()})">Equip ${this.title}</button>`;
    output.innerHTML += `<button class="action" onClick="window.currentCharacter.unequipWeapon(${this.title.toLocaleLowerCase()})">Unequip ${this.title}</button>`;
  }
}

class magic {
  constructor(options) {
    this.title = options.title;
    this.selfDamage = options.selfDamage;
    this.damage = options.damage;

    this.render();
  }

  use() {

  }

  render() {
    let output = document.getElementById('magic');
    output.innerHTML += `<h3 class="title">${this.title}</h3>`
    for (let i in this) {
      if (i !== 'title') {
        output.innerHTML += `${i}: ${this[i]} <br/>`;
      }
      console.log(`${i}: ${this[i]}`);
    }
    output.innerHTML += `<button class="action" onClick="window.currentCharacter.castSpell(${this.title.toLocaleLowerCase()})">Use ${this.title}</button>`;
  }
}

class enemy {
  constructor(options){
    this.title = options.title;
    this.fullLife = options.fullLife;
    this.life = options.life;
    this.damage = options.damage;
  }
}

let sword = new weapon({
  title: 'Sword',
  damage: 5,
  defense: 7,
  agility: 6
});

let thandion = new character({
  cname: 'Thandion',
  race: 'Elf',
  clique: 'Bard',
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
  weapon: 'hand',
  level: 4,
  levelUp: 150
});

let speed = new magic({
  title: 'Speed',
  selfDamage: 4
});

let gorlak = new enemy({
  title: 'Gorlak',
  damage: 3,
  life: 30,
  fullLife: 30
});


(function init() {
  window.currentCharacter = thandion;

  let showMagic = document.getElementById('show-new-magic');
  let showWeapon = document.getElementById('show-new-weapon');

  showMagic.addEventListener('click', function(){
    document.getElementById('magic-creator').classList.remove('hidden');
  }, true);
  showWeapon.addEventListener('click', function(){
    document.getElementById('weapon-creator').classList.remove('hidden');
  }, true);


  let createWeapon = document.getElementById('create-weapon');
  createWeapon.addEventListener('click', createNewWeapon, false);

  let createMagic = document.getElementById('create-magic');
  createMagic.addEventListener('click', createNewMagic, false);

})();


function createNewMagic() {
  console.log('in create new magic');
  let newMagicForm = [].slice.call(document.getElementById('magic-creator').getElementsByTagName('input'), 0);

  let title = newMagicForm[0].value;
  let selfDamage = newMagicForm[1].value;
  console.log(title);

  let newMagic = new magic({
    title: title,
    selfDamage: selfDamage
  });
}

function createNewWeapon() {

}
