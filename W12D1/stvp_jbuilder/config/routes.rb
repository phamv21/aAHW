Rails.application.routes.draw do
  # Your routes here!
  namespace :api do
    resources :guests, only:[:show,:index], defaults:{format: :json} do
      resources :gifts, only:[:index], defaults:{format: :json}  
    end
    resources :gifts, only:[:show], defaults:{format: :json}
    resources :parties, only:[:show,:index], defaults:{format: :json}
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
