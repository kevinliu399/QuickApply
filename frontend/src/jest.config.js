module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // Allow transformation of ES modules in axios
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
