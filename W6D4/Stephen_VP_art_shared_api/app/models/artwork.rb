class Artwork < ApplicationRecord
    validates :artwork_id, uniqueness: {
        scope: :artist_id,
        message: 'each artist shared only an art 1 time'
    }
    belongs_to(
        :artist,
        class_name: 'User',
        foreign_key: :artist_id,
        primary_key: :id
    )
    has_many(
        :viewers, dependent: :destroy,
        class_name: 'ArtworkShare',
        foreign_key: :artwork_id,
        primary_key: :id
    )
    has_many :shared_viewers, through: :viewers, source: :shared_viewer
end