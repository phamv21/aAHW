class AddFavortiteToArtworks < ActiveRecord::Migration[6.1]
  def change
    add_column :artworks, :favorite, :boolean, default: :false
  end
end
