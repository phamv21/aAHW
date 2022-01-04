class Question < ApplicationRecord
    validates :text, presence: true
    validates :text, uniqueness: {
        scope: :poll_id,
        message: 'Should not repeat question in the same poll'
    }
    
    belongs_to(
        :poll,
        class_name: 'Poll',
        foreign_key: :poll_id,
        primary_key: :id
    )
    has_many(
        :answer_choices, dependent: :destroy,
        class_name: 'AnswerChoice',
        foreign_key: :question_id,
        primary_key: :id

    )
    has_many :responses, through: :answer_choices, source: :responds
    

    def results
        hash = {}
        responds = self
        .answer_choices
        responds.each {|el| hash[el.text]= 0}

        responds.select('answer_choices.id,answer_choices.text,COUNT(*) as num')
        .joins(:responds)
        .group("answer_choices.id")
        .map do |el|
            hash[el.text] = el.num
        end
        hash

    end

end