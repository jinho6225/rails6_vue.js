class User < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
  # validates :email, format: { with: Devise.email_regexp }
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
