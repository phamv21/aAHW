require 'rspec'
require 'lru_cache'

describe LRUCache do
    describe "#add" do
        subject (:johnny_cache){LRUCache.new(4)}
        context "should handle the cache smaller than size" do
            before(:each) do
                johnny_cache.add("I walk the line")
                johnny_cache.add(5)
            end
            it "should return the count that equal to 2" do
                expect(johnny_cache.count).to eq(2)
            end
        end


        context 'show the right prints' do
            before(:each) do
                johnny_cache.add([1,2,3])
                johnny_cache.add(5)
                johnny_cache.add(-5)
                johnny_cache.add({a: 1, b: 2, c: 3})
                johnny_cache.add([1,2,3,4])
                johnny_cache.add("I walk the line")
                johnny_cache.add(:ring_of_fire)
                johnny_cache.add("I walk the line")
                johnny_cache.add({a: 1, b: 2, c: 3})
            end
            it "should print 4 caches" do
                expect(johnny_cache.show).to eq(print [[1, 2, 3, 4], :ring_of_fire, "I walk the line", {:a=>1, :b=>2, :c=>3}])
            end
        end
        
    end
end