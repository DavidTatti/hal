export default ({ typography, palette }) => ({
  root: {
    position: 'relative',
    clear: 'both',
    padding: [10, 20, 10, 20],
  },
  messageSpan: {
    fontFamily: typography.primary.fontFamily,
    fontSize: 14,
    wordWrap: 'break-word',
    color: palette.color.grayDark,
  },
});
