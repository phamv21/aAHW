class CreateVottings < ActiveRecord::Migration[6.1]
  def change
    create_table :vottings do |t|
      t.integer :user_id
      t.integer :shortened_url_id
      t.timestamps
    end
    add_index :vottings, [:shortened_url_id, :user_id], unique: true
  end
end
