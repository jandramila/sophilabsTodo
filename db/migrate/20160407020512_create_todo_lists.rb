class CreateTodoLists < ActiveRecord::Migration
  def change
    create_table :todo_lists do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.timestamps null: false
    end
  end
end
