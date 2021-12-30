# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_30_093003) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "shortened_urls", force: :cascade do |t|
    t.string "long_url"
    t.string "short_url"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["short_url"], name: "index_shortened_urls_on_short_url"
  end

  create_table "tag_topics", force: :cascade do |t|
    t.string "tag_topic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_topic"], name: "index_tag_topics_on_tag_topic", unique: true
  end

  create_table "taggings", force: :cascade do |t|
    t.integer "tag_topic_id"
    t.integer "shortened_url_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shortened_url_id"], name: "index_taggings_on_shortened_url_id"
    t.index ["tag_topic_id"], name: "index_taggings_on_tag_topic_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
    t.boolean "premium", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "visits", force: :cascade do |t|
    t.integer "shortened_url_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shortened_url_id"], name: "index_visits_on_shortened_url_id"
  end

  create_table "votings", force: :cascade do |t|
    t.integer "user_id"
    t.integer "shortened_url_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shortened_url_id", "user_id"], name: "index_votings_on_shortened_url_id_and_user_id", unique: true
  end

  create_table "vottings", force: :cascade do |t|
    t.integer "user_id"
    t.integer "shortened_url_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shortened_url_id", "user_id"], name: "index_vottings_on_shortened_url_id_and_user_id", unique: true
  end

end
