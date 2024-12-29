Feature: Indicator page

  Background: Indicator page background
    Given I am on the indicator page

  @smoke
  Scenario: Indicator page content is displayed correctly
    When the indicator page has finished loading
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
      | country  | asc       |
      | value    | desc      |

  @feature
  Scenario: Country can be added to the chart
    When I open chart manager
    And I add "Ukraine" to the chart
    And I close chart manager
    Then "Ukraine" should be added to the chart

  @feature
  Scenario: Country can be removed from the chart
    When I open chart manager
    And I add "Ukraine" to the chart
    And I remove "Ukraine" from the chart
    And I close chart manager
    Then "Ukraine" should not be added to the chart

  @feature
  Scenario: Search inside of chart manager works as expected
    When I open chart manager
    And I type ukraine in a searchbar
    Then I should see ukraine among results

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
    Then "GDP" dataset should be downloaded in <format> format

    Examples:
      | format |
      | csv    |
      | xlsx   |
