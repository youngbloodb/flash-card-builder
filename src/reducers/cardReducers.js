export const setCurrent = (state, { payload }) => ({
  ...state,
  currentCardIdx: payload.idx,
});
