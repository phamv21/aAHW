class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections do |t|
      t.string :title, null: false
      t.integer :user_id, null:false
      t.integer :artwork_id, null:false
      t.timestamps
    end
  end
end
