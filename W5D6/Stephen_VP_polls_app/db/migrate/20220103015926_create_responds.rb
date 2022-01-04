class CreateResponds < ActiveRecord::Migration[6.1]
  def change
    create_table :responds do |t|
      t.integer :user_id
      t.integer :answer_choice_id
      t.timestamps
    end
    add_index :responds, [:user_id,:answer_choice_id], unique: true
  end
end
