class AnswerChoice < ApplicationRecord
    belongs_to(
        :question,
        class_name: 'Question',
        foreign_key: :question_id,
        primary_key: :id
    )
    has_many(
        :responds, dependent: :destroy,
        class_name: 'Respond',
        foreign_key: :answer_choice_id,
        primary_key: :id
    )
end