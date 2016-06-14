import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/body.js';
import '../../ui/pages/app-home.js';
import '../../ui/pages/app-notfound.js';
import '../../ui/pages/settings.js';
import '../../ui/pages/recipients.js';
import '../../ui/pages/donations.js';

FlowRouter.route('/', {
	name: 'Home',
	action(){
		BlazeLayout.render('App_body', {main: 'home'});
	},
});

FlowRouter.route('/settings', {
  name: 'Settings',
  action(){
    BlazeLayout.render('App_body', {main: 'settings_page'});
  },
});

FlowRouter.route('/recipients', {
  name: 'Recipients',
  action(){
    BlazeLayout.render('App_body', {main: 'recipients_page'});
  },
});

FlowRouter.route('/donations', {
  name: 'Donations',
  action(){
    BlazeLayout.render('App_body', {main: 'donations_page'});
  },
});

// Not Found
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { content: 'App_notFound' });
  },
};
