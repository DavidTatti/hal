const path = require('path');
const { createConfig, resolveAliases } = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function devtool() {
  return { devtool: '#cheap-module-source-map' };
}

module.exports = {
  title: 'AI Assistant',
  serverPort: 4000,
  styleguideDir: `${path.join(__dirname, '../docs')}`,
  components: 'src/components/**/*.jsx',
  getExampleFilename(componentpath) {
    return componentpath.replace(/\.jsx?$/, '.example.md');
  },
  template: path.join(__dirname, './styleguide/template.html'),
  getComponentPathLine(componentPath) {
    const fileName = path.basename(componentPath, '.jsx');
    const componentName = capitalize(fileName);
    return `import { ${componentName} } from 'hal-9000';`;
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper')
  },
  showSidebar: false,
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Helvetica', 'sans-serif'],
  },
  styles: {
    Playground: {
      root: {
        borderRadius: 0,
        borderWidth: [[0, 0, 1, 0]],
      },
      preview: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      codeToggle: {
        marginTop: 1,
        border: 0,
      },
      hideCode: {
        background: 'none',
      },
    },
    Markdown: {
      pre: {
        border: 0,
        background: 'none',
      },
      code: {
        fontSize: 14,
      },
    },
  },
  skipComponentsWithoutExample: true,
  webpackConfig: createConfig([
    devtool,
    babel(),
    resolveAliases({
      'rsg-components/Wrapper':
        path.join(__dirname, 'styleguide', 'wrapper.jsx'),
      // Override Styleguidist components
      'rsg-components/Logo':
        path.join(__dirname, 'styleguide/components/logo'),
      'rsg-components/StyleGuide/StyleGuideRenderer':
        path.join(__dirname, 'styleguide/components/StyleGuide'),
    }),
  ])
};
