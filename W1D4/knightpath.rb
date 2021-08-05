require_relative 'polytreenode'
class KnightPathFinder
    attr_reader :root_note , :consider_positions
    def initialize(begin_position)
        raise "invalid position" unless valid_pos?(begin_position)
        @root_note = PolyTreeNode.new(begin_position)
        @consider_positions = [begin_position]
        @start_postion = begin_position
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

    def find_path(target)
        raise "invalid position" unless valid_pos?(target)
        find_result = root_note.bfs(target)
        return "it is impossible to move from #{start_postion} to #{target}" if find_result.nil?
        path =[find_result.value]
        parent_trace = find_result.parent
        until !parent_trace
            path.unshift(parent_trace.value) unless parent_trace.nil?
            parent_trace = parent_trace.parent
        end
        path
    end

    def valid_pos?(position)
        position.is_a?(Array)&&position.length == 2&&
        position.all?{|el| el.between?(0,7)}
    end



end

s = KnightPathFinder.new([1,7])
p s.find_path([5,3])