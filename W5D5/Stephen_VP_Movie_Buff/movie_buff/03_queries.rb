def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  command = those_actors.join(" AND actors.name = ") 

  Actor
    .where(name: those_actors)
    .joins(:movies)
    .select('movies.id,movies.title')
    .group('movies.id,movies.title')
    .having('COUNT(*) > 1')

    
end

def golden_age
  # Find the decade with the highest average movie score.
  year = Movie
    .select('movies.yr/10 AS decade, AVG(movies.score) as average')
    .group('decade')
    .order('average DESC').limit(1)

    year[0].decade * 10

end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  
 Actor
 .select(:name)
 .where.not(name:name)
 .where(id:Casting.select('castings.actor_id AS id')
 .where(movie_id:Casting.where(actor_id:Actor.select(:id).where(name: name)).select(:movie_id))).order(:name)
 .map{|el| el.name}


end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie
Actor.where.not(id:Casting.select('castings.actor_id as id')).length
end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"
  expression = "%"+(whazzername.split("")).join("%")+"%"
  
  Movie
  .select('movies.*')
  .joins(:actors)
  .where('LOWER(actors.name) LIKE LOWER(?)',expression)
  
  

end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.
  Actor
    .select(:id,:name,'MAX(movies.yr) - MIN(movies.yr) AS career')
    .joins(:movies)
    .group('actors.id')
    .order("career DESC, actors.name ASC").limit(3)

end
