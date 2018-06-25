const AWS = require('aws-sdk');
const FetchTweets = require('fetch-tweets');
const apiKeys = {
    consumer_key : process.env.TWITTER_KEY,
    consumer_secret : process.env.TWITTER_SECRET
};


const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fetchFeeds = (event) => {
  const fetchTweets = new FetchTweets(apiKeys, false);
  const options = {
    q: 'rails',
    lang: 'en',
    count: 2
  };
  fetchTweets.byTopic(options, function(results){
    const data =  results.statuses;
    const params = { RequestItems: {"twitter-feeds-dev": []} }
    console.log("Data" + data.length);
    for(i=0; i < data.length; i++){
      const feed = data[i];
      feedInfo = { TableName: process.env.SOCIAL_FEED_TWITTER_TABLE,
        Item: { id: feed.id, text: feed.text }
      }
      console.log(feedInfo)
      dynamoDb.put(feedInfo);
      // const item = data[i];
      // const item_hash = { PutRequest: { Item:
      //   { "id": { S: item.id },
      //     "created_at": { S: item.created_at },
      //     "user": { S: item.user.screen_name},
      //     "body": { S: item.text } }}};
      // params.RequestItems.Music.push(item_hash)
    };

    // dynamoDb.batchWriteItem(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
  });

  return options;
};

module.exports = fetchFeeds;
