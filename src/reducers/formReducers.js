export const setActive = (state, { payload }) => ({
  ...state,
  activeForm: payload.formName,
});
