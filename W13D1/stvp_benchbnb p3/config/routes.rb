Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    root to: 'static#root'

    namespace :api, defaults:{format: :json} do
      resource :session, only:[:create, :destroy]
      resources :users, only:[:create,:update,:show]
      resources :benches, only:[:index,:create]
    end

end
