class Respond < ApplicationRecord
    validates :answer_choice_id, uniqueness: {
        scope: :user_id,
        message: 'A Use can only respond to a question one time'
    }
    validate :author_can_not_repsond_to_own_poll

    belongs_to(
        :answer_choice,
        class_name: 'AnswerChoice',
        foreign_key: :answer_choice_id,
        primary_key: :id,
    )
    belongs_to(
        :respondent,
        class_name: 'User',
        foreign_key: :user_id,
        primary_key: :id
    )

    def sibling_responses
        self.question.responses
            .where.not(id:self.id)
    end

    has_one :question, through: :answer_choice, source: :question
    
    
    private
    def author_can_not_repsond_to_own_poll
        if self.question.poll.author.id == self.user_id
            errors[:base] << 'A user can not make response to their own poll(s)'
        end
    end

end