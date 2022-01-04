class User < ApplicationRecord
    validates :username, presence: true
    validates :username, uniqueness: true
    has_many(
        :authored_polls,
        class_name: 'Poll',
        foreign_key: :user_id,
        primary_key: :id
    )

    has_many(
        :responds,
        class_name: 'Respond',
        foreign_key: :user_id,
        primary_key: :id
    )
    def completed_polls
    answer_choices = self.authored_polls
    
    r1 ={}
    r2 ={}
    result = []

    answer_choices.joins(:responses).select("polls.title, COUNT(questions.id) AS num").group('polls.title').map{|poll| r1[poll.title] = poll.num}

    answer_choices.left_outer_joins(:questions).select("polls.title, COUNT(questions.id) AS num").group('polls.title').map{|poll| r2[poll.title] = poll.num}
      
    r1.select{|k,v| r2[k]==v}
    
    end
end