class CreateVotings < ActiveRecord::Migration[6.1]
  def change
    create_table :votings do |t|
      t.integer :user_id
      t.integer :shortened_url_id
      t.timestamps
    end
    add_index :votings, [:shortened_url_id, :user_id], unique: true
  end
end
