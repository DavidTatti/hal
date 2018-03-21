const types = {
  TRACK: 'TRACK',
};

const track = payload => ({
  type: types.TRACK,
  payload,
});

const actions = {
  track,
};

export { actions as trackActions };

export default {
  actions,
};
