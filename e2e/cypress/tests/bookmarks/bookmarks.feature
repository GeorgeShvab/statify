Feature: Bookmarks

  @smoke
  Scenario: Bookmarks page content is displayed correctly
    Given I am on the bookmarks page
    When the bookmarks page has finished loading
    Then I should see title
    And I should see bookmark

  @feature
  Scenario Outline: Bookmark can be removed
    Given I am on the bookmarks page
    When I navigate to "<indicator>" indicator page
    And I open indicator actions
    And I unbookmark the indicator
    And I navigate back to bookmarks page
    Then indicator "<indicator>" should not be bookmarked

    Examples:
      | indicator                   |
      | Population                  |
      | United Kingdom - Birth rate |

  @feature
  Scenario Outline: Bookmark can be added to the bookmarks
    Given I am on the <indicatorId> indicator page of <countryId> country
    When I open indicator actions
    And I bookmark indicator
    And I navigate back to bookmarks page
    Then indicator "<indicator>" should be bookmarked

    Examples:
      | indicator           | indicatorId    | countryId |
      | GDP                 | NY.GDP.MKTP.CD | null      |
      | United States - GDP | NY.GDP.MKTP.CD | USA       |
