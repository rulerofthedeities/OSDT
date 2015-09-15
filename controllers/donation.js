
module.exports = {
	add: function(callback) {
		var newDonation = {
			program: "VLC Media Player",
			contributed: {value:10, currency:"USD"},
			date: Date.now
		};
		return newDonation;
	}
};
