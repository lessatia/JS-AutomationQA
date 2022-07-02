Feature: ATM withdraw
 As an Account Holder
  In Order to get money
  I want to withdraw cash from an ATM

  Scenario Outline: Account has certain  properly amount of money
  Given my account balance is "<amount>"
  And the ATM contains "<ATMcontains>"
    When I withdraw "<cash>"
    Then I get "<text>" message
            Examples:
      | amount|ATMcontains| cash | text                                    |
      | 500   | 600       | 50   | Take your money!                      |
      | 500   |600        | 550  | You don't have enough money!          |
      | 500   |150        | 300  | The machine is not have enough money! |


