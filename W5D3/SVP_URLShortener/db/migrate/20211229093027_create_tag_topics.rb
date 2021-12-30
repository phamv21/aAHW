class CreateTagTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_topics do |t|
      t.string :tag_topic
      t.timestamps
    end
    add_index :tag_topics, :tag_topic, unique: true
  end
end
