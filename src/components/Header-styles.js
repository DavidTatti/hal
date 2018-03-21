export default ({ typography, palette }) => ({
  root: {
    ...typography.primary,
    display: 'flex',
    height: 44,
    borderRadius: [8, 8, 0, 0],
    fontSize: 18,
    outline: 'none',
    outlineStyle: 'none',
    borderBottom: `1px ${palette.color.grayLightest} solid`,
  },
  newMessage: {
    '-webkit-animation': 'newMessageBackground 2s infinite' /* Safari 4+ */,
    '-moz-animation': 'newMessageBackground 2s infinite' /* Fx 5+ */,
    '-o-animation': 'newMessageBackground 2s infinite' /* Opera 12+ */,
    animation: 'newMessageBackground 2s infinite' /* IE 10+, Fx 29+ */,
  },
  '@keyframes newMessageBackground': {
    '0%, 49%': {
      backgroundColor: palette.color.white,
      color: palette.color.black,
    },
    '50%, 100%': {
      backgroundColor: palette.color.blueDark,
      color: palette.color.white,
    },
  },
  minimized: {
    backgroundColor: palette.color.white,
    color: palette.color.black,
  },
  maximizedBlur: {
    backgroundColor: palette.color.grayLight,
    color: palette.color.white,
  },
  maximizedFocus: {
    backgroundColor: palette.color.blueDark,
    color: palette.color.white,
  },
  avatar: {
    margin: [5, 0, 4, 10],
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: [5, 9, 0, 9],
    color: '#666',
  },
  name: {
    padding: [9, 0, 0, 10],
    cursor: 'default',
  },
  minButton: {
    margin: [-4, 15, 0, 10],
    background: 'none',
    border: 0,
    fontSize: 30,
    color: palette.color.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  maxButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'none',
    border: 0,
    cursor: 'pointer',
  },
});
