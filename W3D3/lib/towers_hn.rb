class TowerHn
    attr_reader :piles, :size
    def initialize
        @piles =[[1,2,3],[],[]]
        @size = piles[0].length
    end

    def move(start_pile,end_pile)
        if valid_move?(start_pile,end_pile)
        move_disk = piles[start_pile].shift
        piles[end_pile].unshift(move_disk)
        else
            raise "Can not move between these piles"    
        end
        
    end

    def play
        until won?
             p piles
            begin
                start_pile = get_index("put your start pile")
                end_pile = get_index("put your end pile")
                move(start_pile,end_pile)
            rescue =>e
                puts e.message
            retry
            end
        end
        puts "congratulation"
        p piles
    end

    def won?
        piles[2].length == size
    end


    def valid_move?(start_pile,end_pile)
        
        start_array = piles[start_pile].dup
        end_array = piles[end_pile].dup
        return false if start_array.empty?
        move_disk = start_array.shift
        end_array.unshift(move_disk)

        end_array == end_array.sort
        
    end

    def get_index(promt)
        while true
            index = 0
            begin 
            puts promt
            index = gets.chomp.to_i
            rescue => e
            puts "you should enter a number"
            retry
            end
            return index if index.between?(0,2)
            puts "it should in 0-2 range"
        end
    end


end

