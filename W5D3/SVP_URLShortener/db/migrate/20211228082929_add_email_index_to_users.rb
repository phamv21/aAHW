class AddEmailIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :email, :string
    add_index :users, :email, unique: true
  end
end
