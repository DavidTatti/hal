export default ({ typography, palette }) => ({
  root: {
    position: 'relative',
    clear: 'both',
    boxShadow: [0, 1, 3, 0, 'rgba(0,0,0,0.1)'],
    padding: [5, 12, 6, 12],
    margin: [5, 0],
    maxWidth: '75%',
    minWidth: '5%',
  },
  messageSenderUser: {
    backgroundColor: palette.color.blueDark,
    borderRadius: [16, 0, 16, 16],
    float: 'right',
    marginRight: 8,
    color: palette.color.white,
  },
  messageSenderAIAssistant: {
    backgroundColor: palette.color.white,
    borderRadius: [0, 16, 16, 16],
    float: 'left',
    marginLeft: 8,
    color: palette.color.grayDarkest,
  },
  messageSpan: {
    fontFamily: typography.primary.fontFamily,
    fontSize: 14,
    margin: 0,
    wordWrap: 'break-word',
  },
});
