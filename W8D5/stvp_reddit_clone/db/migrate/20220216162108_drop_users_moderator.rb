class DropUsersModerator < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :moderator
  end
end
