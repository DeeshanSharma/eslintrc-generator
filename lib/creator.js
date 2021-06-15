let eslintrc = {
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

module.exports = function create(config) {
  switch (config.moduleType) {
    case 'js':
      eslintrc = {
        ...eslintrc,
        parserOptions: {
          ...eslintrc.parserOptions,
          sourceType: 'module',
        },
      };
      break;

    case 'req':
      eslintrc = {
        ...eslintrc,
        env: {
          ...eslintrc.env,
          commonjs: true,
        },
      };
      break;

    default:
      break;
  }

  config.codeRun.forEach((environment) => {
    switch (environment) {
      case 'browser':
        eslintrc = {
          ...eslintrc,
          env: {
            ...eslintrc.env,
            browser: true,
          },
        };
        break;

      case 'node':
        eslintrc = {
          ...eslintrc,
          env: {
            ...eslintrc.env,
            node: true,
          },
        };
        break;

      default:
        break;
    }
  });

  switch (config.isReact) {
    case true:
      packages.push(
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks'
      );
      switch (config.language) {
        case 'ts':
          packages.push(
            'eslint-config-airbnb-typescript',
            '@typescript-eslint/parser',
            '@typescript-eslint/eslint-plugin'
          );
          eslintrc = {
            ...eslintrc,
            extends: [...eslintrc.extends, 'airbnb-typescript'],
            parser: '@typescript-eslint/parser',
            plugins: [...eslintrc.plugins, '@typescript-eslint'],
            parserOptions: {
              ...eslintrc.parserOptions,
              project: './tsconfig.json',
            },
          };
          break;

        case 'js':
          eslintrc = {
            ...eslintrc,
            extends: [...eslintrc.extends, 'airbnb'],
          };
          break;
      }
      break;

    case false:
      switch (config.language) {
        case 'ts':
          eslintrc = {
            ...eslintrc,
            extends: [...eslintrc.extends, 'airbnb-typescript/base'],
            parser: '@typescript-eslint/parser',
            plugins: [...eslintrc.plugins, '@typescript-eslint'],
            parserOptions: {
              ...eslintrc.parserOptions,
              project: './tsconfig.json',
            },
          };
          break;

        case 'js':
          eslintrc = {
            ...eslintrc,
            extends: [...eslintrc.extends, 'airbnb-base'],
          };
          break;
      }

    default:
      break;
  }

  switch (config.isPrettier) {
    case true:
      packages.push('eslint-plugin-prettier');
      eslintrc = {
        ...eslintrc,
        extends: [...eslintrc.extends, 'prettier'],
        plugins: [...eslintrc.plugins, 'prettier'],
      };
      break;

    default:
      break;
  }
  return { eslintrc, packages };
};
