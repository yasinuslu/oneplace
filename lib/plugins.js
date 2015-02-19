One.registerPlugin('screen', function() {
  var plugin = {};

  plugin.handler = function() {
    One.set('screen', 'width', $(window).width());
    One.set('screen', 'height', $(window).height());
  };

  plugin.onStart = function() {
    // set initial width and height
    plugin.handler();
    $(window).on('resize', plugin.handler);
  };

  plugin.onStop = function() {
    $(window).off('resize', plugin.handler);
  };

  return plugin;
});

One.registerPlugin('scroll', function() {
  var plugin = {};

  plugin.handler = function() {
    One.set('scroll', 'top', $(window).scrollTop());
    One.set('scroll', 'left', $(window).scrollLeft());
  };

  plugin.onStart = function() {
    // get initial scroll
    plugin.handler();
    $(window).on('scroll', plugin.handler);
  };

  plugin.onStop = function() {
    $(window).off('scroll', plugin.handler);
  };

  return plugin;
});

One.registerPlugin('mouse', function() {
  var plugin = {};

  plugin.handler = function(e) {
    One.set('mouse', 'pageX', e.pageX);
    One.set('mouse', 'pageY', e.pageY);
  };

  plugin.onStart = function() {
    $(window).on('mousemove', plugin.handler);
  };

  plugin.onStop = function() {
    $(window).off('mousemove', plugin.handler);
  };

  return plugin;
});