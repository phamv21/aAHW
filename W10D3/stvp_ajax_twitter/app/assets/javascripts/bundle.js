/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_until.js":
/*!*******************************!*\
  !*** ./frontend/api_until.js ***!
  \*******************************/
/***/ ((module) => {

const APIUtil ={
    followUser: id => {
        return $.ajax({
        type: 'POST',
        url: `/users/${id}/follow`,
        dataType: 'json',
        });        
    },

    unfollowUser: id=>{
        return $.ajax({
        type: 'DELETE',
        url: `/users/${id}/follow`,
        dataType: 'json',
    });   
},
    searchUsers: queryVal=>{
        return $.ajax({
            type: 'GET',
            url: `/users/search?query=${queryVal}`,
            dataType: 'json',
        });
    
    },

    composeTweet: formData=>{
        return $.ajax({
            type: 'POST',
            url: '/tweets',
            data: formData,
            dataType: 'json',
        });
    },

    fetchTweets: (maxCreatedAt,limit=0)=>{
        let url='/feed';
        url += `?limit=${limit}`;
        if(maxCreatedAt){
            url += `&max_created_at=${maxCreatedAt}`
        }
        
        
        return $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
        });
    }



};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/data_tweets.js":
/*!*********************************!*\
  !*** ./frontend/data_tweets.js ***!
  \*********************************/
/***/ ((module) => {

class DataTweets{
    constructor($el){
        this.$el = $el;
        this.allTweets();
    }   
    allTweets(){
        this.$el.on('click',(e)=>{
            e.preventDefault();
            let success = resp => console.log(resp) 
            $.ajax({
                type: "GET",
                url: "/tweets",
                dataType: 'json'
            }).then(success)
        })
    }
}

module.exports = DataTweets

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_until */ "./frontend/api_until.js");

class FollowToggle{
    constructor($el,options){
     this.$el = $el;
     this.userId = this.$el.data('userid') || options.userId;
     this.followState = this.$el.data('followedstate') || options.followState;
    this.renderButton(); 
     this.handleClick();

    }
    renderButton(){
        this.$el.empty();
        const followState = this.followState;
        let buttonName = ''; 
        if(followState){buttonName = 'Unfollow'};
        if (!followState) { buttonName = 'Follow' };
        this.$el.append(`${buttonName}`);
    }
    handleClick(){ 
        this.$el.on('click',e=>{
            e.preventDefault;
            let id = this.userId;
            
            const successFollow = (res) => {
                console.log(res);
                this.$el.attr('data-followedstate', true);
                this.followState = true;
                this.enable();
                this.renderButton();
            }
            
            const successUnfollow = (res) =>{
                console.log(res);
                this.$el.attr('data-followedstate', false);
                this.followState = false;
                this.enable();
                this.renderButton();
            }
                        
            this.disable();
            if (this.followState) {
                APIUtil.unfollowUser(id).then(successUnfollow)
                
            } else {   
                APIUtil.followUser(id).then(successFollow)
            }
            

            
        })
        
    }
    disable(){
        this.$el.append('ing')
        this.$el.attr('disabled',true)
    }
    enable(){
        this.$el.attr('disabled', false)
    }
}


module.exports = FollowToggle;



/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_until */ "./frontend/api_until.js");


class InfiniteTweets{
    constructor($el){
        this.$el = $el;
        this.maxCreatedAt = null;
        this.fetchTweets();
        this.insertTweet();
    }
    fetchTweets(){
      let sucess = resp=>{  //define how to deal with the respond
        if(resp.length > 0){
          this.maxCreatedAt = resp[resp.length-1].created_at;        
          this.render(resp,'bottom')
        }else{
          alert("No more tweets!!!")
        }
      }
      let failure = err=>{
        console.log(err);
      }

      $(".fetch-more").on('click',(e)=>{
        e.preventDefault();
        APIUtil.fetchTweets(this.maxCreatedAt).then(sucess).fail(failure);  
      })
      //insert mode
      $(".fetch-more").trigger('click');
      
    }
    insertTweet(){
      let sucess = resp => {  //define how to deal with the respond
         this.render(resp,"top");
      }

      $(".insert-tweet").on("click", (e) => {
        e.preventDefault;
        APIUtil.fetchTweets(null, 1).then(sucess)
      })

    }

