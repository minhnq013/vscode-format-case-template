/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');
const { formatCaseTemplate } = require('../extension');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
  // Defines a Mocha unit test
  test('format correctly', () => {
    assert.equal(formatCaseTemplate('<case:camel>i am minh</case>'), 'iAmMinh');
    assert.equal(formatCaseTemplate('<case:snake:upper>i am minh</case>'), 'I_AM_MINH');
    assert.equal(
      formatCaseTemplate('<case:snake>i am minh</case> <case:upper>i am minh</case>'),
      'i_am_minh I AM MINH',
    );
    assert.equal(
      formatCaseTemplate('hahaha, <case:snake>i am minh</case>, llololol'),
      'hahaha, i_am_minh, llololol',
    );
  });
});
