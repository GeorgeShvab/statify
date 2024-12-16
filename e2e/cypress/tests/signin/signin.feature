Feature: Signin page for admin

  Background: Signin page background
    Given I am on the signin page

  Scenario: Invalid credentials
    When I type invalid email
    And I type invalid password
    And I submit form
    Then Invalid credentails message should be displayed

  Scenario: Successfull signin
    When I type george@shvab.com email
    And I type 111111111111 password
    And I submit form
    Then I should be navigated to "indicators" page
    And I should be logged in
