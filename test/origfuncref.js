/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, unparam: true, node: true */
'use strict';

var cli = require('cli'),
  ssap = require('./super-smartass-plugins.js');
cli.ok('Loaded super-smartass-plugins.');

console.log('Switching to nosync mode:');
require('../nosync.js');
cli.ok('Loaded nosync.');


function logKeys(obj) {
  var keys = Object.keys(obj);
  keys.sort();
  keys = keys.join(', ');
  if (keys.length > 72) { keys = keys.substr(0, 70) + ' …'; }
  console.log('  keys:  ' + keys);
}


function tryLoadSync(modName, smartassy, guessExist) {
  console.log('\nTrying to ' +
    (smartassy ? 'smartass-load' : 'require()') + ' some probably ' +
    (guessExist ? 'existing' : 'missing') + ' module "' + modName + '":');
  try {
    if (smartassy) {
      ssap.using(modName, logKeys);
      if ('number' === typeof ssap.previouslyUsedPluginSize) {
        cli.error('Did ssap just read some module source file sync?!');
      }
    } else {
      logKeys(require(modName));
    }
    cli.error('Was "' + modName + '" just loaded sync?!');
  } catch (loadErr) {
    cli.ok('Failed to sync-load "' + modName + '": ' + String(loadErr));
  }
}


function testsInSomeFutureTick() {
  console.log('Timer triggered, start testing!');
  tryLoadSync('express',        true,   true);
  tryLoadSync('underscore',     false,  true);
  tryLoadSync('ai-singularity', true,   false);
}


console.log('Setting up timer for testing in some future tick:');
setTimeout(testsInSomeFutureTick, 10);
cli.ok('Timer set.');
