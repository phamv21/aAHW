class UserSession < ApplicationRecord
after_initialize :ensure_session_token
validates :user_id, :session_device, presence: true

    belongs_to :user

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end


        private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end