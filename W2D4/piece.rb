require 'singleton'
require 'colorize'


require_relative 'board'
require_relative 'module'

class Piece
    attr_reader :color, :board
    attr_accessor :pos

    def initialize(color,board,pos)
     #color :black or :white
     @color = color
     #@cursor_color = :white
     @board = board
     @pos = pos   
    end

    def to_s
        self.symbol.to_s.colorize(color)
    end

    def valid_moves
        possibilities = self.moves
        possibilities.select{|position| !move_into_check?(position) }
    end
    private
    def move_into_check?(end_pos)
        board_dup = board.dup
        start_pos = pos
        board_dup.move_piece!(color,start_pos,end_pos)
        board_dup.in_check?(color)
        
    end

end

class NullPiece < Piece
    include Singleton
    def initialize
    super(:transparent,nil,nil)
    end

    def symbol
        :_
    end

    def moves
    end

end


class Rook < Piece
include Slideable
    def initialize(color,board,pos)
        super
    end
    def symbol
        "\u2656"
    end
protected
    def move_dirs 
    return "h"
    end
end

class Bishop < Piece
    include Slideable
    def initialize(color,board,pos)
        super
    end
    def symbol
        "\u2657"
    end

protected
    def move_dirs 
    return "d"
    end
end

class Queen < Piece
include Slideable
    def initialize(color,board,pos)
        super
    end
    def symbol
        "\u2655"
    end

protected
    def move_dirs 
    return "a"
    end
end

class Knight < Piece
    include Stepable
    def initialize(color,board,pos)
        super
    end

    def symbol
        "\u2658"
    end

    protected
    def move_diffs
        return "knight"
    end

end

class King < Piece
    include Stepable
    def initialize(color,board,pos)
        super
    end

    def symbol
        "\u2654"
    end

    protected
    def move_diffs
        return "king"
    end
end

class Pawn < Piece
    def initialize(color,board,pos)
    super
    end

    def symbol
        "\u2659"
    end

    def moves
       forward_steps + side_attacks
        
    end
    private
    def at_start_row?
        return true if self.color == :white && self.pos.first == 1
        return true if self.color == :green && self.pos.first == 6
        false
        
    end

    def forward_dir
        a = self.color == :white ? 1 : -1
        a
    end

    def forward_steps
        r,c = self.pos
        if at_start_row?
        [[(r + forward_dir),c],[(r + 2*forward_dir),c]].select{|position| position.all?{|el| el.between?(0,7) && board[position].is_a?(NullPiece)}}
        else
        [[(r + forward_dir),c]].select{|position| position.all?{|el| el.between?(0,7) && board[position].is_a?(NullPiece)}}  
        end
    end

    def side_attacks
            r,c = self.pos
            result = [[(r + forward_dir),c-1],[r + forward_dir,c+1]].select{|position| position.all?{|el| el.between?(0,7) && !board[position].is_a?(NullPiece)}}
            result.select{|position| board[position].color != color}
        result 
    end
end
