class AddPollIdToQuestions < ActiveRecord::Migration[6.1]
  def change
    remove_index :questions, name: "index_questions_on_text_and_pool_id"
    remove_column :questions, :pool_id
    add_column :questions, :poll_id, :integer
    add_index :questions,[:text,:poll_id],unique: true 
  end
end
