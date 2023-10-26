Feature: Test app for booking a ticket to movie

                        Scenario: Should book a standard ticket
        Given user is on 'https://qamid.tmweb.ru' page
                                When user clicks on a day and on time
                                When user click on unoccupied standart seat '[class="buying-scheme__chair buying-scheme__chair_standart"]'
                                When user click on a buttons to book a ticket and to get a QR-code
        Then user sees the text 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'

                        Scenario: Should book a vip ticket if not available then book a standart ticket
        Given user is on 'https://qamid.tmweb.ru' page
                                When user clicks on a day and on time
                                When user click on unoccupied VIP seat if not available click on standart seat
                                When user click on a buttons to book a ticket and to get a QR-code
        Then user sees the text 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'

                        Scenario: Should not allow to book an occupied seat
        Given user is on 'https://qamid.tmweb.ru' page
                                When user clicks on a day and on time
                                When user are trying to click on an occupied seat '[class="buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_taken"]'
        Then a booking button '[class="acceptin-button"]' is disabled