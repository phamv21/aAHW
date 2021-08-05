require_relative 'polytreenode'
class KnightPathFinder
    attr_reader :root_note , :consider_positions
    def initialize(begin_position)
        @root_note = PolyTreeNode.new(begin_position)
        @consider_positions = [begin_position]
        self.build_move_tree
    end

    def self.valid_moves(position)
        x,y = position
        alter = [[x+1,y+2],[x+1,y-2],[x-1,y+2],[x-1,y-2],[x+2,y-1],[x+2,y+1],[x-2,y-1],[x-2,y+1]]
        alter.select{|el| el.all?{|pair| pair.between?(0,7)}}
    end


    def new_move_positions(position)
        all_positions = KnightPathFinder.valid_moves(position)
        new_positions = all_positions.select{|pos| consider_positions.none?{|el| el == pos}}
        @consider_positions.push(*new_positions)
        new_positions
    end


    def build_move_tree
        queue = [@root_note]
        until queue.empty?
            first = queue.shift
            new_positions = new_move_positions(first.value)
            new_nodes = new_positions.map do |pos| 
                node = PolyTreeNode.new(pos)
                node.parent = first
                node
            end
            queue.push(*new_nodes)
        end
    end

    def find_path
        
    end



end
