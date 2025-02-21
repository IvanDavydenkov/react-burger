import "@4tw/cypress-drag-drop";

describe("Конструктор", () => {
  it("should contain h1", () => {
    cy.visit("/");

    const draggable = cy.get("h4").contains("Краторная булка");
    const extraDraggable = cy.get("h4").contains("Соус Spicy-X");

    const target = cy.get('[data-cy="drop-area"]');

    draggable.drag('[data-cy="drop-area"]');
    extraDraggable.drag('[data-cy="drop-area"]');

    target.should("contain", "Краторная булка");
    target.should("contain", "Соус Spicy-X");
    cy.get("button").contains("Оформить заказ").click();

    //todo:Проверить что авторизация проходит норм
    cy.get('[type="email"]').type("testuser@test.ru");
    cy.get('[type="password"]').type("12345678");
    cy.get("button").contains("Войти").click();

    cy.get("button").contains("Оформить заказ").click();

    cy.intercept("POST", "/api/orders").as("createOrder");

    cy.wait("@createOrder")
      .then((interception) => {
        // Проверяем, что запрос завершился успешно
        expect(interception.response.statusCode).to.eq(200);
      })
      .then(() => {
        cy.get('[data-cy="modal-container"]').should(
          "be.visible",
          "Модальное окно заказа",
        );
        cy.get('[data-cy="modal-container"]')
          .find("h2")
          .invoke("text")
          .should("not.be.empty", "Номер заказа");
      });
  });
});
