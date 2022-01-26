class User < ApplicationRecord
    attr_reader :password
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :password_digest, presence:{message:"Password can not be blank"}
    validates :password, length:{minimum: 6, allow_nil:true}
    after_initialize :ensure_session_token, :ensure_activation_token


    has_many :notes, dependent: :destroy

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def self.find_by_credentials(usrn,pass)
        user = User.find_by(username:usrn)
        return nil if user.nil?
        return user if user.is_password?(pass)
        nil
    end

    def password=(pass)
        @password = pass
        self.password_digest = BCrypt::Password.create(@password)
    end

    def is_password?(pass)
        BCrypt::Password.new(password_digest).is_password?(pass)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
    end

    def activated?
        self.activated
    end

    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def ensure_activation_token
        self.activation_token ||= self.class.generate_session_token
    end


    


end
