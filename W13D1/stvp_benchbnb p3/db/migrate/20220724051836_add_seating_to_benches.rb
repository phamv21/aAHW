class AddSeatingToBenches < ActiveRecord::Migration[6.1]
  def change
    add_column :benches, :seating, :integer
  end
end
