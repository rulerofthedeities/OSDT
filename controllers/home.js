module.exports = {
	index: function(request, response) {
		var viewModel = {
			programs: 12,
			contributed: {value:100, currency:"USD"},
			span: {value: 365,unit:"days"},
			currencies:[{'id': 'USD', 'label': '$'},
					    {'id': 'EUR', 'label': '€'}
					    ],
			defaultCurrency: "USD"
		};
		response.render('dashboard', viewModel);
	}
};
