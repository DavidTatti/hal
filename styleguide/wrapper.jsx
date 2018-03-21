import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';
import { IntlProvider, addLocaleData } from 'react-intl';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
import fi from 'react-intl/locale-data/fi';
import nb from 'react-intl/locale-data/nb';
import da from 'react-intl/locale-data/da';
import l10n from '../src/l10n';
import DevTools from './dev-tools';
import reducer from '../src/reducers';

const devToolsMiddleware = window.devToolsExtension || DevTools.instrument;
addLocaleData([...en, ...sv, ...fi, ...nb, ...da]);

const locale = 'sv-SE';

const theme = {
  palette: {
    color: {
      grayLight: '#ccc',
      grayLightest: '#eee',
      grayDarker: '#666',
      white: '#fff',
      black: '#111',
      blueDark: '#06266F',
      blue: '#6C8CD5',
    }
  },
  typography: {
    primary: {
      fontFamily: 'Open Sans'
    }
  }
}

class Wrapper extends Component {
  constructor(props) {
    super(props);

    const store = createStore(
      combineReducers(reducer),
      undefined,
      compose(applyMiddleware(thunk), devToolsMiddleware()),
    );

    this.state = { store };
  }

  getChildContext = () =>  ({ store: this.state.store })

  componentDidMount() {
    
  }

  render() {
    if (!this.state.store) {
      console.log("No store in Wrapper!");
      return null;
    }

    return (
      <div>
        {window.devToolsExtension ? null : <DevTools store={this.state.store} />}
        <IntlProvider locale={locale} messages={l10n[locale]}>
          <ThemeProvider theme={theme}>
            <Provider store={this.state.store}>{this.props.children}</Provider>
          </ThemeProvider>
        </IntlProvider>
      </div>
    );
  }
}

Wrapper.defaultProps = {
  children: '',
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

Wrapper.childContextTypes = {
  store: PropTypes.object,
};

export default Wrapper;
