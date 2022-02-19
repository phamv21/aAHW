class Post < ApplicationRecord
    belongs_to :author, foreign_key: :user_id, class_name: "User"
    has_many :post_subs, foreign_key: :post_id, class_name: "PostSub", dependent: :destroy, inverse_of: :post
    has_many :subs, through: :post_subs
    has_many :comments
    has_many :votes, as: :votable

    def comment_by_parent_id
       result = Hash.new{|h,k| h[k] =[]}
       # @comment_votes = self.vote_of_comment_by_post
       
       self.vote_of_comment_by_post.keys
       all_comments = @ordered_comments.includes(:author)
       all_comments.each do |comment|
            result[comment.parent_id] << [comment,comment.author.username]
       end 
       result
    end

    def my_vote
        votes = self.votes
        cal = 0
            votes.each do |vote|
                cal += vote.value
            end
        cal
    end

    def vote_of_comment_by_post

        #the join method
        result = Hash.new{|h,k| h[k] = 0}
        @ordered_comments = self.comments
        .left_outer_joins(:votes)
        .select("comments.*,COALESCE(SUM(votes.value),0) AS num")
        .group("comments.id").order("num DESC")

        @ordered_comments.each do |comment|
            result[comment] = comment.num
        end
        result
        #join method 


        #result = Hash.new{|h,k| h[k] = 0}
        #all_comments = self.comments.includes(:votes)
        #
        #all_comments.each do |comment|
        #    cal = 0
        #        comment.votes.each do |vote|
        #            cal += vote.value  
        #        end
        #    
        #    result[comment] = cal
        #
        #end
        #result
    end

end
