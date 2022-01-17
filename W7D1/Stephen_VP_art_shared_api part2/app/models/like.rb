class Like < ApplicationRecord 
    belongs_to(
        :likable, polymorphic: true
    )
    belongs_to(
        :author,
        class_name: 'User',
        foreign_key: :user_id,
    )
end