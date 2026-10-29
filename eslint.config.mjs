import js from '@eslint/js';
import globals from 'globals';

// Check the active cinema implementation; preserve unrelated legacy source.
export default [{
  files: ['src/App.jsx','src/main.jsx','src/components/cinema/**/*.{js,jsx}','src/components/editorial/{Work,CaseStudy,Shared}.jsx','src/lib/useMotionPreference.js','src/content/cinemaCopy.js'],
  languageOptions: {ecmaVersion:'latest',sourceType:'module',globals:globals.browser,parserOptions:{ecmaFeatures:{jsx:true}}},
  rules: {...js.configs.recommended.rules,'no-unused-vars':'off','no-empty':['error',{allowEmptyCatch:true}]},
}];
