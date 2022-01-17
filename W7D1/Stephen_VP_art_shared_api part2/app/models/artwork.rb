class Artwork < ApplicationRecord
    
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

    has_many(
        :comments, dependent: :destroy,
        class_name: 'Comment',
        foreign_key: :artwork_id,
        primary_key: :id
    )

    has_many(
        :likes, as: :likable, dependent: :destroy
    )
    has_many :collections, dependent: :destroy
    has_many :shared_viewers, through: :viewers, source: :shared_viewer
end