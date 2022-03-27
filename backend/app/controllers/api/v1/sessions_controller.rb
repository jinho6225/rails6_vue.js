class Api::V1::SessionsController < ApplicationController
    skip_before_action :require_login, only: [:create]

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
        user.api_token = nil
        user.destroy
        render json: user.api_token
    end

end