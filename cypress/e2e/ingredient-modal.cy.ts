describe("Ингредиент", () => {
  const SELECTORS = {
    ingredientTitle: "h4:contains('Краторная булка')",
    modalContainer: '[data-cy="modal-container"]',
    ingredientDescription: '[data-cy="ingredient-description"]',
    modalTitle: "p:contains('Детали ингредиента')",
    ingredientName: "h2:contains('Краторная булка N-200i')"
  };

  it("Открытие модального окна с описанием ингредиента", () => {
    cy.visit("/");
    cy.get(SELECTORS.ingredientTitle).click();

    const container = cy.get(SELECTORS.modalContainer);
    const description = cy.get(SELECTORS.ingredientDescription);
    const title = container.get(SELECTORS.modalTitle);

    container.should("be.visible", "Модальное окно ингредиента видимо");
    title.should("exist", "Заголовок модалки");
    container
      .get(SELECTORS.ingredientName)
      .should("exist", "Название ингредиента");
    container
      .get(SELECTORS.ingredientName)
      .should("exist", "Название ингредиента");
    container
      .get(SELECTORS.ingredientName)
      .should("exist", "Название ингредиента");
    container
      .get(SELECTORS.ingredientName)
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