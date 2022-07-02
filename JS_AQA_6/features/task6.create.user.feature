Feature: User's Subscription creation

  Background:
    When I go to site "https://viktor-silakov.github.io/course-sut/?quick"
    When I log In as: "walker@jw.com", "password"
    When I wait somewhere "2" second
  Scenario Outline: User creating test
    When I go to "Create User" menue item
    When I wait somewhere "1" second
    When I enter data in user form:
      """
      email: <email>
      password: <password>
      Address: <Address>
      Address2: <Address2>
      City: <City>
      Zip: <Zip>
      Description: <Description>
      Annual_payment: <Annual_payment>
      Years: <Years>
      Description2: <Description2>
      Plan: <Plan>
      """
    When I wait somewhere "1" second
    Given amount annual is "<Annual_payment>"
    And user payment time is "<Years>"
    When I wait somewhere "2" second
    Then I check Total amount in the tables in: "walker@jw.com", "password"
      Examples:
    |email|password|Address|Address2|City|Zip|Description|Annual_payment|Years|Description2|Plan|
    |tanya_shuleiko@mail.ru|123|Pervomayskaya Str|flor 4|Minsk|220088|like books|100|1|full payment|Education|
    |lessatea@gmail.com|456|Kypaly Str|flor 2|Homel|270011|can breathe through the eyes|200|2|half payment|Premium|
    |kuzaka@tut.by|789|Moskowskaya Str|flor 12|Brest|110056|wants to buy a dog|300|2|month payment|Enterprise|


   
      
      
    
    