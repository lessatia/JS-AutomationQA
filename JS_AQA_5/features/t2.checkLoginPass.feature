Feature: Check Login
I need to check some username and Password  
  
     Scenario Outline: Check login users and passwords
     When I go to website "https://viktor-silakov.github.io/course-sut/"
     When I log in as: "<login>", "<password>"
     When I wait about "1" second
     Then I get "<text>" answer
     Examples:
      | login|password| text|
      | walker@jw.com|password1| Fail to login|
      | walker@jw.com ||Password is empty |
      ||password|Login is empty |
      |old_walker@jw.com|password1| The user is suspended |
      |password|walker@jw.com|Fail to login|
      |admin|admin|Fail to login|
      |user|123|Fail to login|
      |dlink|dlink|Fail to login|
      |user||Password is empty|
      |admin||Password is empty|
      |||Login is empty|

