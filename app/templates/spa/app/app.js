define([
  'views/layout/layout',
  'views/home/home',
  'views/details/details'
], function (layout, home, details) {

  var router = new kendo.Router({
    init: function () {
      layout.render('#root');
    }
  });

  router.route('/', function () {
    layout.showIn('#content', home);
  });

  router.route('/details', function () {
    layout.showIn('#content', details);
  });


  var init = function() {
    router.start();
  };

  return {
    init: init
  };

});