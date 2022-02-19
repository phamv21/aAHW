class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :content, null: false
      t.integer :user_id, null: false, index: true
      t.integer :post_id, null: false, index: true
      t.integer :parent_id, index: true
      t.timestamps
    end
  end
end
