import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, link, baseBackground, small }) => ({
  root: {
    isolate: false,
    color: base,
    backgroundColor: baseBackground,
  },
  header: {
    color: '#fff',
  },
  seperator: {
    backgroundColor: link,
    height: '7px',
  },
  bar: {
    display: 'flex',
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    backgroundColor: 'white',
    paddingBottom: '2px',
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
    backgroundColor: 'white',
    fontSize: 'x-large',
  },
  headerLink: {
    textDecoration: 'none',
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: '#000',
      fontSize: 12,
    },
    '&:hover, &:active': {
      color: 'darkblue',
      cursor: 'pointer',
      fontSize: 12,
    },
  },
  loginLink: {
    '&, &:link, &:visited': {
      color: 'green',
      border: '2px solid darkblue',
      padding: '4px 10px',
      borderRadius: '10px',
      textDecoration: 'none',
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      cursor: 'pointer',
      fontSize: 12,
    },
    '&:hover, &:active': {
      color: 'darkgreen',
      border: '2px solid darkblue',
      padding: '4px 10px',
      borderRadius: '10px',
      textDecoration: 'none',
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      cursor: 'pointer',
      fontSize: 12,
    },
  },
  content: {
    isolate: false,
    padding: [[15, 30]],
    paddingTop: '0',
    margin: [[0, 'auto']],
    marginTop: '10px',
    paddingBottom: '10px',
    [small]: {
      padding: 15,
    },
    display: 'block',
  },
  components: {
    isolate: false,
    overflow: 'auto',  // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

export function StyleGuideRenderer({
  classes,
  title,
  homepageUrl,
  children,
}) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.content}>
          <div className={classes.bar}>
            <h1>{ title }</h1>
          </div>
        </div>
      </header>
      <div className={classes.seperator} />
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`} />
        </footer>
      </main>
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Styled(styles)(StyleGuideRenderer);
