# PHASE 2
def convert_to_int(str)
  Integer(str)
end

# PHASE 3
FRUITS = ["apple", "banana", "orange"]

def reaction(maybe_fruit)
  if FRUITS.include? maybe_fruit
    puts "OMG, thanks so much for the #{maybe_fruit}!"
  elsif maybe_fruit == "coffee"
    raise StandardError.new("Sweet! Another chance")  
  else
    raise StandardError.new("I don't like it.\nThis is forbidden fruits!")
  end 
end

def feed_me_a_fruit
    puts "Hello, I am a friendly monster. :)"
    puts "Feed me a fruit! (Enter the name of a fruit:)"
  begin
    maybe_fruit = gets.chomp
    reaction(maybe_fruit) 
  rescue StandardError => e
    puts "#{e.message}"
    if e.message == "Sweet! Another chance"
      puts "It is coffee!!!"
      retry
    end
  end

end  

# PHASE 4
class BestFriend
  def initialize(name, yrs_known, fav_pastime)
    @name = parse_string(name)
    @yrs_known = known_time(yrs_known)
    @fav_pastime = parse_string(fav_pastime)
  end
  def known_time(year)
    raise StandardError.new("Not long enough to call Best_friend") if year < 5
    return year
  end
  def parse_string(string)
    raise StandardError.new("Name and pastime can not be empty") if string.length < 1
    return string
  end

  def talk_about_friendship
    puts "Wowza, we've been friends for #{@yrs_known}. Let's be friends for another #{1000 * @yrs_known}."
  end

  def do_friendstuff
    puts "Hey bestie, let's go #{@fav_pastime}. Wait, why don't you choose. 😄"
  end

  def give_friendship_bracelet
    puts "Hey bestie, I made you a friendship bracelet. It says my name, #{@name}, so you never forget me." 
  end
end


