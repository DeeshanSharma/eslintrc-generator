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
  rules: {
    // "import/extensions": ["off", "never"]  uncomment this if you face the local import file extension error
  },
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

  switch (userConfig.language) {
    case 'ts':
      packages.push(
        'eslint-config-airbnb-typescript',
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin',
        'typescript'
      );
      eslintrcConfig = {
        ...eslintrcConfig,
        parser: '@typescript-eslint/parser',
        plugins: [...eslintrcConfig.plugins, '@typescript-eslint'],
        parserOptions: {
          ...eslintrcConfig.parserOptions,
          project: './tsconfig.json',
        },
      };

      switch (userConfig.isReact) {
        case true:
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-typescript'],
          };
          break;
        case false:
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-typescript/base'],
          };
          break;
        default:
          break;
      }
      break;
    case 'js':
      switch (userConfig.isReact) {
        case true:
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb'],
          };
          break;
        case false:
          eslintrcConfig = {
            ...eslintrcConfig,
            extends: [...eslintrcConfig.extends, 'airbnb-base'],
          };
        default:
          break;
      }
      break;
    default:
      break;
  }

  switch (userConfig.isReact) {
    case true:
      packages.push(
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks'
      );
      eslintrcConfig = {
        ...eslintrcConfig,
        parserOptions: {
          ...eslintrcConfig.parserOptions,
          ecmaFeatures: {
            jsx: true,
          },
        },
      };
      break;
    default:
      break;
  }

  switch (userConfig.isPrettier) {
    case true:
      packages.push('eslint-plugin-prettier', 'eslint-config-prettier');
      eslintrcConfig = {
        ...eslintrcConfig,
        extends: [...eslintrcConfig.extends, 'prettier'],
        plugins: [...eslintrcConfig.plugins, 'prettier'],
      };
      break;

    default:
      break;
  }

  return {
    eslintrc: eslintrcConfig,
    packages,
    packageManager: userConfig.packageManager,
  };
};
