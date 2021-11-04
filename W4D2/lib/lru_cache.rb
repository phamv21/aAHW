class LRUCache
    def initialize(size)
        @cache  = Array.new
        @size = size
    end

    def count
        @cache.size
    end

    def add(el)
        delete_duplicate(el)
        @cache << el
        delete_old_cache
    end

    def show
        print @cache
    end

    private

    def delete_old_cache
        @cache.shift if count > @size
    end
    def delete_duplicate(el)
        @cache.delete(el)
    end

end