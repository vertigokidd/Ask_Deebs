# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
# #
# #   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
# #   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'


sample_tags = ['javascript', 'ruby', 'unix', 'jquery', 'rails', 'sinatra', 'active record']

5.times do
  User.create(email: Faker::Internet.email, name: Faker::Name.name, avatar_url: "http://www.gravatar.com/avatar",
    oauth_token: Faker::PhoneNumber.phone_number, about: Faker::Company.catch_phrase)
end

80.times do
  question = Question.create(title: Faker::Company.bs, content: Faker::Lorem.paragraph, user_id: rand(1..5) )
  question.tags = sample_tags.sample(2).join(",")
end

50.times do
  Answer.create(content: Faker::Company.bs, question_id: rand(1..80), user_id: rand(1..5))
end

100.times do
  Vote.create(like: [true, false].sample, answer_id: rand(1..50), user_id: rand(1..5) )
end



