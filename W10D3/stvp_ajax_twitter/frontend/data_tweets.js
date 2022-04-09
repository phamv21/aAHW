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