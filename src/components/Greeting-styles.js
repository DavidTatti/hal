export default ({ typography, palette }) => ({
  root: {
    ...typography.primary,
    backgroundColor: palette.color.blueDark,
    color: palette.color.white,
    width: '100%',
    height: '100%',
    borderRadius: [8, 8, 0, 0],
    alignItems: 'center',
  },
  header: {
    fontSize: 23,
    margin: [20, 'auto', 0, 'auto'],
    textAlign: 'center',
    fontWeight: 100,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 100,
    margin: [30, 15, 0, 15],
  },
  question: {
    fontSize: 14,
    textAlign: 'center',
    margin: [40, 15, 0, 15],
  },
  buttonWrapper: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
    margin: [20, 15, 0, 15],
  },
  button: {
    margin: [5, 5, 5, 5],
    backgroundColor: palette.color.blue,
    color: `${palette.color.white} !important`,
  },
});
