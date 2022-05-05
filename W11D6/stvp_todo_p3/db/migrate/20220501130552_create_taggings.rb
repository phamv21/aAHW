class CreateTaggings < ActiveRecord::Migration[6.1]
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null:false, index:true
      t.integer :todo_id, null:false, index:true
      t.timestamps
    end
  end
end
