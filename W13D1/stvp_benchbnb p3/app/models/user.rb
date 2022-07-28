class User < ApplicationRecord
    attr_reader :password
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :password_digest, presence:{ message:"Password can't be blank"}
    validates :password, length:{minimum:6}, allow_blank: true
    after_initialize :ensure_session_token

    def self.login_by_credentials(usr,pass)
        user = User.find_by(username:usr)
        if user
            return user if user.is_password?(pass)
            nil
        else
            return nil
        end
        
    end

    def is_password?(password)
        BCrypt::Password.new(password_digest) == password
    end

    def generate_pass(pass)
        BCrypt::Password.create(password)
    end

    def password=(pass)
        @password = pass
        self.password_digest = generate_pass(pass)
    end

    def reset_session_token
        self.session_token = generate_session_token
        self.save
        self.session_token
    end

    private

    def generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end


    


end
