class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.belongs_to :todo_list
      t.string :name
      t.boolean :status, default: false
      t.timestamps null: false
    end
  end
end
