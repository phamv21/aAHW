class Cat < ApplicationRecord
    CAT_COLOR = ["black","white","pink","red"]
    validates :name,:color,:sex,:description,:birth_date, presence: true
    validates :color, inclusion: {
        in: CAT_COLOR,
        message: "wrong color choice in #{CAT_COLOR.join(" ")}"
    }
    validates :sex, inclusion: {
        in: %w(M F),
        message: "Only M(ale) or F(emale)"
    }
    validate :can_not_born_in_future
    def age # month old
        current_time = Time.now
        result = (current_time.year*12 + current_time.month) -(self.birth_date.year*12 + self.birth_date.month)
    end

    has_many :cat_rental_requests, dependent: :destroy
    private
    def can_not_born_in_future
        current_time = Time.now
        if birth_date > current_time
            errors << 'Cat should have birth date in the past'
        end
    end
    
end