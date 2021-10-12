class Board
  attr_accessor :cups
 
  def initialize(name1, name2)
    @cups = Array.new(14){[]}
    @players = {name1=>1,name2=>2}
    place_stones
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
    cup = Array.new(4,:stone)
    @cups.each_with_index do |el,idx|
      if (idx != 6 && idx != 13)
      @cups[idx] = cup.dup
      end
    end
  end

  def valid_move?(start_pos)
  unless start_pos.between?(0,5) || start_pos.between?(6,13)
    raise "Invalid starting cup"
  end
  if @cups[start_pos].count == 0
    raise "Starting cup is empty"
  end
  true
  end

  def make_move(start_pos, current_player_name)
  side = @players[current_player_name]
  ignore_idx = side == 1 ? 13 : 6
  idx = start_pos + 1
  until @cups[start_pos].empty?
    real_idx = idx % 14
    @cups[real_idx] << @cups[start_pos].shift unless real_idx == ignore_idx
    idx += 1
  end
  render
  ending_cup_idx = (idx-1) % 14
  next_turn(ending_cup_idx)
  end

  def next_turn(ending_cup_idx)
    # helper method to determine whether #make_move returns :switch, :prompt, or ending_cup_idx
    if ending_cup_idx == 13 || ending_cup_idx == 6
      return :prompt
    elsif @cups[ending_cup_idx].count == 1
      return :switch
    else
      return ending_cup_idx
    end
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    if @cups[7..12].all?{|cup| cup.count == 0} ||
    @cups[0..5].all?{|cup| cup.count == 0}
    return true
    end
    false
  end

  def winner
    if @cups[6] == @cups[13]
      return :draw
    elsif @cups[6].count > @cups[13].count
      return @players.keys.first
    else
      return @players.keys.last
    end
  end
end
