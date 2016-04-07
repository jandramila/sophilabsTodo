class Todo < ActiveRecord::Base
  belongs_to :todo_list
  validates :name, :presence => true, uniqueness: { scope: :todo_list_id }, :length => { :in => 3..20 }
end
