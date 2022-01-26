class FixPasswordDigestColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :password_digeest
    add_column :users, :password_digest, :string, null:false
  end

end
