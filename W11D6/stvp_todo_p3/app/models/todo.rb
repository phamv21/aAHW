class Todo < ApplicationRecord
    validates :title, :body, presence: true
    validates :done, inclusion: {
        in:[true, false]
    }

    has_many :steps, dependent: :destroy
    has_many :taggings, dependent: :destroy, inverse_of: :todo
    has_many :tags, through: :taggings

    belongs_to :author, class_name: 'User', foreign_key: :author_id

    def tag_names=(tag_names)
        self.tags = tag_names.map do |tag_name|
        Tag.find_or_create_by(name: tag_name)
        end 
    end

# 
end
