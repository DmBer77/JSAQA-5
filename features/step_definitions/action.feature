Feature: Tickets
Scenario: Should bay ticket
    Given user is on "Идем в кино" page
    When user clicks day 4
        And user selects show 2 and time 2
        And user clicks row 7 and seat 5
        And user clicks submit button
    Then user sees the button with name "Получить код бронирования"


