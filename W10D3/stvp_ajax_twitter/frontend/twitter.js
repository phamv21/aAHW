var FollowToggle = require('./follow_toggle.js');
var TweetCompose = require('./tweet_compose.js');
var UserSeach = require('./users_search.js');
var InfiniteTweets = require('./infinite_tweets');
var DataTweets = require('./data_tweets.js');

$(()=>{

$(".follow-toggle").each((i,v)=>{
    new FollowToggle($(v),{});
})
var $userSearch = $(".users-search");
var $input = $("#users-input")
new UserSeach($userSearch,$input);

var $tweetForm = $(".tweet-compose");
new TweetCompose($tweetForm);

var $infiniteTweets = $(".infinite-tweets");
new InfiniteTweets($infiniteTweets);
///user search

//test data tweet
var $tweetsIndex = $(".tweets-index-test");
new DataTweets($tweetsIndex);

});