export default ({ typography, palette }) => ({
  root: {
    ...typography.primary,
    backgroundColor: 'none',
    margin: [0, 5, 0, 'auto'],
    display: 'flex',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    marginTop: 6,
    width: 30,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 30,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    fontWeight: 100,
    fontSize: 14,
    zIndex: 100,
    background: palette.color.white,
    color: palette.color.black,
    borderRadius: 7,
    border: '1px solid rgba(0,0,0,0.17)',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-out',
  },
  menuChoice: {
    padding: [5, 10, 5, 10],
    borderBottom: '1px solid rgba(0,0,0,0.4)',
    '&:hover': {
      background: palette.color.grayLightest,
    },
    '&:first-child': {
      borderRadius: [7, 7, 0, 0],
    },
    '&:last-child': {
      borderBottom: 'none',
      borderRadius: [0, 0, 7, 7],
    },
  },
  menuButton: {
    appearance: 'none',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
});
