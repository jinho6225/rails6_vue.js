class ApplicationController < ActionController::API
    before_action :require_login
    # helper_method :current_user, :logged_in?

    def current_user
        @current_user || User.where(email: params[:email])
    end

    def logged_in?
        current_user != nil
    end

    private

    def require_login
        unless logged_in?
            flash[:error] = "You must be logged in to access this section"
            redirect_to new_login_url # halts request cycle
        end
    end
end
