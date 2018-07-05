const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getFeeds = (event, context, callback) => {
  const params = {
    TableName: process.env.SOCIAL_FEED_TWITTER_TABLE,
  };

  dynamoDb.scan(params, (error, result) => {
    if(error){
      console.log(error);
    }
    else{
      console.log(result);
      callback(null, "Success!");
    }
  });
};

module.exports = getFeeds;
