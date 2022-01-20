class AddIndexToCatRentalRequests < ActiveRecord::Migration[6.1]
  def change
    add_index :cat_rental_requests, :cat_id
  end
end
