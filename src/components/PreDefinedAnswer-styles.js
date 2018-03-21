export default ({ typography, palette }) => ({
  button: {
    fontFamily: typography.primary.fontFamily,
    fontSize: 14,
    margin: [0, 2, 6, 2],
    padding: [6, 12],
    backgroundColor: palette.color.blue,
    color: `${palette.color.white} !important`,
  },
});