    render(resp,position){
      resp.forEach((tweet) => {
        let $li = $(`<li> </li>`)
        let $author = $(`<a href='/users/${tweet.user.id}'>@${tweet.user.username}</a>`);
        let $content = $(`<b>${tweet.content} </b>`);
        let $mentions = $('<div><p>Mention:</p></div>');
        tweet.mentions.forEach((el) => {
          let $a = $(`<a href='/users/${el.user.id}'>@${el.user.username}</a>`);
          $mentions.append($a);
        })
        $li.append($author);
        $li.append($content);
        $li.append($mentions);
        if (position === 'top') { $('#feed').prepend($li)};
        if (position === 'bottom') { $('#feed').append($li)};
      })
    }

    



}

module.exports = InfiniteTweets;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_until */ "./frontend/api_until.js");


class TweetCompose{
    constructor($el){
        this.$el = $el;
        
        this.$textInput = $($el.find("textarea"));
        this.submit();
        this.charsLeft();
        this.addMention();
        this.removeMention();
    }

    submit(){
        const ulId = this.$el.data("tweets-ul")
        
        let sucess = respn =>{
            //action 
            // let $li = $(`<li>${JSON.stringify(respn.content)} </li>`);
            // let $ul = $(`${ulId}`);
            // $ul.prepend($li);
            $(".insert-tweet").trigger('click');
            this.clearInput();
            $(':input').attr('disabled', false);
        }
        let failure = err => {
            console.log(`something went wrong`);
            //action 
            this.clearInput();
            $(':input').attr('disabled', false);
        }



        this.$el.on('submit',(e)=>{
            e.preventDefault();
            let formData = $(e.currentTarget).serializeJSON();
            $(":input").attr('disabled',true);
            APIUtil.composeTweet(formData).then(sucess).fail(failure);
        })
    }

    addMention(){
        $(".add-mention-users").on('click',(e)=>{
            e.preventDefault();
            this.newUserSelect();
            
        })
    }
    removeMention(){
        $(".mention-users").on('click','.remove-mention-users',(e)=>{
            e.preventDefault();
            let $button = $(e.currentTarget);
            // $button.preventDefault();
            $button.parent().remove();
        })
    }


    charsLeft(){
        this.$el.on("input",(e)=>{
            let num = this.$textInput.val().length;
            let remain = 140 - num;
            $(".chars-left").empty();
            $(".chars-left").append(`${remain} character left`);
        })
    }

    clearInput(){
        //this way we convert Jquery to JS, to use the reset function.
        $(".chars-left").empty();
        $(".remove-mention-users").parent().remove();
        this.$el[0].reset();
    }

    newUserSelect(){

        let users = window.users;
        let $div = $(`<div></div>`);
        let $select = $(`<select name='tweet[mentioned_user_ids][]'>
      <option></option></select>`)
        users.forEach((user)=>{
            let $option = $(`<option value ='${user.id}'>${user.username}</option>`);
            $select.append($option);
        })

        let $removeButton = $(`<button class='remove-mention-users'> Remove</button>`)
        $div.append($select);
        $div.append($removeButton);
        $(".mention-users").append($div);


    }



}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_until */ "./frontend/api_until.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");


class UserSeach{
    constructor($el,$input){
        this.$el = $el;
        this.$input  = $input;
        this.$ul = this.$el.find('.users');
        this.queryVal = "";
        this.handleInput();
    }
    handleInput(){
        this.$input.on("input",(e)=>{
            let query = this.$input.val();
            //suceess function.
            let success = res => {
                this.renderResults(res)
            }

            APIUtil.searchUsers(query).then(success)
        })
    }
    renderResults(res){
        this.$ul.empty();
        res.forEach((el)=>{
            let $li = $(`<li><a href='/users/${el.id}'>${el.username} </a></li>`)
            //users/id
            // a href =
            let $button = $(`<button class='follow-toggle'></button>`)
            new FollowToggle($button, { userId: el.id, followState: el.followed })
            $li.append($button);
            this.$ul.append($li);
            
        })
        
        
    }

}


module.exports = UserSeach;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
var FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
var TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");
var UserSeach = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
var InfiniteTweets = __webpack_require__(/*! ./infinite_tweets */ "./frontend/infinite_tweets.js");
var DataTweets = __webpack_require__(/*! ./data_tweets.js */ "./frontend/data_tweets.js");

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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map