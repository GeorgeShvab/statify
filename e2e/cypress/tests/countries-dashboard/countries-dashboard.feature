Feature: Countries dashboard

  Background: Countries dashboard background
    Given I am on the countries dashboard page

  @smoke
  Scenario: Countries dashboard content is displayed correctly
    When the countries dashboard page has finished loading
    Then I should see dashboard title
    And I should see dashboard subtitle
    And I should see dashboard tools
    And I should see dashboard table

  @feature
  Scenario Outline: Sorting functionality works as expected
    When I open sort dropdown
    And I select sorting by "<criteria>"
    Then I should see countries sorted by "<criteria>" rows

    Examples:
      | criteria       |
      | id             |
      | name           |
      | geocode        |
      | iso2code       |
      | datapoint      |
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
    Then I should see "<status>" countries

    Examples:
      | status       |
      | all statuses |
      | visible      |
      | hidden       |

  @feature
  Scenario: Search works as expected
    When I type "United States" in dashboard search input
    And I submit value with Enter
    Then I should see countries containing "United States" in a name or description

  @feature
  Scenario: Data refresh works as expected
    When I refresh countries table data
    Then I should see refreshed data

  @feature
  Scenario: Filters clearing works as expected
    Given I already applied some filters for countries
    When I clear filters
    Then I should see only initial filters for countries being applied

  @feature
  Scenario: New country can be created
    When I open new country form
    And I fill in needed country values
    And I submit form
    Then I should see a new country in a table

  @feature
  Scenario: New country fields validation works as expected
    When I open new country form
    And I fill in only country name
    And I submit form
    Then country id input should be highlighted indicating failed validation

  @feature
  Scenario: Country visibility toggling works as expected
    When I switch visibility of the first country
    Then visibility of the first country should be changed

  @feature
  Scenario: Full country information can be opened
    When I open first country options dropdown
    And I open more information modal
    Then I should see full country information

  @feature
  Scenario: Country editing works as expected
    When I open first country options dropdown
    And I open edit country modal
    And I fill in new country name
    And I submit form
    Then I should see changed country

  @feature
  Scenario: Country can be deleted
    When I open first country options dropdown
    And I click delete country
    And I confirm action
    Then deleted country should not be displayed in a table

  @feature
  Scenario: Country selection works as expected
    When I select country
    And I unselect country
    Then country should not be selected

  @feature
  Scenario: Multiple country selection works as expected
    When I select 3 first countries
    And I open first country options dropdown
    And I click unselect 3 countries
    Then no countries should be selected

  @feature
  Scenario: Multiple countries deleting works as expected
    When I select 3 first countries
    And I open first country options dropdown
    And I click delete selected countries
    And I confirm action
    Then deleted countries should not be displayed

  @feature
  Scenario: Multiple countries hiding works as expected
    When I select 3 first countries
    And I open first country options dropdown
    And I click hide selected countries
    Then selected countries should be hidden

  @feature
  Scenario: Multiple countries exposion works as expected
    When I select all the hidden countries
    And I open first country options dropdown
    And I click expose selected countries
    Then selected countries should be exposed
