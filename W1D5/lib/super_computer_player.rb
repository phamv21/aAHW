require_relative 'tic_tac_toe_node'
require 'byebug'
class SuperComputerPlayer < ComputerPlayer
    def move(game, mark)
    board = game.board.dup
    root_node = TicTacToeNode.new(board,mark)
    children_nodes = root_node.children
    
    move_node = nil
    children_nodes.each do |child|
      check = child.winning_node?(mark)
     if check 
     move_node = child 
     break
      end
    end 

    if move_node.nil?
      children_nodes.each do |child|
      check = child.losing_node?(mark)
      if !check 
      move_node = child 
      break
      end
      end
    end 

    raise "give up" if move_node.nil?
    pos = move_node.prev_move_pos.first
    
    pos
    #board[*pos] = mark
  end
end




if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
