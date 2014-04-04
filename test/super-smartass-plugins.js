/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, unparam: true, node: true */
'use strict';

var ssap = {
  name:     'super smart-ass plugin loader',
  loadMod:  require
};

ssap.findMod = ssap.loadMod.resolve;

/*jslint stupid:true */
ssap.readFile = require('fs').readFileSync;
/*jslint stupid:false */

ssap.previouslyUsedPluginSize = null;

ssap.using = function unsingSmartassPlugin(pgnName, cleverFunc) {
  var pgnFile, pgnSize, pgnPreview, pgnModule;
  console.log(ssap.name + ' preparing to load ' + pgnName + '!!');

  try {
    pgnFile = ssap.findMod(pgnName);
  } catch (resolveErr) {
    pgnFile = null;
  }
  console.log('  file: ' + String(pgnFile || '??'));

  if (pgnFile) {
    try {
      pgnFile = String(ssap.readFile(pgnFile));
      pgnSize = pgnFile.length;
      pgnPreview = 'chars: ' + JSON.stringify(pgnFile.substr(0, 50)) + '…';
    } catch (measureErr) {
      pgnSize = null;
      pgnPreview = '(failed to read)';
    }
  } else {
    pgnSize = null;
    pgnPreview = '(no file)';
  }
  ssap.previouslyUsedPluginSize = pgnSize;
  console.log('  size: ' + String(pgnSize) + ' ' + pgnPreview);

  pgnModule = ssap.loadMod(pgnName);
  console.log(ssap.name + ' haz loaded teh ' + pgnName + '!!');
  return cleverFunc(pgnModule);
};

module.exports = ssap;
