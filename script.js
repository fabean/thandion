// start the app
(function start(){
  var addButton = document.getElementById('submit');
  addButton.addEventListener("click", evaluateInput, true);
  var saveButton = document.getElementById('save');
  saveButton.addEventListener("click", saveCharacter, true);
  window.character = JSON.parse(window.localStorage.getItem('character'));
  if (window.character === null) {
    window.character = {};
  } else {
    render();
  }
})();

// make sure inputs are filled out and send them to be added to character
function evaluateInput() {
  aKey = document.getElementById('key').value.toLowerCase();
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
  render();
}

// find out what needs to be rendered and render it
function render() {
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
// TODO make all things lowercase and underscore
