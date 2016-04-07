class User < ActiveRecord::Base
  has_many :todo_lists

  attr_accessor :username, :email, :clean_password, :password_confirmation

  validates :username, :presence => true, :uniqueness => true, :length => { :in => 3..20 }
  validates :clean_password, :confirmation => true #password_confirmation attr
  validates_length_of :clean_password, :in => 6..20, :on => :create

  before_save :encrypt_password
  after_save :clear_password


  def self.authenticate(username="", login_password="")
    user = User.find_by_username(username)

    if user && user.match_password(login_password)
      return user
    else
      return false
    end
  end

  def match_password(login_password="")
    password == BCrypt::Engine.hash_secret(login_password, salt)
  end

  def encrypt_password
    if clean_password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.password= BCrypt::Engine.hash_secret(clean_password, salt)
    end
  end

  def clear_password
    self.clean_password = nil
    self.password_confirmation = nil
  end

end
