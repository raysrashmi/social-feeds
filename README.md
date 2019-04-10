# social-feeds
Fetch tweets of ""FifaWorldCup2018"
Using

DynamoDB 

Twit- Twitter API Client for node 

To run it locally
```
yarn install
```
```
sls invoke local --function fetchFeeds --data twitter --aws-profile mnddevt -s dev

```

Ofcourse need twitter credentials
```
twitter_key: XXX
twitter_secret: YYYY
twitter_access_token: VVVVV
twitter_access_token_secret: ZZZZZ
```
