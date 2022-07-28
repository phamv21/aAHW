class Bench < ApplicationRecord
    has_one_attached :photo
    def self.in_bounds(filter)
         # google map bounds will be in the following format:
        # {
        #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
        #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
        # }
        #... query logic goes here
        lat_range = (filter['bounds']['southWest']["lat"].to_r..filter['bounds']['northEast']["lat"].to_r)
        lng_range = (filter['bounds']['southWest']["lng"].to_r..filter['bounds']['northEast']["lng"].to_r)
        seatting_range = (filter['min_seating'].to_i..filter['max_seating'].to_i)
        Bench.where(lat:lat_range).where(lng:lng_range).where(seating:seatting_range)
    end
end
