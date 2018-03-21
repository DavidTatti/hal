export default ({ typography }) => ({
  root: {
    ...typography.primary,
    '&:after': {
      fontSize: 20,
      margin: [-10, 0, 4, 0],
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'bottom',
      '-webkit-animation': 'ellipsis steps(4,end) 900ms infinite',
      animation: 'ellipsis steps(4,end) 900ms infinite',
      content: '"…"' /* ascii code for the ellipsis character */,
      width: 0,
    },
  },
  '@keyframes ellipsis': {
    to: {
      width: '1em',
    },
  },
});
