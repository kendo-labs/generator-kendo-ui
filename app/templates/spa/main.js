require.config({
  paths: {
    'text': '../bower_components/requirejs-text/text'
  }
});

require([
  'app'
], function (app) {

  app.init();

});