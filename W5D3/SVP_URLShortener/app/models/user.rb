class User < ApplicationRecord
    validates :email, presence: true
   
    has_many(
        :submitted_urls,
        class_name: 'ShortenedUrl',
        foreign_key: :user_id,
        primary_key: :id
    )

    has_many(
        :votings,
        class_name: 'Voting',
        foreign_key: :user_id,
        primary_key: :id

    )
    has_many :voting_urls, through: :votings, source: :shortened_url

    def shorten(l_url)

          ShortenedUrl.create!(
            long_url: l_url,
            user_id: self.id,
            short_url: ShortenedUrl.random_code(self.premium)
        )
    end
    



end