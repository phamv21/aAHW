class Collection < ApplicationRecord
     validates :title, uniqueness: {
         scope: :artwork_id,
         message: 'This artwork has already added to this collection'
     }
    belongs_to :user
    belongs_to :artwork
    
end