Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api do
    resources :pokemon, only:[:create, :show, :index], defaults:{format: :json}
  end
end
