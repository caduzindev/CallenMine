module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageProvider: 'v8',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}