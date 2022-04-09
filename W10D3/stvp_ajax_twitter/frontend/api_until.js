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