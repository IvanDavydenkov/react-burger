import "@4tw/cypress-drag-drop";

describe("Конструктор", () => {
  const SELECTORS = {
    draggableBun: "h4:contains('Краторная булка')",
    draggableSauce: "h4:contains('Соус Spicy-X')",
    dropArea: '[data-cy="drop-area"]',
    orderButton: "button:contains('Оформить заказ')",
    emailInput: '[type="email"]',
    passwordInput: '[type="password"]',
    loginButton: "button:contains('Войти')",
    modalContainer: '[data-cy="modal-container"]',
    modalHeader: '[data-cy="modal-container"] h2'
  };

  it("should contain h1", () => {
    cy.visit("/");

    const draggable = cy.get(SELECTORS.draggableBun);
    const extraDraggable = cy.get(SELECTORS.draggableSauce);

    const target = cy.get(SELECTORS.dropArea);

    draggable.drag(SELECTORS.dropArea);
    extraDraggable.drag(SELECTORS.dropArea);

    target.should("contain", "Краторная булка");
    target.should("contain", "Соус Spicy-X");
    cy.get(SELECTORS.orderButton).click();

    //todo:Проверить что авторизация проходит норм
    cy.get(SELECTORS.emailInput).type("testuser@test.ru");
    cy.get(SELECTORS.passwordInput).type("12345678");
    cy.get(SELECTORS.loginButton).click();

    cy.get(SELECTORS.orderButton).click();

    cy.intercept("POST", "/api/orders").as("createOrder");

    cy.wait("@createOrder")
      .then((interception) => {
        // Проверяем, что запрос завершился успешно
        expect(interception.response.statusCode).to.eq(200);
      })
      .then(() => {
        cy.get(SELECTORS.modalContainer).should(
          "be.visible",
          "Модальное окно заказа",
        );
        cy.get(SELECTORS.modalHeader)
          .invoke("text")
          .should("not.be.empty", "Номер заказа");
      });
  });
});