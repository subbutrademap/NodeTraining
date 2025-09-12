export default function Reducers(state, action) {
    switch(action.type) {
      case "AddSession":
        return { ...state, session: { ...state.session, ...action.payload } };
      default:
        return state;
    }
  }