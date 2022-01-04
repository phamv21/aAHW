class Poll < ApplicationRecord
    validates :title, uniqueness: {
        scope: :user_id,
        message: 'User should make poll with differnt title' }
    belongs_to(
        :author,
        class_name: 'User',
        foreign_key: :user_id,
        primary_key: :id
    )
    has_many(
        :questions, dependent: :destroy,
        class_name: 'Question',
        foreign_key: :poll_id,
        primary_key: :id
    )
    has_many :responses, through: :questions, source: :responses

end