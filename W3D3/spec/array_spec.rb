require 'array'
require 'rspec'

describe Array do
    subject(:array1){[1,2,1,3,3,1,2,1,3,3,2,2,2,1,4]}
    subject(:array1_check){[1,2,3,4]}
    subject(:array2){[-1,0,2,-2,1]}
    subject(:array2_check){[[0,4],[2,3]]}
    subject(:array3){[
        [0,1,2,8],
        [3,4,5,8],
        [6,7,8,8]
    ]}
    subject(:array3_check){[
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [8,8,8]
    ]}

    subject(:array4){[1,2,3,10]}
    subject(:array5){[10,9,1,4]}

    describe "#my_uniq" do
    it "take any array and return a new array with unique elements" do
        expect(array1.my_uniq).to eq(array1_check)
    end
    end
    describe "#two_sum" do
    it "take an array and return a pair of index has sum as zero" do
        expect(array2.two_sum).to eq(array2_check)
    end
    end
    describe "#my_transpose" do
        it "transpose a two dimensional array" do
            expect(array3.my_transpose).to eq(array3_check)
        end
    end
    describe "#stock_picker" do
    it "choose the most profitable pair of days" do 
        expect(array4.stock_picker).to eq(9)
        expect(array5.stock_picker).to eq(3)
    end
    end

end