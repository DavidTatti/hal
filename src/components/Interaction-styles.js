export default ({ typography, palette }) => ({
  root: {
    ...typography.primary,
    display: 'flex',
    backgroundColor: palette.color.white,
    margin: [0, 5, 0, 5],
    borderRadius: 20,
  },
  textarea: {
    minHeight: 19,
    width: '100%',
    border: 'none',
    borderRadius: 20,
    padding: [5, 10, 6, 10],
    marginTop: 2,
    fontSize: 14,
    fontWeight: 100,
    color: palette.color.grayDarker,
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
    overflowStyle: 'none',
    fontFamily: 'inherit',
    '&::-webkit-input-placeholder': {
      color: palette.color.grayLight,
    },
    '&:-ms-input-placeholder': {
      color: palette.color.grayLight,
    },
    '&::-moz-placeholder': {
      color: palette.color.grayLight,
    },
    '&:-moz-placeholder': {
      color: palette.color.grayLight,
    },
    '&:disabled': {
      color: '#F8F8F8',
      cursor: 'default',
    },
  },
  focus: {
    border: `solid 1px ${palette.color.blue}`,
  },
  blur: {
    border: 'solid 1px rgba(255,255,255,0)',
  },
  icon: {
    alignSelf: 'center',
  },
  iconBlurred: {
    '& path': {
      fill: palette.color.grayLight,
    },
  },
  iconFocused: {
    '& path': {
      fill: palette.color.blue,
    },
  },
  iconContainer: {
    alignSelf: 'center',
    height: 20,
    width: 20,
    margin: [2, 12, 0, 0],
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
