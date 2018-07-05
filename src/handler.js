const fetchFeeds = require('./fetch-feeds');
const getFeeds = require('./get-feeds');

module.exports.fetchFeedsFn = (event, context, callback) =>
  fetchFeeds(event, context, callback)

module.exports.getFeedsFn = (event, context, callback) =>
  getFeeds(event, context, callback);

