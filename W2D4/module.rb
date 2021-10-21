module Slideable

    HORIZONTAL_DIRS = []
    DIAGONAL_DIRS = []
    
    

    def horizontal_dirs
        hor_dir = []
        r,c = self.pos
        #vertical up
        (1..7).each do |el|
            break if (r - el) < 0
            if self.board[[r - el,c]].is_a?(NullPiece)
                hor_dir << [r-el,c]
            elsif self.board[[r - el,c]].color != self.color 
                 hor_dir << [r-el,c]
                 break
            else
                break
            end
    
        end


        #vertical down
        (1..7).each do |el|
            break if (r + el) > 7
            if self.board[[r + el,c]].is_a?(NullPiece)
                hor_dir << [r + el,c]
            elsif self.board[[r + el,c]].color != self.color
                hor_dir << [r + el,c]
                break
            else
                break
            end
        end

        #horizontial left
        (1..7).each do |el|
            break if (c - el) < 0
             if self.board[[ r,c - el]].is_a?(NullPiece)
                hor_dir << [r,c - el]
             elsif self.board[[ r,c - el]].color != self.color
                hor_dir << [r,c- el]
                break
             else
                break
             end
         end
        
        #horizontial right
        (1..7).each do |el|
            break if (c + el) > 7

            if self.board[[ r,c + el]].is_a?(NullPiece)
                 hor_dir << [r,c + el]
            elsif self.board[[ r,c + el]].color != self.color 
                hor_dir << [r,c + el]
                break
            else
                break
            end
         end
    
        hor_dir
    end

    def diagonal_dirs
        dia_dir = []
        r,c = self.pos

        #1 
        (1..7).each do |el|
            break if (r-el) < 0 || (c-el) < 0
            if  self.board[[r-el,c-el]].is_a?(NullPiece)
                dia_dir << [r-el, c-el]
            elsif self.board[[r-el,c-el]].color != self.color
                dia_dir << [r-el, c-el]
                break
            else
                break
            end 
        end
        #2
        (1..7).each do |el|
            break if (r-el) < 0 || (c+el) > 7
            if self.board[[r-el,c+el]].is_a?(NullPiece)
                dia_dir << [r-el, c+el]
            elsif self.board[[r-el,c+el]].color != self.color
            dia_dir << [r-el, c+el] 
            break
            else
                break
            end
        end
        #3
        (1..7).each do |el|
            break if (r+el) > 7 || (c+el) > 7
            if self.board[[r+el,c+el]].is_a?(NullPiece)
                dia_dir << [r+el, c+el] 
            elsif self.board[[r+el,c+el]].color != self.color
                dia_dir << [r+el, c+el] 
                break
            else
                break
            end
        end
        #4
        (1..7).each do |el|
            break if (r+el) > 7 || (c-el) < 0
            if self.board[[r+el,c-el]].is_a?(NullPiece)
            elsif self.board[[r+el,c-el]].color != self.color
                dia_dir << [r+el, c-el]
                break 
            else
                break
            end 
        end

        dia_dir
    end

    #return an array of possible moves
    def moves
        case move_dirs
        when "h"
           horizontal_dirs
        when "d"
            diagonal_dirs
        when "a"
            diagonal_dirs + horizontal_dirs
        end
    end
    private
    #direction of each one
    
    def grow_unblocked_moves_in_dir(dx,dy)
        
    end


    
end

module Stepable

    def moves
        r,c = self.pos 
        result = []

        case move_diffs
        when "knight"
        possibilities = ([r-2,r+2].product([c-1,c+1]))+([r-1,r+1].product([c-2,c+2]))
        possibilities.select!{|position| position.all?{|el| el.between?(0,7)}}
        result = possibilities.select{|position| self.board[position].color != self.color }    
        
        when "king"
            possibilities = [r-1,r,r+1].product([c-1,c,c+1])
            possibilities.select!{|position| position.all?{|el| el.between?(0,7)}}
            result = possibilities.select{|position| self.board[position].color != self.color }
        end
    end


    private
    #direction of each one

    
end
