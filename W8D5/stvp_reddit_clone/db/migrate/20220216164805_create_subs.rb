class CreateSubs < ActiveRecord::Migration[6.1]
  def change
    create_table :subs do |t|
      t.string :title, null: false
      t.integer :user_id, null: false, index: true #moderator
      t.string :description
      t.timestamps
    end
  end
end
