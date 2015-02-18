One = {
  plugins: {}
};
One.dict = new ReactiveDict();
One.set = function( /* pluginName, key, value */ ) {
  var self = this;
  var pluginName, key, value, plugin, dict;

  if (arguments.length > 2) {
    pluginName = arguments[0];
    key = arguments[1];
    value = arguments[2];
  } else {
    key = arguments[0];
    value = arguments[1];
  }

  if (pluginName) {
    plugin = self.plugins[pluginName];

    if (!plugin) {
      throw new Meteor.Error('no-such-plugin', 'No such plugin: ' + pluginName);
    }

    dict = plugin.dict;
  } else {
    dict = self.dict;
  }

  return dict.set(key, value);
};

One.get = function( /* pluginName, key */ ) {
  var self = this;
  var pluginName, key, plugin, dict;

  if (arguments.length > 1) {
    pluginName = arguments[0];
    key = arguments[1];
  } else {
    key = arguments[0];
  }

  if (pluginName) {
    plugin = self.plugins[pluginName];

    if (!plugin) {
      throw new Meteor.Error('no-such-plugin', 'No such plugin: ' + pluginName);
    }

    dict = plugin.dict;
  } else {
    dict = self.dict;
  }

  return dict.get(key);
};

One.set('threshold', 10);
One.set('paused', true);

One.start = function() {
  One.set('paused', false);
};

One.stop = function() {
  One.set('paused', true);
};

One.registerPlugin = function(name, init) {
  check(name, String);

  var plugin = init();

  plugin.dict = new ReactiveDict();
  plugin.start = function() {
    plugin.onStart();
  };

  plugin.stop = function() {
    plugin.onStop();
  };

  this.plugins[name] = plugin;
};

Tracker.autorun(function() {
  if (One.get('paused')) {
    _.each(One.plugins, function(plugin) {
      plugin.stop();
    });
  } else {
    _.each(One.plugins, function(plugin) {
      plugin.start();
    });
  }
});

Meteor.startup(function() {
  One.start();
});