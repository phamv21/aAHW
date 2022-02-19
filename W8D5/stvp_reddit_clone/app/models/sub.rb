class Sub < ApplicationRecord
    belongs_to :moderator, foreign_key: :user_id, class_name: 'User'
    has_many :post_subs, foreign_key: :sub_id, class_name: 'PostSub', dependent: :destroy
    has_many :posts, through: :post_subs 

    def vote_of_post_by_sub
        result = Hash.new{|h,k| h[k] = 0}
        
        #using join method
        ordered_posts = self.posts.left_outer_joins(:votes)
        .select("posts.*,COALESCE(SUM(votes.value),0) AS num")
        .group("posts.id").order("num DESC")

        ordered_posts.each do |post|
            result[post] = post.num
        end

        #using join method

        #all_posts.each do |post|
        #    cal = 0
        #    post.votes.each do |vote|
        #        cal += vote.value    
        #    end
        #    result[post] = cal
        #end
        result
    end

end
