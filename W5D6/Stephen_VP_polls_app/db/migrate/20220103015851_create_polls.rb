class CreatePolls < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.string :title
      t.integer :user_id
      t.timestamps
    end
    add_index :polls, :title
  end
end
