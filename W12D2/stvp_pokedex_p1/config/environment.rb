# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

#snake_case to camelCase
Jbuilder.key_format camelize: :lower