class AddAddressToHouses < ActiveRecord::Migration[6.1]
  def change
    add_column :houses , :address, :string, null: false
    remove_column :houses, :adress
  end
end
