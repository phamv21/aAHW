Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :session, only:[:new,:create,:destroy]
  resources :users, only: [:new, :create]
  resources :subs
  resources :posts, except:[:index] do
    resources :comments, only: [:new]

    member do
      post 'upvote'
      post 'downvote'
    end

  end
  resources :comments do
      member do
        post 'upvote'
        post 'downvote'
      end

  end


  root to: "subs#index"
end
