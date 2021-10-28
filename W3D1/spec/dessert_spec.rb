require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef") }
  let(:dessert2) {Dessert.new("cake",10,chef)} 
  subject (:dessert) {Dessert.new("cake",10,"stephen")}
  
  describe "#initialize" do
    it "sets a type" do
    expect(dessert.type).to eq("cake")
    end
    it "sets a quantity" do
    expect(dessert.quantity).to eq(10)
    end
    it "starts ingredients as an empty array" do
    expect(dessert.ingredients).to eq([])
    end

    it "raises an argument error when given a non-integer quantity" do
    expect{Dessert.new("cake","10","stephen")}.to raise_error(ArgumentError)
    end

  end

  describe "#add_ingredient" do
    it "adds an ingredient to the ingredients array" do
    dessert.add_ingredient("sugar")
    expect(dessert.ingredients).to include("sugar")
    end
  end

  describe "#mix!" do
    it "shuffles the ingredient array" do
      dessert.add_ingredient(1)
      dessert.add_ingredient(2)
      dessert.add_ingredient(3)
      expect(dessert.ingredients).to eq([1,2,3])
      dessert.mix!
      expect(dessert.ingredients).to_not eq([1,2,3])
    end
  end

  describe "#eat" do
    it "subtracts an amount from the quantity" do 
      expect(dessert.eat(1)).to eq(9)
    end

    it "raises an error if the amount is greater than the quantity" do
    expect{dessert.eat(11)}.to raise_error("not enough left!")
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
    expect(dessert.serve).to include("Stephen")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      expect(chef).to receive(:bake).with(dessert2)
      dessert2.make_more
    
    end
  end
end
