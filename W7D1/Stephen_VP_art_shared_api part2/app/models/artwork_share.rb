class ArtworkShare < ApplicationRecord
    validates :artwork_id, uniqueness: {
        scope: :viewer_id,
        message: 'each viewer shared only an art 1 time'
    }
    belongs_to(
        :shared_viewer,
        class_name: 'User',
        foreign_key: :viewer_id,
        primary_key: :id
    )

    belongs_to(
        :shared_artwork,
        class_name: 'Artwork',
        foreign_key: :artwork_id,
        primary_key: :id
    )

    
end
