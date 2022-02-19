class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :content
      t.string :url
      t.integer :sub_id, null: false, index: true 
      t.integer :user_id, null: false, index: true #author
      t.timestamps
    end
  end
end
