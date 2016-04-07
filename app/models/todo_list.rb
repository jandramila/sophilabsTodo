class TodoList < ActiveRecord::Base
  belongs_to :user
  has_many :todos
  validates :name, :presence => true, :uniqueness => true, :length => { :in => 3..20 }

  def getListProgress
    unless self.todos.empty?
      total = self.todos.size.to_f
      done = self.todos.select{ |todo| todo.status }.size.to_f
      ((done / total) * 100).to_s << '%'
    else
      false
    end
  end
end
