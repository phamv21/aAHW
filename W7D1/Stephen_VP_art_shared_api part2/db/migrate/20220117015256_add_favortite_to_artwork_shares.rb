class AddFavortiteToArtworkShares < ActiveRecord::Migration[6.1]
  def change
    add_column :artwork_shares, :favorite, :boolean, default: false
  end
end
