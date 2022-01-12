Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:index,:show,:update,:destroy,:create] do
    resources :artworks, only: [:index]
  end
  resources :artwork_shares, only: [:create,:destroy]
  resources :artworks 
end
 