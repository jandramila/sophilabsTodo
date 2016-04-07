class AddIndexToTodos < ActiveRecord::Migration
  def change
    add_index :todos, [:todo_list_id, :name], :unique => true
  end
end
