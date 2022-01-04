class CreateAnswerChoices < ActiveRecord::Migration[6.1]
  def change
    create_table :answer_choices do |t|
      t.string :text
      t.integer :question_id
      t.timestamps
    end
    add_index :answer_choices, [:text,:question_id], unique: true
  end
end
