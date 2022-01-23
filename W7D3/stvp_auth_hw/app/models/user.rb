class User < ApplicationRecord
    attr_reader :password
    validates :username, :session_token, presence: true
    validates :password_digest, presence:{ message: 'Password can\'t be blank'}
    validates :password, length: {minimum:6, allow_nil: true}
    after_initialize :ensure_session_token

    def password=(pass)
        @password = pass
        self.password_digest = BCrypt::Password.create(pass)
    end

    def is_password?(pass)
        BCrypt::Password.new(self.password_digest).is_password?(pass)
        
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end

    def self.find_by_credentials(usn,pass)
        user = User.find_by(username:usn)
            return nil if user.nil?
        return user if user.is_password?(pass)
        nil
    end

    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end
