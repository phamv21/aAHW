class RemoveBadIndexFromCollections < ActiveRecord::Migration[6.1]
  def change
    remove_index :collections, name: "index_collections_on_title_and_user_id"
  end
end
