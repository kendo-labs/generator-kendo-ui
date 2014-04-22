define([
  'text!views/details/details.html'
], function (template) {

  var template = $.trim(template);

  var model = kendo.observable({
    title: 'Details'
  });

  var view = new kendo.View(template, { model: model });

  return view;

});