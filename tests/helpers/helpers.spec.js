const {
    readDataFromFile, calcAccountRevenue, calcAccountExpenses, calcGrossProfitMargin,
    calcNetProfitMargin, calcWorkingCapitalRatio, formatCurrency
} = require('../../helpers/helpers');

describe("test format currency", () => {
    test("should return formated curreny for 10000", () => {
        const result = formatCurrency(10000);
        expect(result).toEqual("10,000")
    });
});

describe("test data reading from give file path", () => {
    test("should check there should be a key exists in give file content", async () => {
        const result = await readDataFromFile("seed/data.json");
        expect(result).toHaveProperty("object_category", "general-ledger")
    });
});

describe("test calcAccountRevenue", () => {
    test("should check calcAccountRevenue by using existing data", async () => {
        const data = await readDataFromFile("seed/data.json");
        const result = await calcAccountRevenue(data);
        expect(result).toEqual(32431);
        expect(result).toBeTruthy();
    });
});

describe("test calcAccountExpenses", () => {
    test("should check calcAccountExpenses by using existing data", async () => {
        const data = await readDataFromFile("seed/data.json");
        const result = await calcAccountExpenses(data);
        expect(result).toEqual(36529.68);
        expect(result).toBeTruthy();
    });
});

describe("test calcGrossProfitMargin", () => {
    test("should check calcGrossProfitMargin by using existing data", async () => {
        const data = await readDataFromFile("seed/data.json");
        const revenue = await calcAccountRevenue(data);
        const result = await calcGrossProfitMargin(data, revenue);
        expect(result).toEqual(0);
    });
});

describe("test calcNetProfitMargin", () => {
    test("should check calcNetProfitMargin by using existing data", async () => {
        const data = await readDataFromFile("seed/data.json");
        const revenue = await calcAccountRevenue(data);
        const expense = await calcAccountExpenses(data);

        const result = await calcNetProfitMargin(expense, revenue);
        expect(result).toEqual(0.1263815485183929);
    });
});

describe("test calcWorkingCapitalRatio", () => {
    test("should check calcWorkingCapitalRatio by using existing data", async () => {
        const data = await readDataFromFile("seed/data.json");
        const result = await calcWorkingCapitalRatio(data);
        expect(result).toEqual(0);
    });
});