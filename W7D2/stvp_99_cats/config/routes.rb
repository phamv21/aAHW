Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :cats, only: [:index,:show,:new,:create,:edit,:update] do
    resources :cat_rental_requests, only: [:new,:create]
  end
  resources :cat_rental_requests, only: [:index,:show,:new,:create,:edit,:update] do
     member do
      get 'approve'
      get 'deny'
    end
  end
end
