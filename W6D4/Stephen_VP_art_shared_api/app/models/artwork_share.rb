class ArtworkShare < ApplicationRecord
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
