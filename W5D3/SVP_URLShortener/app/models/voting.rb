class Voting < ApplicationRecord
    validate :can_not_vote_your_self

    belongs_to(
        :voter, 
        class_name: 'User',
        foreign_key: :user_id,
        primary_key: :id
    )

    belongs_to(
        :shortened_url,
        class_name: 'ShortenedUrl',
        foreign_key: :shortened_url_id,
        primary_key: :id

    )
    def self.record_vote!(user,shortened_url)
        Voting.create!(
            :user_id => user.id,
            :shortened_url_id => shortened_url.id
        )
    end

    private
    def can_not_vote_your_self
        if ShortenedUrl.find(self.shortened_url_id).user_id == self.user_id
            errors[:Voting] << 'You can not vote the link you have created!'
        end
    end
end