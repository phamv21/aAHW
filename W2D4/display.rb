require_relative 'board'
require_relative 'cursor'
require 'colorize'
class Display
attr_reader :cursor, :board
    def initialize(board)
        @board = board
        @cursor = Cursor.new([0,0],board)
    end

    def render
        symbol_array = []
        board.row.each do |row|
            symbol_array << row.map{|piece| piece.to_s}
        end
        x,y = cursor.cursor_pos
        symbol_array[x][y] = symbol_array[x][y].colorize(:background => cursor.select ? :red : :blue )
        symbol_array.each do |row|
            print row.join("  ")
            puts ""
            puts ""
        end

    end
    
end


