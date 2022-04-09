const APIUtil = require("./api_until");

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

