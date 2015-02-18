# Oneplace - Keep everyting in one place

Demo: http://oneplace.meteor.com

Install:
```
meteor add yasinuslu:oneplace
```

Example plugin:
```js
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
```

Example usage:
```js
Tracker.autorun(function() {
  console.log('screen width: ' + One.get('screen', 'width'));
  console.log('screen height: ' + One.get('screen', 'height'));
});
```

After that you'll see those reactive variables changing when you resize. Oneplace is just a tiny package for you to build useful plugins around it.

Checkout all plugins in `plugins.js` for example you can easily add infinite scrolling to your views with `scroll` plugin.
