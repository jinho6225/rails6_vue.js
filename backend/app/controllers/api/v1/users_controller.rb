class Api::V1::UsersController < ApplicationController
    skip_before_action :require_login, only: [:create]

    before_action :authenticate_user!, only: [:show]

    def create
        @user = User.new(user_params)
        if @user.save
            # render json: @user, status: :created
            render json: @user, status: :created, location: api_v1_users_path(@user)
            # render json: @user.as_json(only: [:email, :api_token, :id]), status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end       
    end
    
    def show
        render json: {current_user: current_user, signed_in: user_signed_in?}
    end


    private

        def user_params
            params.require(:user).permit(:email, :password, :password_confirmation)
        end

end