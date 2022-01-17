class AddIndexToArtworkShares < ActiveRecord::Migration[6.1]
  def change
    add_index :artwork_shares, [:viewer_id,:artwork_id], unique: true
    add_index :artwork_shares, :viewer_id
    add_index :artwork_shares, :artwork_id
  end
end
