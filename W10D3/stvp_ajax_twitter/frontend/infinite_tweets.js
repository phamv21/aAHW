const APIUtil = require("./api_until");


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