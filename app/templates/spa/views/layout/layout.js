define([
  'text!views/layout/layout.html'
], function (template) {

  var layout = new kendo.Layout(template);

  $.subscribe('/router/change', function (e, url) {
    layout.element.find('ul.nav > li').removeClass('active');
    layout.element.find('a[href="#' + url + '"]').parent().addClass('active');
  });

  return layout;

});