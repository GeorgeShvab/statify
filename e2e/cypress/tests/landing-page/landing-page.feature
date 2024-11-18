Feature: Landing page

  Background: Landing page Background
    Given I am on the landing page

  Scenario: Verify lading page content
    When the landing page has finished loading
    And I should see a heading
    And I should see a description
    And I should see a searchbar

  Scenario: Suggest indicators as I type in the search bar
    When I type "GDP" in the searchbar
    Then I should see a list of suggested indicators

  Scenario: Removes search value after I clear it
    When I type "life expectency" in the searchbar
    And clear value
    Then I should see empty search input

  Scenario: Navigates to search page
    When I type "GDP" in the searchbar
    And submit form
    Then I should be navigated to "search" page
