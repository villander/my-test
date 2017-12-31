/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'my-test',
  isDevelopingAddon: function() {
    return true;
  },
  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/apollo-client/index.js');
  },

  treeForVendor(vendorTree) {

    var apolloCacheTree = new Funnel(path.join(this.project.root, 'node_modules', 'apollo-client'), {
      files: ['index.js'],
      destDir: 'apollo-client'
    });

    return new MergeTrees([vendorTree,  apolloCacheTree]);
  },
};
