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


test("Example if-statement", () => {
    let a = 5;
    if (a > 0) {
        a = a + 1;
    } else {
        a = a - 1;
    }

    expect(a).toBe(6);
});
