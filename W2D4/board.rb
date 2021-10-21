require_relative 'piece'
require_relative 'display'
class Board
    attr_reader :row
    def self.fill_with_null
        Array.new(8){Array.new(8){NullPiece.instance}}
    end
    
    def initialize(row = Board.fill_with_null)
        @row = row
        self.popularize if row == Board.fill_with_null
        @null_piece = NullPiece.instance
    end

    def popularize
        #white
        add_piece(Rook.new(:white,self,[0,0]),[0,0])
        add_piece(Rook.new(:white,self,[0,7]),[0,7])
        add_piece(Knight.new(:white,self,[0,1]),[0,1])
        add_piece(Knight.new(:white,self,[0,6]),[0,6])
        add_piece(Bishop.new(:white,self,[0,2]),[0,2])
        add_piece(Bishop.new(:white,self,[0,5]),[0,5])
        add_piece(Queen.new(:white,self,[0,3]),[0,3])
        add_piece(King.new(:white,self,[0,4]),[0,4])
        #pawn
        i = 0
        while i < 8
           add_piece(Pawn.new(:white,self,[1,i]),[1,i]) 
           i += 1
        end



        #green
        add_piece(Rook.new(:green,self,[7,0]),[7,0])
        add_piece(Rook.new(:green,self,[7,7]),[7,7])
        add_piece(Knight.new(:green,self,[7,1]),[7,1])
        add_piece(Knight.new(:green,self,[7,6]),[7,6])
        add_piece(Bishop.new(:green,self,[7,2]),[7,2])
        add_piece(Bishop.new(:green,self,[7,5]),[7,5])
        add_piece(Queen.new(:green,self,[7,3]),[7,3])
        add_piece(King.new(:green,self,[7,4]),[7,4])
        #pawn
        i = 0
        while i < 8
           add_piece(Pawn.new(:green,self,[6,i]),[6,i]) 
           i += 1
        end

    end
    
    def[](pos) 
        r,c = pos
        board[r][c]
    end
    def []=(pos,val)
        r,c = pos
        board[r][c] = val
    end

    def move_piece(color,start_pos,end_pos)
        #wrong board
        if self[start_pos].color != color
        raise "Opps, you play in the wrong side!"
        end
        #error when place is empty
        if self[start_pos] == @null_piece
        raise "can not move from the empty place"
        end
        #wrong move
        unless self[start_pos].valid_moves.include?(end_pos)
            raise "you can not move #{self[start_pos].symbol} like this"
        end

        self[end_pos] = self[start_pos] 
        self[end_pos].pos = end_pos
        self[start_pos] = @null_piece


    end
    def valid?(pos)
        return true if pos.length == 2 &&
        pos.all?{|el| el.between?(0,7)}

        false
    end

    def add_piece(piece,pos)
        self[pos] = piece
    end

    def checkmate?(color)
        same_color = pieces.select{|piece| piece.color == color}
        return true if in_check?(color) && same_color.all?{|piece| piece.valid_moves.empty?}
        false
    end

    def in_check?(color)
        king_pos = find_king(color)

        return true if pieces.any?{|piece| piece.moves.include?(king_pos)}
        
        false
    end

    def find_king(color)
        pieces.each do |piece|
        return piece.pos if piece.is_a?(King) && piece.color == color
        end
    end    

    def pieces
        result = []
        board.each do |r|
            r.each do |piece|
                result << piece.dup unless piece.is_a?(NullPiece) 
            end
        end
        result
    end

    def dup
        board_dup = Board.new
        row_dup = self.row.map{|el| el.map do |c|
            if c.is_a?(NullPiece)
                c
            else
                c.class.new(c.color,board_dup,c.pos)
            end
        end}
         board_dup.change_whole_board(row_dup)
         board_dup
        
    end

    def move_piece!(color,start_pos,end_pos)
        self[end_pos] = self[start_pos] 
        self[end_pos].pos = end_pos
        self[start_pos] = @null_piece
    end
    def change_whole_board(new_row)
        @row = new_row
    end
    private
    alias :board :row

    


end


if $PROGRAM_NAME == __FILE__

end