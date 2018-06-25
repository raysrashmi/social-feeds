'use strict';
const fetchFeeds = require('./fetch-feeds');

module.exports.fetchFeedsFn = (event, context, callback) => {
  fetchFeeds(event)
    // .then(res => callback(null, 'Success!'))
    // .catch(callback);
};
