'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KendoUIGenerator = module.exports = function KendoUIGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KendoUIGenerator, yeoman.generators.Base);

KendoUIGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'Out of the box, you get the following...',
    choices: [{
      name: 'Bootstrap',
      value: 'includeBootstrap',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    }, {
      name: 'Require',
      value: 'includeRequire',
      checked: true
    }]
  }, {
    type: 'confirm',
    name: 'scaffoldSpa',
    message: 'Do you want me to scaffold a SPA for you?',
    default: false
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeModernizr = hasFeature('includeModernizr');
    this.includeRequire = hasFeature('includeRequire');
    this.scaffoldSpa = answers.scaffoldSpa;

    cb();
  }.bind(this));
};

KendoUIGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

KendoUIGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

KendoUIGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

KendoUIGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

KendoUIGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

KendoUIGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorConfig', '.editorConfig');
};
 
KendoUIGenerator.prototype.app = function writeIndex() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.copy('index.html', 'app/index.html');

  if (this.scaffoldSpa) {
    this.copy('spa/main.js', 'app/scripts/main.js');
    this.copy('spa/app/app.js', 'app/scripts/app.js');
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/views');
    this.mkdir('app/scripts/views/layout');
    this.copy('spa/app/views/layout/layout.html', 'app/scripts/views/layout/layout.html');
    this.copy('spa/app/views/layout/layout.js', 'app/scripts/views/layout/layout.js');
    this.directory('spa/app/views/home', 'app/scripts/views/home');
    this.directory('spa/app/views/details', 'app/scripts/views/details');
  }
};

KendoUIGenerator.prototype.install = function () {

  var done = this.async();

  this.installDependencies({
    calldback: done
  });

};


