class AddUserIdToTodoTable < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :author_id, :integer
    add_index :todos, :author_id
  end
end
