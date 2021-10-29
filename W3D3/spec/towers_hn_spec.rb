require 'towers_hn'
require 'rspec'

describe TowerHn do
    subject(:towers){TowerHn.new}

    describe "#move" do
        context "move between piles" do
            before(:each) do
                towers.move(0,1)
                towers.move(0,2)
                towers.move(1,2)
            end
            it "steps 0-1, 0-2, 1-2 should be success!" do
                expect(towers.piles).to eq([[3],[],[1,2]])
            end
            it "it should raise error when move from empty pile" do
                expect{towers.move(1,2)}.to raise_error("Can not move between these piles")
            end
        end

    end

    describe "#won?" do
        context "should be win after some moves:" do
            before(:each) do
                towers.move(0,2)
                towers.move(0,1)
                towers.move(2,1)
                towers.move(0,2)
                towers.move(1,0)
                towers.move(1,2)
                towers.move(0,2)
            end
            it "promp that won? is true" do
            expect(towers.won?).to be true
            end
        end
    end

end