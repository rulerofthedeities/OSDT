module.exports = {
	index: function(request, response) {
		var viewModel = {
			programs: 12,
			contributed: {value:100, currency:"USD"},
			span: {value: 365,unit:"days"}
		};
		response.render('dashboard', viewModel);
	}
};
