module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
    }
};
