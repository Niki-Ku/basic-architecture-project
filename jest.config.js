module.exports = {
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
	moduleNameMapper: {
		"\\.svg$": "<rootDir>/__mocks__/svgMock.tsx",
		"\\.(webp|png|jpg|jpeg)$": "<rootDir>/__mocks__/imgMock.js",
		"\\.(css|less|scss|sass)$": "jest-transform-stub",
	},
};
