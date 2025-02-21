describe("Ингредиент", () => {
  it("Открытие модального окна с описанием ингредиента", () => {
    cy.visit("/");
    cy.get("h4").contains("Краторная булка").click();

    const container = cy.get('[data-cy="modal-container"]');
    const description = cy.get('[data-cy="ingredient-description"]');
    const title = container.get("p").contains("Детали ингредиента");

    container.should("be.visible", "Модальное окно ингредиента видимо");
    title.should("exist", "Заголовок модалки");
    container
      .get("h2")
      .contains("Краторная булка N-200i")
      .should("exist", "Название ингредиента");
    container
      .get("h2")
      .contains("Краторная булка N-200i")
      .should("exist", "Название ингредиента");
    container
      .get("h2")
      .contains("Краторная булка N-200i")
      .should("exist", "Название ингредиента");
    container
      .get("h2")
      .contains("Краторная булка N-200i")
      .should("exist", "Название ингредиента");

    description.find("li").each((li) => {
      cy.wrap(li)
        .find("p")
        .each((p) => {
          expect(p.text().trim(), "Описание не пустое").not.to.be.empty;
        });
    });
  });
});
