

document.addEventListener('DOMContentLoaded', function(){
	console.log("PSE Edge Script connected");
	const { fetchStocksAll, getCompanyDisclosures, getCompanyInfo, getHistoricalPrices } = require('pse-edge/lib')

	// Fetch all stocks listed in the PSE
	//fetchStocksAll().then(console.log)

	// Get all company disclosures of a stock symbol
	getCompanyDisclosures('glo').then(console.log)

	// Get company info of a stock symbol
	//getCompanyInfo('tel').then(console.log)

	// Get Historical prices (daily OHLC) of a stock
	//getHistoricalPrices({ symbol: 'tel', startDate: '2021-02-02' }).then(console.log)

	// Get Financial reports
	//getFinancialReports("glo").then(console.log)
	
});

