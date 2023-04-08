from flask import Flask, render_template, request
from Twitter_Scraper_Stock import Get_Stock_feed
import json

app = Flask(__name__)
@app.route('/')
def main():
	return render_template("index.html")


@app.route('/getStockData', methods=['POST'])
def get_Stock_Data():
	r = request.get_json()
	#print(r.get('stock'))
	stock_name = r['stock']
	data = Get_Stock_feed('$' + stock_name)
	'''
	for t in data.get_items():
		print("======================")
		print(t.user.displayname, "\n")
		print("@" + t.user.username, "\n")
		print(t.user.url, "\n")
		print(t.date, "\n")
		print(t.rawContent, "\n")
		print(t.url, "\n")
		print("======================")	
	'''
	#print(type(data))
	'''
	for i, t in enumerate(data.get_items()):
		if i > 100:
			break
		displayname = t.user.displayname
		username = "@" + t.user.username
		user_url = t.user.url
		timestamp = t.date
		tweet_text = t.rawContent
		tweet_url =t.url
		tweet = stock_tweet(displayname, username, user_url, timestamp, tweet_text, tweet_url)
		tweets.append(tweet)
	'''
	print(type(data))
	return data

		
