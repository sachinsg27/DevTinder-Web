import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import Connections from "../components/Connections";
import Requests from "../components/Requests";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    Connections: connectionReducer,
    Requests: requestReducer,
  },
});

export default appStore;
