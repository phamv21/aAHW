Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create,:new] do
    collection do
      get 'activate'
    end
  end
  resources :bands do
  resources :albums, only: [:new]
    end
  resources :albums, except: [:new,:index] do
  resources :tracks, only: [:new]
  end


  resources :tracks, except: [:new,:index] do
    resources :notes, only: [:new,:create]
  end

  resources :notes, only:[:show,:destroy]


  resource :session, only: [:create,:new,:destroy]

  root "sessions#new"
end
