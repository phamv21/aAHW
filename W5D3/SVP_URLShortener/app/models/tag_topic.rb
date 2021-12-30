class TagTopic < ApplicationRecord
    has_many(
        :taggings,
        class_name: 'Tagging',
        foreign_key: :tag_topic_id,
        primary_key: :id
    )
    has_many(
        :shortened_urls,
        through: :taggings,
        source: :shortened_url
    )
    def popular_links
        # urls is the array of shortened urls in which belong to the ShortenedUrl class
        urls = self.shortened_urls
        result = {}
        urls.each do |el|
            result[el] = el.num_clicks
        end
        result.sort_by{|u,num|-num}[0..4]

    end
end