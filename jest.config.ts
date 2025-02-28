const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    moduleNameMapper: {
        "@middleware/(.*)": "<rootDir>/src/middleware/$1"
    }
};

export default config;
