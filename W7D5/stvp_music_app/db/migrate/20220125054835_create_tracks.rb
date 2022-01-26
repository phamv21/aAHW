class CreateTracks < ActiveRecord::Migration[6.1]
  def change
    create_table :tracks do |t|
      t.integer :album_id,null: false
      t.string :title, null: false
      t.integer :ord
      t.text :lyric, null: false
      t.boolean :regular, default: true

      t.timestamps
    end
    add_index :tracks, :album_id
  end
end
