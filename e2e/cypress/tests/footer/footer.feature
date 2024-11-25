@layout
Feature: Footer

  Background: Footer Background
    Given I am on the landing page

  @smoke @navigation
  Scenario Outline: User navigates throught footer links
    And I see footer
    When I click "<label>"
    Then I should be navigated to "<url>" page

    Examples:
      | label        | url       |
      | Home         | home      |
      | Bookmarks    | bookmarks |
      | Search       | search    |
      | Terms of Use | terms     |

  Scenario: Verify footer includes copyrights
    When the landing page has finished loading
    Then I should see copyrights
