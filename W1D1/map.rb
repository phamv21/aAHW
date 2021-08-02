class Map
    attr_reader :data
    def initialize
      @data = []
    end

    def set(k,v)
        if get(k).nil?
            data << [k,v]
        else
            raise "this key already has value"
        end
      
    end

    def get(k)
        result = nil
      data.each do |el|
        result = el[1] if el[0] == k
      end
      result
    end

    def delete(k)
      if get(k).nil?
          return nil
      else
          data.delete([k,get(k)])
      end
    end
  end