export default ({ typography, palette }) => ({
  messageLink: {
    textDecoration: 'none',
    fontFamily: typography.primary.fontFamily,
    fontSize: 14,
    wordWrap: 'break-word',
    cursor: 'pointer',
    color: palette.color.blue,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
