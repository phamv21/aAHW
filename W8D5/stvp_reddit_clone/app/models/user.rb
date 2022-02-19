class User < ApplicationRecord
    attr_accessor :password
    validates :username, uniqueness: true
    validates :username, presence: true
    validates :password_digest, presence:{message: "your password can not be empty"}
    validates :password, length:{
        minimum: 6, allow_nil: true
    }
    after_initialize :make_sure_session_token

    def self.generate_session_token
        SecureRandom.urlsafe_base64(10)
    end

    def self.login_by_credentials(usr,pass)
        user = User.find_by(username:usr)
        return nil if user.nil?
        return user if user.is_password?(pass)
        nil
    end

    def reset_session_token
        self.session_token = User.generate_session_token
        self.save!
    end

    def password=(pass)
        @password = pass
        self.password_digest = BCrypt::Password.create(pass)
    end

    def is_password?(pass)
        BCrypt::Password.new(self.password_digest).is_password?(pass)
    end
    
    has_many :subs
    has_many :posts
    has_many :votes

     def upvote(target) #target is a post or a comment
        vote = Vote.find_by(user_id:self.id,votable:target)
        if vote.nil?
            Vote.create!(user_id:self.id,value:1,votable:target)
        else
           if vote.value < 1
             vote.value +=1 
             vote.save
           end


        end

    end

    def downvote(target)
        vote = Vote.find_by(user_id:self.id,votable:target)
        if vote.nil?
            Vote.create!(user_id:self.id,value:-1,votable:target)
        else
            if vote.value > -1
            vote.value -=1     
            vote.save
            end

        end
    end

    private
    def make_sure_session_token
        self.session_token ||= User.generate_session_token
    end   

end
