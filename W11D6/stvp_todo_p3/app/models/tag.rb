class Tag < ApplicationRecord
    validates :name, presence: true
    has_many :taggings
    has_many :todos, through: :taggings

    
end
