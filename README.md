# thandion (need a real name)
A tabletop RPG character tracker

This is just starting out but it is actually functional, which is nice.

The point of this is to make a full featured character builder/tracker that can be used in any RPG.

You simply fill out what you want to track and what it's value is and you're good to go.

List of TODOS
* TODO setup wizard
* TODO advanced settings to say things like you level up every 150 points
* TODO be able to change labels
* TODO set limits for fields that are editable on a later date
* TODO history or just a simple undo option
* TODO button to use things like spells

sample object
```
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
```
