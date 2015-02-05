// start the app
(function start(){
  var addButton = document.getElementById('submit');
  addButton.addEventListener("click", evaluateInput, true);
  var saveButton = document.getElementById('save');
  saveButton.addEventListener("click", saveCharacter, true);
  window.character = JSON.parse(window.localStorage.getItem('character'));
  if (window.character === null) {
    window.character = {};
    firstLaunch();
  } else {
    initRender();
  }
})();

// first launch figure out if they want wizard or not
function firstLaunch() {
  var overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  var yesButton = document.getElementById('yes');
  yesButton.addEventListener("click", launchWizard, false);
  var noButton = document.getElementById('no');
  noButton.addEventListener("click", initRender, false);
}

// first launch wizard
function launchWizard() {
  document.getElementById('firstprompt').classList.add('hidden');
  var sC = {
    'name': {
      'type': 'text',
      'value': 'What is the name of your character?',
      'title': 'name'
    },
    'class': {
      'type': 'text',
      'value': 'Class or race',
      'title': 'class'
    },
    'level': {
      'type': 'number',
      'value': '1',
      'title': 'level'
    }
  };
  for (var i in sC) {
    console.log(sC);
    // render out these things and make it pretty
    body = document.getElementById('overlay');
    output = '<div class="set ' + i + '" id="row-' + i + '" draggable="true">';
    output += '<label for="' + i +'">' + i + '</label>';
    if (sC[i].type === 'textarea') {
      output += '<textarea id="' + i + '" rows="10" cols="50" class="attribute">' + sC[i].value + '</textarea>';
    } else {
      output += '<input id="' + i + '" value="' + sC[i].value + '" type="' + sC[i].type + '"  class="attribute"/>';
    }
    output += '</div>';
    body.innerHTML += output;
  }
}

// make sure inputs are filled out and send them to be added to character
function evaluateInput() {
  aKey = document.getElementById('key').value.toLowerCase().replace(/\s+/g, '_'); // lowercase and remove spaces for keys
  aVal = document.getElementById('value').value;
  radioButtons = [].slice.call(document.getElementById('radio').getElementsByTagName('input'), 0);
  for (var r in radioButtons) {
    if (radioButtons[r].checked) {
      inputType = radioButtons[r].classList[0];
    }
  }
  if (aKey === '' || aVal === '') {
    alert('you did not fill it out');
  } else {
    addToObject(aKey,aVal,inputType);
  }
}

// add new attributes to the character object
function addToObject(aKey,aVal,inputType) {
  window.character[aKey] = {
    'title': aKey,
    'type': inputType,
    'value': aVal
  };
  save();
  clearInput();
  renderCharacter();
}

// get things ready for first render
function initRender() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('character').classList.remove('hidden');
  document.getElementById('input').classList.remove('hidden');
  renderCharacter();
}

// find out what needs to be rendered and render it
function renderCharacter() {
  c = window.character;
  for (var p in window.character) {
    var el = document.getElementById(p);
    if (el === null) { // if element isn't there we render it out
      body = document.getElementById('output');
      output = '<div class="set ' + p + '" id="row-' + p + '" draggable="true">';
      output += '<label for="' + p +'">' + p + '</label>';
      if (c[p].type === 'textarea') {
        output += '<textarea id="' + p + '" rows="10" cols="50" class="attribute">' + c[p].value + '</textarea>';
      } else {
        output += '<input id="' + p + '" value="' + c[p].value + '" type="' + c[p].type + '"  class="attribute"/>';
      }
      output += '<span class="delete" id="delete-' + p + '">x</span></div>';
      body.innerHTML += output;
    } else { // already exists just update the fields
      el.value = c[p].value;
      el.type = c[p].type;
    }
  }
  var deleteButton = [].slice.call(document.getElementsByClassName('delete'), 0);
  for (var d in deleteButton) {
    deleteButton[d].addEventListener("click", deleteAttribute, false);
  }
}

// when adding new attributes clear out the inputs
function clearInput() {
  var input = [].slice.call(document.getElementById('input').getElementsByTagName('input'), 0);
  for (var el in input) {
    input[el].value = '';
  }
}

// delete the attribute and remove it from the object
function deleteAttribute(el) {
  var clickedId = el.target.id.split('-')[1];
  document.getElementById('row-' + clickedId).remove();
  delete window.character[clickedId];
  save();
}

// go through and save all the changes
function saveCharacter() {
  characterValues = [].slice.call(document.getElementById('output').getElementsByClassName('attribute'), 0);
  for (var cV in characterValues) {
    window.character[characterValues[cV].id] = {
      'title': characterValues[cV].id,
      'type': characterValues[cV].type,
      'value': characterValues[cV].value
    };
  }
  save();
}

// simply take current object and save it.
function save() {
  window.localStorage.setItem('character', JSON.stringify(window.character));
}

// TODO setup wizard
// TODO advanced settings to say things like you level up every 150 points
// TODO be able to change labels
// TODO set limits for fields that are editable on a later date
// TODO history or just a simple undo option
// TODO button to use things like spells
// TODO linking damage and endurance to eachother is going to take some critical thinking. This is all hard because I'm wanting user to be able to input all of this and this code take whatever is given to it.

/*
what object should look like

character: {
  'spell': {
    'title': 'spell',
    'type': 'multiple', // ?
    'value': {
      'speed': {
        'type': 'action', // this makes is usable?
        'title': 'speed',
        'dependant': {
          'id': 'damage',
          'operation': '+',
          'amount': 4
        }
      },
      'charm': {
        type': 'action', // this makes is usable?
        'title': 'charm',
        'dependant': {
          'id': 'damage',
          'operation': '+',
          'amount': 5
        }
      }
    }
  },
  'damage': {
    'title': 'damage',
    'type': 'number',
    'value': 20,
    'dependant': {
      'id': 'endurance',
      'operation': '%', // how the heck will I do this?
    }
  },
  'endurance': {
    'title': 'endurance',
    'type': 'number',
    'value': 42
  }
}
*/
