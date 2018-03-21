export default ({ palette }) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 100,
    display: 'flex',
    flexDirection: 'column',
    height: 385,
    borderRadius: [8, 8, 0, 0],
    backgroundColor: palette.color.grayLightest,
    boxShadow: [0, 0, 15, 0, 'rgba(135, 135, 135, 0.23)'],
    outline: 'none',
    outlineStyle: 'none',
    zIndex: 999999,
  },
  maximizedRoot: {
    width: 300,
  },
  minimizedRoot: {
    width: 196,
    height: 44,
  },
  minimizedWrapper: {
    height: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  maximizedWrapper: {
    height: 341, // root height - header height
    display: 'flex',
    flexDirection: 'column',
  },
  preDefinedAnswerWrapper: {
    position: 'relative',
    clear: 'both',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: [9, 9, 5, 9],
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
});
