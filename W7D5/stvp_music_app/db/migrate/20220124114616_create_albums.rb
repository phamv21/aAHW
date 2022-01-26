class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.integer :band_id, null: false
      t.string :title, null:false
      t.integer :year, null:false
      t.boolean :live, default: false
      t.timestamps
    end
  end
end
