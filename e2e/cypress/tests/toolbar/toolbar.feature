Feature: Toolbar functionality

  Background: Toolbar background
    Given I am on the search page

  Scenario: Suggest indicators as I type in the search bar
    When I type "GDP" in the searchbar
    Then I should see a list of suggested indicators

  Scenario: Removes search value after I clear it
    When I type "life expectency" in the searchbar
    And clear input value
    Then I should see empty search input

  Scenario: Navigates to search page
    When I type "GDP" in the searchbar
    And submit form
    Then I should be navigated to "search" page

  Scenario: User navigates to bookmarks page
    And I see footer
    When I click "Bookmarks"
    Then I should be navigated to "bookmarks" page
