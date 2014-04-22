require.config({
  paths: {
    'kendo': 'vendor/kendo/kendo',
    <% if ( includeBootstrap ) { %>'bootstrap': 'vendor/bootstrap/bootstrap', <% } %>
    'text': '../../bower_components/requirejs-text/text',
    'plugins': 'vendor/plugins/plugins'
  },
  baseUrl: 'scripts'
});

require([ 'kendo',<% if ( includeBootstrap ) { %>'bootstrap',<% } %> 'text', 'plugins' ], function (app) {

  require(['app'], function(app) {
    app.init();
  })

});