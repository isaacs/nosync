/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, unparam: true, node: true */
'use strict';

var cli = require('cli'), ssap, tests = { info: console.log,
  ok:     function (msg) { this.cntOk += 1; cli.ok(msg); },
  err:    function (msg) { this.cntErr += 1; cli.error(msg); },
  cntOk:  0,  expectOk:   10,
  cntErr: 0,  expectErr:  0,
  };


tests.ok('Loading some really smartass plugins manager:');
ssap = require('./super-smartass-plugins.js');
tests.ok('Loaded super-smartass-plugins.');

tests.info('Switching to nosync mode:');
require('../nosync.js');
tests.ok('Loaded nosync.');


tests.logKeys = function (obj) {
  var keys = Object.keys(obj);
  keys.sort();
  keys = keys.join(', ');
  if (keys.length > 72) { keys = keys.substr(0, 70) + ' …'; }
  tests.info('  keys:  ' + keys);
};


tests.tryLoadModule = function (smartassy, assumedProp, modName) {
  tests.info('\nTrying to ' +
    (smartassy ? 'smartass-load' : 'require()') + ' some probably ' +
    assumedProp + ' module "' + modName + '":');
  try {
    if (smartassy) {
      ssap.using(modName, tests.logKeys);
      if ('number' === typeof ssap.previouslyUsedPluginSize) {
        tests.err('Did ssap just read some module source file sync?!');
      }
    } else {
      tests.logKeys(require(modName));
    }
    if (assumedProp === 'pre-loaded') {
      tests.ok('Successfully sync-loaded "' + modName + '" from cache');
    } else {
      tests.err('Was "' + modName + '" just loaded sync?!');
    }
  } catch (loadErr) {
    if (assumedProp === 'pre-loaded') {
      tests.err('Failed to sync-loaded "' + modName + '" from cache');
    } else {
      tests.ok('Failed to sync-load "' + modName + '": ' + String(loadErr));
    }
  }
};


tests.futureTickExperiments = function () {
  tests.info('Timer triggered, start testing!');
  [// smartassy assumedProp   modName
    [ true,     'existing',   './forever-unrequired.js'],
    [ true,     'existing',   'express'],
    [ false,    'existing',   'underscore'],
    [ true,     'missing',    'ai-singularity'],
    [ true,     'pre-loaded', '../nosync.js'],
    [ false,    'pre-loaded', 'cli'],
  ].map(Function.apply.bind(tests.tryLoadModule, tests));

  tests.info();
  if (tests.cntOk !== tests.expectOk) {
    throw new Error('unexpected number of successful tests: ' + tests.cntOk);
  }
  if (tests.cntErr !== tests.expectErr) {
    throw new Error('unexpected number of failed tests: ' + tests.cntErr);
  }
  tests.info('Test statistics are as expected.');
};


tests.info('Setting up timer for testing in some future tick:');
setTimeout(tests.futureTickExperiments, 10);
tests.ok('Timer set.');
