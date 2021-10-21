require_relative 'Display'
require_relative 'Board'
require_relative 'Player'
class Game
    attr_reader :board, :display, :current_player
    def initialize
        @board = Board.new
        @display = Display.new(@board)
        @players ={:white=>HumanPlayer.new(:white,@display),:green=>HumanPlayer.new(:green,@display)}
        @current_player = @players[:white]
    end

    def play
        until board.checkmate?(current_player.color)
        display.render
        current_player.make_move(board)
        swap_turn!
        end
        notify_players
    end
private

def notify_players
    display.render
    puts "Player with #{current_player.color} piece has lost!"
end

def swap_turn!
    @current_player = @current_player == @players[:white] ? @players[:green] : @players[:white]
end


end

if $PROGRAM_NAME == __FILE__
  
end