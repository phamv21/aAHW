
class PolyTreeNode
    attr_reader :value, :parent, :children


    def initialize(value)
        @parent = nil
        @children = []
        @value = value
    end

    def parent=(parent_node)  
        unless parent_node.nil?
            if parent.nil?
            @parent = parent_node
            parent_node.children = self
            else    
                parent.remove_child(self)
                self.parent = parent_node
            end
        else
            @parent = nil
        end
    end

    def children=(c)
        @children << c unless children.any?{|child| child == c}
    end

    def remove_child(c)
        raise "#{c.value} is not a child of this note" unless children.any?{|child| child == c}
        c.parent = nil
        @children.delete(c)
    end

    def add_child(c)
        c.parent = self
    end

    def dfs(target) 
        return self if self.value == target 
        return nil if self.children = [] 
        self.children.each do |child|
            return child.dfs(target) unless child.dfs(target).nil?
            nil
        end
        
    end

end
