Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
    When I login as: "walker@jw.com", "password"
    When I wait about "2" second
  Scenario Outline: User creating test
    When I go to "Create User" menu item
    When I wait about "1" second
    When I fill user form:
      """
      email: "tanya_shuleiko@mail.ru"
      password: '12345678'
      Address: 'Rustaveli 20-21'
      Address2: 'flor 4'
      City: 'Minsk'
      Zip: 220088
      Description: 'test user'
      """
      When I wait about "2" second
      Then I expect title have text: "List of Users"


