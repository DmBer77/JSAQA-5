Feature: Tickets
Scenario: Should bay ticket
    Given user is on "Идем в кино" page
    When user click to "дата, время, место в зале, подтвердить"
    Then user sees the button with name "Получить код бронирования"