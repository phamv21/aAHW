const GIPHY_API_KEY = 'UANzqbfC6WprdpeAnU0WqnuYcceKQT49'
export const fetchSearchGiphys = (searchTerm) =>{
    return $.ajax({
        method: 'GET',
        url: `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
    })
}

// for testing
