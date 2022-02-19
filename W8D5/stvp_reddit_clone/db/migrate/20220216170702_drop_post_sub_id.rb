class DropPostSubId < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :sub_id
  end
end
