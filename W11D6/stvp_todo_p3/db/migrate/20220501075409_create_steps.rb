class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.boolean :done, null: false, default: false
      t.integer :todo_id, null: false, index: true
      t.timestamps
    end
  end
end
