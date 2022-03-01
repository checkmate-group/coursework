test("A simple unit test.", () => {
    const value = 2 + 2;
    expect(value).toBe(4);
});

test("Another example unit test.", () => {
    const shoppingList = [
        "kleenex",
        "trash bags",
        "paper towels",
        "milk",
    ];

    expect(shoppingList).toContain("milk");
});