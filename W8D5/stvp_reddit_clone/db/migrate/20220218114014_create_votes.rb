class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :user_id, null:false, index: true
      t.integer :value, inclusion:-1..1
      t.references :votable, polymorphic: true
      t.timestamps
    end
    add_index :votes, [:user_id,:votable_id,:votable_type], unique: true, name:'votes_value_unique'
  end
end
