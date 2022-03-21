Rails.application.routes.draw do
  # get '/' => 'posts#index'
  devise_for :users
  
  namespace :api do
    namespace :v1 do
      resources :todos
      resources :users, only: [:create]
      resource :sessions, only: [:create, :destroy]
      resource :user, only: :show
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
