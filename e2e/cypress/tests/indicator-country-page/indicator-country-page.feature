Feature: Indicator page for specific country

  Background: Indicator country page background
    Given I am on the indicator country page

  @smoke
  Scenario: Indicator country page content is displayed correctly
    When the indicator country page has finished loading
    Then I should see indicator title
    And I should see indicator description
    And I should chart
    And I should see table

  @feature
  Scenario Outline: Sorting works as expected
    When I choose sorting by <criteria> in <direction> order
    Then I should see data sorted by <criteria>
    And the data should be sorted in <direction> order

    Examples:
      | criteria | direction |
      | year     | asc       |
      | value    | desc      |

  @feature
  Scenario: Range changing works as expected
    When I set min range to 2005
    And I set max range to 2010
    Then min range should be 2005
    And max range should be 2010

  @feature
  Scenario Outline: Datasets downloading works as expected
    When I open indicator actions
    And I download dataset in <format> format
    Then "GDP. United States" dataset should be downloaded in <format> format

    Examples:
      | format |
      | csv    |
      | xlsx   |
