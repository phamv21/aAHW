# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Artwork.destroy_all
ArtworkShare.destroy_all
users = User.create([{username:'Steve'},{username:'Julia'}])
steve_art1 = Artwork.create(title:'Moon',image_url:'http1',artist_id:users.first.id)
julia_art1 = Artwork.create(title:'Sun',image_url:'http2',artist_id:users[1].id)
shared_arts = ArtworkShare.create([{viewer_id:users.first.id,artwork_id:steve_art1.id},{viewer_id:users.first.id,artwork_id:julia_art1.id},{viewer_id:users[1].id,artwork_id:steve_art1.id},{viewer_id:users[1].id,artwork_id:julia_art1.id}])
