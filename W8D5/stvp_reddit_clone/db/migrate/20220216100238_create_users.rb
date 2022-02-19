class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token
      t.boolean :moderator, default: false
      t.timestamps
    end
    add_index :users, :username, unique: true
  end
end
