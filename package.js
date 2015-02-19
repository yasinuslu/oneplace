Package.describe({
  name: 'yasinuslu:oneplace',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Keep everything in one place',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/yasinuslu/oneplace',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1');

  api.use('reactive-dict', 'client');
  api.use('tracker', 'client');
  api.use('check', 'client');
  api.use('underscore', 'client');
  api.use('jquery', 'client');

  api.addFiles('lib/one.js', 'client');
  api.addFiles('lib/plugins.js', 'client');

  api.export('One');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('yasinuslu:oneplace');
});