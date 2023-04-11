// (Node.js server)
const http = require("http");
const port = process.env.PORT || 5000;
const server = http.createServer().listen(port);
console.log(`listening on port ${port}`);

server.on("request", function (request, response) {
	console.log(`METHOD: ${request.method}; URL: ${request.url}`);
	switch(request.method)
	{
	case "GET":
	case "PUT":
	case "POST":
	case "PATCH":
	case "DELETE":
		response.writeHead(200, {
			"Content-Type":"application/json",
			"Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end(JSON.stringify({dummy:"dummy"}));
		break;
	case "OPTIONS": // THE CLIENT OCCASIONALLY - NOT ALWAYS - CHECKS THIS
		response.writeHead(200, {
			"Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
			"Access-Control-Allow-Methods":"GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end();
		break;
	default:
		response.writeHead(405, {
			"Content-Type":"application/json"
		});
		response.end(JSON.stringify({error:`method ${request.method} not allowed`}));
		break;
	}
});


document.addEventListener('DOMContentLoaded', function(){
	const { fetchStocksAll, getCompanyDisclosures, getCompanyInfo, getHistoricalPrices } = require('pse-edge/lib')

	// Fetch all stocks listed in the PSE 
	//fetchStocksAll().then(console.log)

	// Get all company disclosures of a stock symbol
	//getCompanyDisclosures('glo').then(console.log)

	var CompanyDisclosures = getCompanyDisclosures('glo');
	console.log(CompanyDisclosures);

	// Get company info of a stock symbol
	//getCompanyInfo('tel').then(console.log)

	// Get Historical prices (daily OHLC) of a stock
	//getHistoricalPrices({ symbol: 'tel', startDate: '2021-02-02' }).then(console.log)

	// Get Financial reports
	//getFinancialReports("glo").then(console.log)


});

