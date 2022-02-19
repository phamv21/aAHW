class PostSub < ApplicationRecord
    belongs_to :post#,optional: true
    belongs_to :sub#, optional: true
end
