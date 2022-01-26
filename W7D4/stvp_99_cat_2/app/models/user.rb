class User < ApplicationRecord
    attr_reader :password
    validates :username, presence: true
    validates :password, length:{minimum: 6, allow_nil: true}
    validates :password_digest, presence: {message: 'Password can not be empty'}
    after_initialize :ensure_session_token


    has_many :cats
    has_many :rental_requests,  dependent: :destroy,
    class_name: :CatRentalRequest,
    foreign_key: :user_id
    
    has_many :user_sessions, dependent: :destroy

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def self.find_by_credentials(usn,pass)
        user = User.find_by(username:usn)
        return nil if user.nil?
        return user if user.is_password?(pass)
        nil
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save
        self.session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)    
    end



    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end
