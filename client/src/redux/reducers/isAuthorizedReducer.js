export const isAuthorizedReducer = (state = { isAuthorized: false }, action) => {
  switch (action.type) {
    case "AUTORIZED":
      return { ...state, isAuthorized: true }
    case "UNAUTORIZED":
      return { ...state, isAuthorized: false }
    default:
      return state
  }
}
