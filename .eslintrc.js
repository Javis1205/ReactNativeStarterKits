module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:react-native/all"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "jest"
    ],
    "rules": {
        "indent": ["error", 4],
        // "semi": 2,
        "quotes": ["error", "single"],
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react-native/no-unused-styles": 0,
        "react-native/split-platform-components": 0,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 0,
        "jest/no-disabled-tests": 2,
        "jest/no-focused-tests": 2,
        "jest/no-identical-title": 2,
        "jest/valid-expect": 2
    },
    "globals": {
        "PLATFROM": false,
        "UTILS": false,
        "COMPONENTS": false,
        "LANGUAGES": false,
        "MIXINS": false,
        "MODELS": false,
        "ROUTES": false,
        "THEMES": false,
        "CONFIG": false,
        "VARIABLES": false,
        "FORMS": false
    }
};
