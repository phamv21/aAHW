class Album < ApplicationRecord
    validates :title, :year, presence: true
    validates :title, uniqueness:{
        scope: :band_id,
        message: 'Title has exist with this band'
    }

    belongs_to :band
    has_many :tracks, dependent: :destroy

    def live?
        self.live
    end

    def studio?
        !self.live
    end
end
