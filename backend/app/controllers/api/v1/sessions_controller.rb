class Api::V1::SessionsController < ApplicationController
    def create
        user = User.where(email: params[:email]).first

        if user && user.valid_password?(params[:password])
            render json: user.as_json(only: [:email, :api_token]), status: :created
        else
            head(:unauthorized)
        end
    end

    def destroy
        user = User.where(email: params[:email]).first
        print(user.api_token, 'apitoken')
        print(user.valid?, 'valid')    
        user.api_token = nil
        user.destroy
        render json: user.api_token
    end
end