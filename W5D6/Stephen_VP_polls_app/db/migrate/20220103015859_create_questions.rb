class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :text
      t.integer :pool_id
      t.timestamps
    end
    add_index :questions, [:text,:pool_id], unique: true
  end
end
