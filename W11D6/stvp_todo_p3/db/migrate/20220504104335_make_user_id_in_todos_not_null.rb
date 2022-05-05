class MakeUserIdInTodosNotNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null(:todos, :author_id, false,1)
  end
end
