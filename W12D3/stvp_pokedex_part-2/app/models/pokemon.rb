class Pokemon < ApplicationRecord
  TYPES = [
    'fire',
    'electric',
    'normal',
    'ghost',
    'psychic',
    'water',
    'bug',
    'dragon',
    'grass',
    'fighting',
    'ice',
    'flying',
    'poison',
    'ground',
    'rock',
    'steel'
  ].sort.freeze

  validates :attack, :defense, :image_url, :name, :poke_type, presence: true
  validates :name, uniqueness: true
  validates :attack, :defense, numericality: true
  validates :poke_type, inclusion: { in: TYPES }

  has_many :items

  has_many :poke_moves, dependent: :destroy, inverse_of: :pokemon

  has_many :moves,
  through: :poke_moves,
  source: :move

  def move_names=(move_names)
    self.moves = move_names.map do |move_name|
      Move.find_or_create_by(name:move_name)
    end
  end
  
end
