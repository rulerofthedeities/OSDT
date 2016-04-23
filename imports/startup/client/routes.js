import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/body.js';
import '../../ui/pages/app-home.js';
import '../../ui/pages/recipients.js';
import '../../ui/pages/donations.js';

FlowRouter.route('/', {
	name: 'App.home',
	action(){
		BlazeLayout.render('App_body', {main: 'home'});
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
