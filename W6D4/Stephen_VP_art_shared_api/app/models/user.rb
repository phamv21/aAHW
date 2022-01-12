class User < ApplicationRecord
    validates :username, presence: true

    has_many(
        :artworks, dependent: :destroy,
        class_name: 'Artwork',
        foreign_key: :artist_id,
        primary_key: :id
    )

    has_many(
        :viewed_artworks,
        class_name: 'ArtworkShare',
        foreign_key: :viewer_id,
        primary_key: :id
    )
    has_many :shared_artworks, through: :viewed_artworks, source: :shared_artwork
end
