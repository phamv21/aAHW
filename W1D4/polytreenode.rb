class PolyTreeNode
    attr_reader :parent, :children, :value
    def initialize(position)
        @parent = nil
        @children = []
        @value = position
    end

    def parent=(parent_node)
       if parent_node.nil?
           @parent = nil
       else
           if parent.nil?
               @parent = parent_node
                parent.children = self
           else
               parent.remove_child(self)
               parent_node.children = self
           end
       end
        
    end

    def children=(children_node)
        @children << children_node unless children.any?{|child| child == children_node}
    end

    def remove_child(children_node)
        raise "invalid child" if children.none?{|child| child == children_node}
        children_node.parent = nil
        @children.delete(children_node)
    end
    def add_child(children_node)
        children_node.parent = self
    end

    def bfs(target_position)
        result = nil
        queue = [self]
        until queue.empty?
            first = queue.shift
          return result = first if first.value == target_position  
            queue.push(*first.children)
        end
        result
    end




end