class Artist < ApplicationRecord
  has_many :albums,
    class_name: 'Album',
    foreign_key: :artist_id,
    primary_key: :id

  def n_plus_one_tracks
    albums = self.albums
    tracks_count = {}
    albums.each do |album|
      tracks_count[album.title] = album.tracks.length
    end

    tracks_count
  end

  def better_tracks_query
    albums = self.albums.includes(:tracks)
    tracks_count = {}
    albums.each do |a|
      tracks_count[a.title] = a.tracks.length
    end
    tracks_count
    # TODO: your code here
  end

  def joins_tracks
    albums = self.albums.select('albums.*,COUNT(*) AS total_titles')
    .left_outer_joins(:tracks).group("albums.id")

    albums.map do |a|
      [a.title, a.total_titles]
    end

  end
end
