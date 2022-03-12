require 'json'

class Flash
    attr_reader :change
    attr_accessor :flash_value
    def initialize(req)
        val = JSON.load(req.cookies["_rails_lite_app_flash"])
        @flash_value = val.nil? ? {} : val
        @change = false
    end

    def [](key)
        @flash_value[key.to_s]
    end

    def []=(key,value) #should save the value to the next section 
        @flash_value[key.to_s] = value
        @change = true
    end

    def now
        @flash_value
    end

    def store_flash(res)
        @flash_value = {} unless change
        flash = {path:"/",value:flash_value.to_json}
        res.set_cookie("_rails_lite_app_flash",flash)
    end

    


#flash.now is to call the curent value of the flash
#

end
