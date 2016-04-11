class Todo < ActiveRecord::Base
  validates :name, :presence => true, uniqueness: true, :length => { :in => 3..40 }
end
