class AddDefaultToTodosDone < ActiveRecord::Migration[6.1]
  def change
    change_column_default :todos, :done, from: nil, to: false
  end
end
