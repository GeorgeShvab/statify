Feature: Search page

  Background: Search page Background
    Given I am on a search page

  Scenario: I see search results
    When I type "GDP" in the searchbar
    And submit form
    Then I should see at least one result

  Scenario: I open indicator page of the first indicator of the results
    When I type "GDP" in the searchbar
    And submit form
    And I click on the first indicator of the results
    Then I should be navigated to "indicator" page
