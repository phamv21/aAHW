require_relative 'display'

class Player
    attr_reader :display, :color
    def initialize(color,display)
        @color = color
        @display = display
        
    end
    
end


class HumanPlayer < Player
    def make_move(board)
        #board.move_piece(c,s,e)
        #render
        begin
        start_pos =[]
        end_pos =[]
        until !(start_pos.empty? || end_pos.empty?)
        pos = display.cursor.get_input
        start_pos = pos unless pos.nil? || !start_pos.empty?
        end_pos = pos unless pos.nil? || !end_pos.empty? || start_pos == pos
        display.render
        puts "#{self.color} turn"
        end
        #when toggle - get the start pos 
        board.move_piece(color,start_pos,end_pos)
        rescue => e
            puts "#{e.message}"
            puts "please try again"
        retry 

        end
    end
    
end

class ComputerPlayer < Player
    
end