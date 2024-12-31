@page
Feature: Indicator dashboard

  Background: Indicators dashboard background
    Given I am on indicators dashboard page

  @smoke
  Scenario: Indicators dashboard content is displayed correctly
    When the indicators dashboard page has finished loading
    Then I should see dashboard title
    And I should see dashboard subtitle
    And I should see dashboard tools
    And I should see dashboard table

  @feature
  Scenario Outline: Sorting functionality works as expected
    When I open sort dropdown
    And I select sorting by "<criteria>"
    Then I should see sorted by "<criteria>" rows

    Examples:
      | criteria       |
      | id             |
      | label          |
      | datapoints     |
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
  Scenario Outline: Filtering functionality works as expected
    When I open status dropdown
    And I select "<status>"
    Then I should see "<status>" indicators

    Examples:
      | status       |
      | all statuses |
      | visible      |
      | hidden       |

  @feature
  Scenario: Search works as expected
    When I type "GDP" in dashboard search input
    And I submit value with Enter
    Then I should see indicators containing "GDP" in a name or description

  @feature
  Scenario: Data refresh works as expected
    When I refresh table data
    Then I should see refreshed data

  @feature
  Scenario: Filters clearing works as expected
    Given I already applied some filters
    When I clear filters
    Then I should see only initial filters being applied

  @feature
  Scenario: New indicator can be created
    When I open new indicator form
    And I fill in needed values
    And I submit form
    Then I should see a new indicator in a table

  @feature
  Scenario: New indicator fields validation works as expected
    When I open new indicator form
    And I fill in only name
    And I submit form
    Then input should be highlighted indicating failed validation

  @feature
  Scenario: Indicator visibility toggling works as expected
    When I switch visibility of the first indicator
    Then visibility of the first indicator should be changed

  @feature
  Scenario: Full indicator information can be opened
    When I open first indicator's options dropdown
    And I open more information modal
    Then I should see full indicator's information

  @feature
  Scenario: Indicator editing works as expected
    When I open first indicator's options dropdown
    And I open edit indicator modal
    And I fill in new name
    And I submit form
    Then I should see changed indicator

  @feature
  Scenario: Indicator can be deleted
    When I open first indicator's options dropdown
    And I click delete indicator
    And I confirm action
    Then deleted indicator should not be displayed in a table

  @feature
  Scenario: Indicator selection works as expected
    When I select indicator
    And I unselect indicator
    Then indicator should not be selected

  @feature
  Scenario: Multiple indicator selection works as expected
    When I select 3 first indicators
    And I open first indicator's options dropdown
    And I click unselect 3 indicators
    Then no indicators should be selected

  @feature
  Scenario: Multiple indicators deleting works as expected
    When I select 3 first indicators
    And I open first indicator's options dropdown
    And I click delete selected indicators
    And I confirm action
    Then deleted indicators should not be displayed

  @feature
  Scenario: Multiple indicators hiding works as expected
    When I select 3 first indicators
    And I open first indicator's options dropdown
    And I click hide selected indicators
    Then selected indicators should be hidden

  @feature
  Scenario: Multiple indicators exposion works as expected
    When I select all the hidden indicators
    And I open first indicator's options dropdown
    And I click expose selected indicators
    Then selected indicators should be exposed
