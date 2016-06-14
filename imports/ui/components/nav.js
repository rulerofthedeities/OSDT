import './nav.html';

Template.nav.helpers({
	pages: [
		{name: 'Home', url: '/'},
		{name: 'Settings', url: 'settings'},
		{name: 'Donations', url: 'donations'},
		{name: 'Recipients', url: 'recipients'},
	],
});

Template.page.helpers({
	active: function(){
		const currentRoute = this.name;
		return FlowRouter.getRouteName() == currentRoute ? 'active' : 'inactive';
	},
});