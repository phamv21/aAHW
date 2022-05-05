class User < ApplicationRecord
    attr_reader :password
    validates :username,:password, presence: true
    validates :password_digest, presence: {message:'password should not be empty'}
    validates :password, length:{minimum: 6, allow_nil: true}
    before_create :ensure_session_token


    has_many :todos, foreign_key: :author_id, dependent: :destroy

    def self.login_by_credential(usr,pass)
        user = User.find_by(username:usr) 
        if user.nil?
            return nil
        elsif BCrypt::Password.new(user.password_digest) == pass
            return user
        end
        nil
    end


    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end


    def generate_token
        token = SecureRandom.urlsafe_base64(16)
    end

    def reset_session_token
        self.session_token = nil
        self.session_token = self.generate_token
    end
    private 
    def ensure_session_token
        self.session_token ||= self.generate_token
    end
end
