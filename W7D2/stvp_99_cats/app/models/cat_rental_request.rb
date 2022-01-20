class CatRentalRequest < ApplicationRecord
    STATUS = ['PENDING','DENIED','APPROVED']
    validates :start_date, :end_date, :status, presence: true
    validates :status, inclusion: {
        in: STATUS,
        message: "wrong status-  #{STATUS.join(" ")} only"
    }
    

    validate :start_date_should_be_smaller_than_end_date
    validate :does_not_overlapping_approved_requests
    
    def overlapping_requests
        requests = CatRentalRequest
        .where("cat_rental_requests.end_date BETWEEN ? AND ? OR cat_rental_requests.start_date BETWEEN ? AND ?",self.start_date,self.end_date,self.start_date,self.end_date)
    end

    def overlapping_approved_requests
        self.overlapping_requests.where(status:'APPROVED').where.not(id:self.id)
    end

    def overlapping_pending_requests
        self.overlapping_requests.where(status:'PENDING').where.not(id:self.id)
    end

    def approve!
        CatRentalRequest.transaction do
            self.status = "APPROVED"
            self.save
            overlapping_pending_requests.each do |el|
                el.status = "DENIED"
            end
        end
    end
    def deny!
        self.status = "DENIED"
        self.save
    end
    def pending?
        self.status == "PENDING"
    end

    belongs_to :cat

    private
    def does_not_overlapping_approved_requests
        if self.overlapping_approved_requests.exists?
            errors[:overlap] << 'Overlapping approved request'
        end
    end

    def start_date_should_be_smaller_than_end_date
        if end_date.nil? || start_date.nil? || self.end_date < self.start_date
            errors[:time] << 'Start date should be smaller than return date'
        end
    end
    
end