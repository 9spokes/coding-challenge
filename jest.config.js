module.exports = {
    clearMocks: true,

    collectCoverage: true,
    collectCoverageFrom: [
        "**/*/*.js",
        "!seed/*.js",
        "!coverage/*.js",
        "!coverage/*/*.js",

    ],
    // coverageDirectory: "coverage",

    coverageProvider: "v8",

    coverageReporters: ["html", "text", "lcov"],
    coverageThreshold: {
        global: {
            statements: 85,
            branches: 69,
            functions: 90,
            lines: 85,
        },
    },
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporter",
            {
                pageTitle: "Test Report",
                outputPath: "./tests/test-report/index.html",
            },
        ],
    ],
};