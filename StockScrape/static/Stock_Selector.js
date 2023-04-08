//First get tests 
document.addEventListener('DOMContentLoaded', function(){
	console.log("Script connected");
	const url = "http://phisix-api4.appspot.com/stocks.json"
	
	
	async function getapi(url){
		//Gets the response and gets the stock name 
		fetch(url, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(result => {
			console.log(result.stock);
			result.stock.forEach((stock) => {
				//console.log(stock.symbol);
				var stock_symbol = document.createTextNode(stock.symbol);
				var op_Element = document.createElement('option');
				op_Element.setAttribute('value', stock.symbol);
				op_Element.appendChild(stock_symbol);
				document.querySelector('#stock-selector-id').append(op_Element);

			})
		})
	
		//Prints the stock symbol	
	}
	getapi(url);
	selected_Stock();
	apigetUpdate();
	
});

const timer = ms => new Promise(res => setTimeout(res, ms))
async function apigetUpdate(url){
	var op = document.getElementById("stock-selector-id");
	while(true){
	var stock = op.value;
	const text = document.createTextNode("Loading...");
	const loading_element = document.createElement('p');
	loading_element.appendChild(text);	

	var url = ('http://phisix-api4.appspot.com/stocks/' + stock + '.json');
	fetch(url, {
		method: 'GET',
	})
	.then(response => response.json())
	.then(result => {
		//console.log(result.stock);
		result.stock.forEach((stock) => {
			//console.log(stock.symbol);
			//Prints the stock name 
			var stock_name = document.createTextNode(stock.name);
			document.querySelector("#stock_name").innerHTML = "";
			document.querySelector("#stock_name").append(stock_name);

			//Prints the percent change 
			var percent_change = document.createTextNode(stock.percent_change + "%");
			document.querySelector("#percent-change").innerHTML = "";
			document.querySelector("#percent-change").append(percent_change);

			//Prints the price amount
			var price_amount = document.createTextNode(stock.price.amount);
			var price_denomination = document.createTextNode(stock.price.currency);
			document.querySelector("#price-amount").innerHTML = "";
			document.querySelector("#price-amount").append(price_denomination);
			document.querySelector("#price-amount").append(price_amount);

			//Sets the color of the fonts based on the price change
			//console.log("Parsed percentage change value = " + parseFloat(stock.percent_change));
			//console.log("Parsed price-amount value = " + parseFloat(stock.price.amount));

			if(parseFloat(stock.percent_change) <= 0){
				console.log("Changing the element to red");
				document.querySelector("#percent-change").style.color = "red";
				document.querySelector("#price-amount").style.color = "red";
			}
			else{
				document.querySelector("#percent-change").style.color = "rgb(0, 255, 149)";
				document.querySelector("#price-amount").style.color = "rgb(0, 255, 149)";
			}

			//Prints the volume of the stock 
			var volume = document.createTextNode("Volume: " + stock.volume);
			document.querySelector("#volume").innerHTML = "";
			document.querySelector('#volume').append(volume);

		})
	})
		//console.log("Updating stock info");
		await timer(1000);
	}
}
function selected_Stock(){
	document.querySelector('#show-posts').innerHTML = "";
	var op = document.getElementById("stock-selector-id");
	var stock = op.value;
	//console.log("Getting tweets of " + stock);
		const text = document.createTextNode("Loading...");
	const loading_element = document.createElement('p');
	loading_element.appendChild(text);	
	
	loading_element.setAttribute('id', 'loading');
	//op.form.submit();
	fetch('/getStockData', {
		"method" : "POST",
		"headers": {"Content-Type": "application/json"},
		"body" : JSON.stringify({
			'stock' : stock
		})
	})
	.then(document.querySelector('#show-posts').append(loading_element))//Apply animation effect
	.then(response => response.json())
	.then(result => {
		console.log("Printing tweets")
		console.log(result)
		document.querySelector('#show-posts').innerHTML = "";
		result.forEach((tweet, i) => {
			setTimeout(() => {
				//Gets all the data of the tweet object
				//console.log(tweet);
				var displayname = document.createTextNode(tweet.displayname);
				var username = document.createTextNode(tweet.username);
				var user_url = tweet.user_url;
				var timestamp = document.createTextNode(tweet.timestamp);
				//var content = document.createTextNode(tweet.tweet_text);
				var tweet_url = tweet.tweet_url;
				//console.log("Showing tweet of " + username)
				//Creates individual div and its contents for every post
				var link_to_post = document.createElement('a');
				var post = document.createElement('div');
				var display_name = document.createElement('a');
				var username_d = document.createElement('h4');
				var date_posted = document.createElement('p');
				var tweet_content = document.createElement('p');
				
				//Setting of attributes
				link_to_post.href = tweet_url;
				post.setAttribute('id', 'post');
				display_name.setAttribute('id', 'displayname');
				display_name.href = user_url;
				username_d.setAttribute('id', 'username');
				date_posted.setAttribute('id', 'timestamp');
				tweet_content.setAttribute('id', 'content');
				link_to_post.setAttribute('id', 'post_link')
				//Append data to elements
				display_name.appendChild(displayname);
				username_d.appendChild(username);
				date_posted.appendChild(timestamp);
				//tweet_content.appendChild(content);
				var i = 0; 
				var speed = 10;
				var txt = tweet.tweet_text;
				function typeWriter(){
					if(i < txt.length){
						tweet_content.innerHTML += txt.charAt(i);
						i++;
						setTimeout(typeWriter, speed);
						//console.log(i);
					}
				}
				typeWriter();
				link_to_post.innerHTML = "View post on Twitter";	

				post.append(display_name);
				post.append(username_d);
				post.append(date_posted);
				post.append(tweet_content);
				post.append(link_to_post);

				document.querySelector('#show-posts').append(post);

			}, i * 1100);
		})
	})

}





