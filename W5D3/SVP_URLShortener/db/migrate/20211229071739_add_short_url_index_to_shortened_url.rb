class AddShortUrlIndexToShortenedUrl < ActiveRecord::Migration[6.1]
  def change
    add_index :shortened_urls, :short_url
  end
end
