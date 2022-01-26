class Track < ApplicationRecord
    validates :title, :lyric, presence: true
    belongs_to :album
    has_one :band, through: :album, source: :band 
    has_many :notes, dependent: :destroy

    def regular?
        self.regular
    end

    def bonus?
        !self.regular
    end
end
