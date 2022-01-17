Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:index,:show,:update,:destroy,:create] do
    resources :artworks, only: [:index,:create]
    resources :artwork_shares, only: [:index,:create]
    resources :comments, only: [:index,:create]
    resources :likes, only:[:index]
    resources :collections, only: [:index,:create]
  end
 
  resources :artworks  do
    resources :comments, only: [:index,:create]
    resources :likes, only:[:index,:create]
    resources :artwork_shares, only: [:create]
     member do
      get 'favorite' 
    end
  end

   

   resources :comments, only: [:index,:create,:destroy] do
      resources :likes, only:[:index,:create] # a comment has many likes
   end
   resources :artwork_shares, only: [:destroy]
   resources :likes, only: [:destroy]
   resources :collection, only: [:destroy]
end
  