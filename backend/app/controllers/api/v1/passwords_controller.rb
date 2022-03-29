class Api::V1::PasswordsController < ApplicationController

    def forgot

        if params[:email].blank?
            return render json: {error: 'Email not present'}
        end

        user = User.find_by(email: params[:email])
        if user.present?
            
            render json: {
                alert: "If this user exists, we have sent you a password reset email."
            }            
            raw, hashed = Devise.token_generator.generate(User, :password_reset_token)
            # hashed = SecureRandom.hex(10)
            user.password_reset_token = hashed
            user.password_reset_sent_at = Time.now.utc
            user.save

            UserMailer.password_reset(user).deliver_now
            # user.send_password_reset
        else
            #this sends regardless of whether there's an email in database for security reasons
            render json: {
                alert: "@@ If this user exists, we have sent you a password reset email."
            }
        end
    end
    
    def reset
        token = params[:token].to_s

        if params[:email].blank?
            return render json: {error: 'Token not present'}
        end

        user = User.find_by(password_reset_token: token)        
        if user.present? && ((user.password_reset_sent_at + 1.hour) > Time.zone.now)
            if params[:password]                
                user.password = params[:password]
                user.password_reset_token = nil
                user.save!
                render json: {
                    alert: "Your password has been successfuly reset!"
                }
                session[:user_id] = user.id
            else
                render json: { error: user.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: {error:  ['Link not valid or expired. Try generating a new link.']}, status: :not_found
        end
    end
    
end