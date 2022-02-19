class Comment < ApplicationRecord
    validates :content, presence: true

    belongs_to :parent_comment, foreign_key: :parent_id, class_name: 'Comment', optional: true
    
    has_many :child_comments, foreign_key: :parent_id, class_name: 'Comment'

    belongs_to :author, foreign_key: :user_id, class_name: 'User'
    belongs_to :post
    
    has_many :votes, as: :votable

    def my_vote
        cal = self.votes
        vote = (cal.select('SUM(votes.value) AS num'))[0].num
        vote ||= 0
    end
    
end
