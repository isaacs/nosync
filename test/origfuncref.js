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


function tryLoadSync(smartassy, assumedProp, modName) {
  console.log('\nTrying to ' +
    (smartassy ? 'smartass-load' : 'require()') + ' some probably ' +
    assumedProp + ' module "' + modName + '":');
  try {
    if (smartassy) {
      ssap.using(modName, logKeys);
      if ('number' === typeof ssap.previouslyUsedPluginSize) {
        cli.error('Did ssap just read some module source file sync?!');
      }
    } else {
      logKeys(require(modName));
    }
    if (assumedProp === 'pre-loaded') {
      cli.ok('Successfully sync-loaded "' + modName + '" from cache');
    } else {
      cli.error('Was "' + modName + '" just loaded sync?!');
    }
  } catch (loadErr) {
    if (assumedProp === 'pre-loaded') {
      cli.error('Failed to sync-loaded "' + modName + '" from cache');
    } else {
      cli.ok('Failed to sync-load "' + modName + '": ' + String(loadErr));
    }
  }
}


function testsInSomeFutureTick() {
  console.log('Timer triggered, start testing!');
  tryLoadSync(true,   'existing',   './forever-unrequired.js');
  tryLoadSync(true,   'existing',   'express');
  tryLoadSync(false,  'existing',   'underscore');
  tryLoadSync(true,   'missing',    'ai-singularity');
  tryLoadSync(true,   'pre-loaded', '../nosync.js');
  tryLoadSync(false,  'pre-loaded', 'cli');
}


console.log('Setting up timer for testing in some future tick:');
setTimeout(testsInSomeFutureTick, 10);
cli.ok('Timer set.');
