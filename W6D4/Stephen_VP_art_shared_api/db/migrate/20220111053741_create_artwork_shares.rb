class CreateArtworkShares < ActiveRecord::Migration[6.1]
  def change
    create_table :artwork_shares do |t|
      t.integer :viewer_id, null:false
      t.integer :artwork_id, null:false
      t.timestamps
    end
  end
end
