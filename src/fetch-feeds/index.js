const uuid = require('uuid');
const AWS = require('aws-sdk');
const Twit = require('twit')
const config = {
    consumer_key : process.env.TWITTER_KEY,
    consumer_secret : process.env.TWITTER_SECRET
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};


const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fetchFeeds = (event, context, callback) => {
  const T = new Twit(config);

  T.get("search/tweets", { q: "FifaWorldCup2018", count: 100 }, function(err, data, response) {
    feeds = data["statuses"]

    for(i=0; i < feeds.length; i++){
      const feed = feeds[i];
      const params = {
        TableName: process.env.SOCIAL_FEED_TWITTER_TABLE,
        Item: { id: uuid.v1(), text: feed.text, user: feed["user"]["screen_name"] }
      }

      dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
          });
          return;
        }

      });
    }; //for loop
  });

  callback(null, "Success!");
};

module.exports = fetchFeeds;
