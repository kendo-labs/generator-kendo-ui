define([
  'text!views/home/home.html'
], function (template) {
    
    var model = kendo.observable({
      title: 'Home'
    });

  var view = new kendo.View(template, { model: model });

  return view;

});