require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos
  def initialize(board, nmm, pmp = [])
    @board = board
    @next_mover_mark = nmm
    @prev_move_pos = pmp
  end

  def losing_node?(player_mark)
    opponent_mark = player_mark == :x ? :o : :x
    if board.over?
      return true if self.board.winner == opponent_mark
      return false if self.board.winner == player_mark || self.board.winner.nil?
    end
    #recursive
      children_nodes = self.children 
      all_lose = true
      children_nodes.each do |child|
        check = child.losing_node?(player_mark)
        if check
          return true if opponent_mark == self.next_mover_mark 
        else
          all_lose = false
        end
      end
    return true if player_mark == self.next_mover_mark && all_lose
    false
  end

  def winning_node?(player_mark)
    opponent_mark = player_mark == :x ? :o : :x
    if board.over?
      return true if board.winner == player_mark
      return false if board.winner == opponent_mark || board.winner.nil?
    end

    #recursive
      children_nodes = self.children 
      all_win = true
      children_nodes.each do |child|
        check = child.winning_node?(player_mark)
        if check
          return true if player_mark == self.next_mover_mark
        else
          all_win = false
        end
      end
      return true if opponent_mark == self.next_mover_mark && all_win
      false
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    nodes =[]
    (0..2).each do |r|
      (0..2).each do |c|
         if board.empty?([r,c])
          board_copy = board.dup
          board_copy[[r,c]] = self.next_mover_mark
          new_next_mover_mark = self.next_mover_mark == :x ? :o : :x
          new_prev_move_pos = prev_move_pos.map{|el| el.dup}
          new_prev_move_pos << [r,c]
          nodes << TicTacToeNode.new(board_copy,new_next_mover_mark,new_prev_move_pos)
        end
      end
    end
    nodes
  end

end


