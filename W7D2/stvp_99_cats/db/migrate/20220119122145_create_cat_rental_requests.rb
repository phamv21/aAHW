class CreateCatRentalRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :cat_rental_requests do |t|
      t.integer :cat_id, null: false
      t.date :start_date, null: false
      t.date :end_date
      t.string :status,null:false, default: 'PENDING'
      t.timestamps
    end
  end
end
