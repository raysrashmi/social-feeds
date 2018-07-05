const uuid = require('uuid');
const AWS = require('aws-sdk');
const Twit = require('twit')
const config = {
    consumer_key : process.env.TWITTER_KEY,
    consumer_secret : process.env.TWITTER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};


const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fetchFeeds = (event, context, callback) => {
  const T = new Twit(config);

  T.get("search/tweets", { q: "FifaWorldCup2018", count: 25 }, function(err, data, response) {
    feeds = data["statuses"]
    const params = { RequestItems: { "twitter-feeds-dev": [] } }

    for(i=0; i < feeds.length; i++){
      const feed = feeds[i];
      const  item_hash = {
        PutRequest:
        {
          Item:
          { "id": uuid.v1(),
            "text": feed.text,
            "user": feed.user.screen_name,
            "tweet-id": feed.id
          }
        }
      }

      params.RequestItems["twitter-feeds-dev"].push(item_hash);
    }; //for loop
    dynamoDb.batchWrite(params, function(err, data) {

      if (err){
        console.log(err);
      }
      else{
        console.log(data);
      }
    });
  });

  callback(null, "Success!");
};

module.exports = fetchFeeds;
