Feature: Lading page

  Scenario: Verify lading page content
    Given I am on the landing page
    When the page has finished loading
    And I should see a heading
    And I should see a description
    And I should see a searchbar
