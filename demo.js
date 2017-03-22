require('debug').enable('*');
var debug = require('debug')('codemirror-mongodb');

var CodeMirror = require('codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/edit/matchbrackets.js');

// require('codemirror/addon/hint/javascript-hint.js');

require('./lib/mongodb-hint');

var oneliner = CodeMirror.fromTextArea(document.getElementById('oneliner'), {
  lineNumbers: false, // hide line numbers from gutter
  scrollbarStyle: 'null', // completely hide scollbars
  mode: 'javascript',
  autoCloseBrackets: true,
  matchBrackets: true,
  theme: 'mongodb',
  extraKeys: {
  //  "'$'": showQueryOperatorHints,
    'Ctrl-Space': 'autocomplete'
  }
});

oneliner.on('beforeChange', function(cm, change) {
  debug('oneliner beforeChange', change);
  if (change.update) {
    debug('oneliner stripping newlines before applying change');
    var newtext = change.text.join('').replace(/\n/g, '');
    change.update(change.from, change.to, [newtext]);
  }
  return true;
});
