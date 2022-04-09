const APIUtil = require("./api_until");
const FollowToggle = require("./follow_toggle");


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