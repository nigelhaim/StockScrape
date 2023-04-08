'''
Requires sns Scrape 
run | pip install snscrape | in the terminal

Requires tqdm

run | pip install tqdm | in the terminal
'''

#Import progress bar 
from tqdm.notebook import tqdm

#Import the sns scrape 
import snscrape.modules.twitter as sntwitter

#import json
import json
from flask import jsonify
def Get_Stock_feed(stock_name):
	tweets = []
	data = sntwitter.TwitterSearchScraper(stock_name)
	for i, t in enumerate(data.get_items()):
		if i > 500:
			break
		displayname = t.user.displayname
		username = "@" + t.user.username
		user_url = t.user.url
		timestamp = t.date
		tweet_text = t.rawContent
		tweet_url =t.url
		#print(type(timestamp.strftime("%m/%d/%Y, %H:%M:%S")))
		tweets.append({
			'displayname' : displayname, 
			'username' : username,
			'user_url' : user_url,
			'timestamp' : timestamp.strftime("%m|%d|%Y || %H:%M"),
			'tweet_text' : tweet_text,
			'tweet_url' : tweet_url
			})
	jsonTweets = json.dumps(tweets)
	print(type(jsonTweets))
	return jsonTweets

'''
Reference: https://youtu.be/PUMMCLrVn8A

'''