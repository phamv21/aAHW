const APIUtil = require("./api_until");


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