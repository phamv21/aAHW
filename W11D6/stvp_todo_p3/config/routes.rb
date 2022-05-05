Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :todos, defaults: {format: :json}
    resources :steps, defaults: {format: :json}
  end
  resource :session, only:[:create, :new, :destroy]
  resources :users, only:[:create,:new]
  root to: 'static_pages#root'
end
