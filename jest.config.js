/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
    },
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/src/__mocks__/svgMock.ts',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', 'src/__tests__/setupTests.ts'],
};
