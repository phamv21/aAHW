class ShortenedUrl < ApplicationRecord
    validate :no_spamming
    validate :nonpremium_max

    


    belongs_to(
        :submitter,
        class_name: 'User',
        foreign_key: :user_id,
        primary_key: :id
    )
    has_many( #the dependent indicate that if the value of url was destroy the associations also were destroyed
        :visits, dependent: :destroy,
        class_name:'Visit',
        foreign_key: :shortened_url_id,
        primary_key: :id
    )  

    has_many(
        :visitors,
        Proc.new{distinct}, 
        through: :visits, 
        source: :visitors 
    )

    has_many(
        :taggings, dependent: :destroy,
        class_name: 'Tagging',
        foreign_key: :shortened_url_id,
        primary_key: :id
    )
    has_many(
        :votings, dependent: :destroy,
        class_name: 'Voting',
        foreign_key: :shortened_url_id,
        primary_key: :id
    )

    has_many :tag_topics, through: :taggings, source: :tag_topic
    has_many :voters, through: :votings, source: :voter
    def num_clicks
    Visit.where(:shortened_url_id => self.id).count
    end

    def num_uniques
         Visit.where(:shortened_url_id => self.id).distinct.count(:user_id)
        
    end

    def num_recent_uniques
         Visit.where(created_at: 10.minutes.ago..Time.now).distinct.count(:user_id)
        
    end
    def self.shorten(user,l_url)
        ShortenedUrl.create!(
            long_url: l_url,
            user_id: user.id,
            short_url: ShortenedUrl.random_code
        )
        
    end

    def self.prune(period_in_minutes)
        unless self.submitter.premium
        old_urls = ShortenedUrl.where(created_at: DateTime.new..period_in_minutes.minutes.ago)
        old_urls.each do |url|
            url.destroy
        end
        end
        
    end
    #fuction that determind according the voting.
    def  self.top #have most vote
       ShortenedUrl.select('shortened_urls.id, shortened_urls.short_url,shortened_urls.long_url, COUNT(votings.id) AS total_votes' ).joins(:votings).group('shortened_urls.id').order('total_votes desc').limit(10).map do |c|
        {   id: c.id,
            long_url: c.long_url,
            short_url: c.short_url,
            total_votes: c.total_votes
        }

        end
    end

    def self.hot #most voted last 24 hours
        ShortenedUrl.select('shortened_urls.id, shortened_urls.short_url,shortened_urls.long_url, COUNT(votings.id) AS total_votes' ).joins(:votings).where(created_at: 1.day.ago..Time.now).group('shortened_urls.id').order('total_votes desc').limit(10).map do |c|
        {   id: c.id,
            long_url: c.long_url,
            short_url: c.short_url,
            total_votes: c.total_votes
        }

        end
        
    end

    def self.random_code(vip)
        string = ""
        unless vip
            while true
                string = SecureRandom.urlsafe_base64
                return string unless ShortenedUrl.exists?(:short_url => string)
            end
        else
            while true
                string = 'VIP-' + SecureRandom.urlsafe_base64
                return string unless ShortenedUrl.exists?(:short_url => string)
            end
        end

    end



    

    private
    def no_spamming
        if ShortenedUrl.where(created_at: 10.minutes.ago..Time.now , :user_id => self.user_id).count > 5
            errors[:spam] << 'Can\'t submit more than 5 urls within 10 minutes'
        end
    end

    def nonpremium_max
        if !self.submitter.premium && ShortenedUrl.where(created_at: 7.days.ago..Time.now,:user_id => self.user_id).count > 7
            errors[:premium_require] << 'Basic user can only submit 7 urls a week '
        end
    end


end



