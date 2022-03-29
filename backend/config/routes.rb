Rails.application.routes.draw do
  # get '/' => 'posts#index'
  devise_for :users
  
  post 'api/v1/forgot_password' => "api/v1/passwords#forgot"
  post 'api/v1/reset_password' => "api/v1/passwords#reset"
  
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
