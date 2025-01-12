@page
Feature: Values dashboard

  Background: Values dashboard background
    Given I am on values dashboard page

  @smoke
  Scenario: Values dashboard content is displayed correctly
    When the values dashboard page has finished loading
    Then I should see dashboard title
    And I should see dashboard subtitle
    And I should see dashboard tools
    And I should see dashboard table

  @feature
  Scenario Outline: Sorting functionality works as expected
    When I open sort dropdown
    And I select value sorting by "<criteria>"
    Then I should see values sorted by "<criteria>"

    Examples:
      | criteria       |
      | id             |
      | indicator id   |
      | country id     |
      | date of update |

  @feature
  Scenario Outline: Sorting direction switching works as expected
    When I choose "<direction>" sort direction
    Then I should see rows sorted in "<direction>" order

    Examples:
      | direction |
      | asc       |
      | desc      |

  @feature
  Scenario Outline: Filtering by indicator works as expected
    When I open indicator dropdown
    And I select "<indicator>"
    Then I should see only values associated with "<indicator>" indicator

    Examples:
      | indicator      |
      | all indicators |
      | gdp            |
      | population     |

  @feature
  Scenario Outline: Filtering by country works as expected
    When I open country dropdown
    And I select "<indicator>"
    Then I should see only values associated with "<indicator>" country

    Examples:
      | indicator      |
      | all countries  |
      | united kingdom |
      | france         |

  @feature
  Scenario: Country select search works as expected
    When I open country dropdown
    And I type "France" in country select search field
    Then 2 options should be displayed in opened select dropdown

  @feature
  Scenario: Indicator select search works as expected
    When I open indicator dropdown
    And I type "Land area" in indicator select search field
    Then 2 options should be displayed in opened select dropdown

  @feature
  Scenario: Data refresh works as expected
    When I refresh values table data
    Then I should see refreshed data

  @feature
  Scenario: Filters clearing works as expected
    Given I already applied some value filters
    When I clear filters
    Then I should see only initial value filters being applied

  @feature
  Scenario: New value can be created
    When I open new value form
    And I fill in needed for a new value data
    And I submit form inside of a modal
    Then new value should be created

  @feature
  Scenario: Value editing works as expected
    When I open first value options dropdown
    And I open edit value modal
    And I fill in new year
    And I submit form inside of a modal
    Then I should see changed value

  @feature
  Scenario: Full value information can be opened
    When I open first value options dropdown
    And I open more information modal
    Then I should see full value information

  @feature
  Scenario: Value can be deleted
    When I open first value options dropdown
    And I click delete value
    And I confirm action
    Then deleted value should not be displayed in a table

  @feature
  Scenario: Value selection works as expected
    When I select value
    And I unselect value
    Then value should not be selected

  @feature
  Scenario: Multiple values selection works as expected
    When I select 3 first values
    And I open first value options dropdown
    And I click unselect all values
    Then no values should be selected

  @feature
  Scenario: Multiple values deleting works as expected
    When I select 3 first values
    And I open first value options dropdown
    And I click delete selected values
    And I confirm action
    Then deleted values should not be displayed

  @feature
  Scenario: New value fields validation works as expected
    When I open new value form
    And I fill in only year
    And I submit form inside of a modal
    Then value inputs should be highlighted indicating failed validation
