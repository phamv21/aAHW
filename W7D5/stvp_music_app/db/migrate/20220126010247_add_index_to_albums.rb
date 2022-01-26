class AddIndexToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_index :albums, :band_id
    add_index :albums, [:band_id,:title], unique:true
  end

end
