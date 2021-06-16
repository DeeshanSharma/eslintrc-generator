const getUserInput = require('./getUserInput');

let eslintrcConfig = {
  env: {
    es6: true,
  },
  extends: [],
  parser: '',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: [],
  rules: {},
};

let packages = ['eslint', 'eslint-plugin-import'];

module.exports = async function createConfig() {
  const userConfig = await getUserInput();
  switch (userConfig.moduleType) {
    case 'js':
      eslintrcConfig = {
        ...eslintrcConfig,
        parserOptions: {
          ...eslintrcConfig.parserOptions,
          sourceType: 'module',
        },
      };
      break;

    case 'req':
      eslintrcConfig = {
        ...eslintrcConfig,
        env: {
          ...eslintrcConfig.env,
          commonjs: true,
        },
      };
      break;

    default:
      break;
  }

  userConfig.codeRun.forEach((environment) => {
    switch (environment) {
      case 'browser':
        eslintrcConfig = {
          ...eslintrcConfig,
          env: {
            ...eslintrcConfig.env,
            browser: true,
          },
        };
        break;

      case 'node':
        eslintrcConfig = {
          ...eslintrcConfig,
          env: {
            ...eslintrcConfig.env,
            node: true,
          },
        };
        break;

      default:
        break;
    }
  });

  switch (userConfig.isReact) {
    case true:
      packages.push(
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks'
      );
      switch (userConfig.language) {
        case 'ts':
          packages.push(
            'eslint-config-airbnb-typescript',
            '@typescript-eslint/parser',
            '@typescript-eslint/eslint-plugin'
          );
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-typescript'],
            parser: '@typescript-eslint/parser',
            plugins: [...eslintrcConfig.plugins, '@typescript-eslint'],
            parserOptions: {
              ...eslintrcConfig.parserOptions,
              project: './tsconfig.json',
            },
          };
          break;

        case 'js':
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb'],
          };
          break;
      }
      break;

    case false:
      switch (userConfig.language) {
        case 'ts':
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-typescript/base'],
            parser: '@typescript-eslint/parser',
            plugins: [...eslintrcConfig.plugins, '@typescript-eslint'],
            parserOptions: {
              ...eslintrcConfig.parserOptions,
              project: './tsconfig.json',
            },
          };
          break;

        case 'js':
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-base'],
          };
          break;
      }

    default:
      break;
  }

  switch (userConfig.isPrettier) {
    case true:
      packages.push('eslint-plugin-prettier');
      eslintrcConfig = {
        ...eslintrcConfig,
        extends: [...eslintrcConfig.extends, 'prettier'],
        plugins: [...eslintrcConfig.plugins, 'prettier'],
      };
      break;

    default:
      break;
  }
  return { eslintrc: eslintrcConfig, packages, packageManager: userConfig.packageManager };
};
