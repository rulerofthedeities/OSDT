Router.configure({
  layoutTemplate: 'index',
  notFoundTemplate: '404',
});

Router.route('/', function() {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'OSDT'}});
});


Router.route('/recipients', function() {
  this.render('Recipients');
  this.render('nav', {to: 'nav'});
});

Router.route('/donations', function() {

  //this.layout('index');
  this.render('Donations');
  this.render('nav', {to: 'nav'});
});

