export const reducer = (state, action) => {
  switch (action.type) {
    case "AUTORIZED":
      return { ...state, isAuthorized: true }
    case "UNAUTORIZED":
      return { ...state, isAuthorized: false }

    default:
      return state
  }
}
