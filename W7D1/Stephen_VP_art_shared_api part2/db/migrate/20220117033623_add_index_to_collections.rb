class AddIndexToCollections < ActiveRecord::Migration[6.1]
  def change
    add_index :collections, [:title,:user_id], unique: true # one user one title
    add_index :collections, [:title,:artwork_id], unique: true #one artwork one title
  end
end
