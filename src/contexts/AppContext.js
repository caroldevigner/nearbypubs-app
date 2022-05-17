import React, {
  useMemo,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import {
  saveUserToken,
  reset,
  ensureValidPublicApiToken,
} from "../constants/Auth";
import { buildApiClient } from "../constants/ApolloClient";
import * as Storage from "../constants/Storage";

const AppContext = createContext();

const InitialState = {
  currentApiToken: null,
  currentUserId: null,
  apiClient: null,
  isReady: false,
  loading: false,
};

export const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  SIGNIN: "SIGNIN",
  SIGNOUT: "SIGNOUT",
  SIGNOUT_START: "SIGNOUT_START",
  UPDATE_ACCESS_TOKEN: "UPDATE_ACCESS_TOKEN",
};

const images = [];
const loadAllImages = async () => {
  const cacheImages = images.map((image) =>
    Asset.fromModule(image).downloadAsync()
  );
  return Promise.all(cacheImages);
};

async function recoverSavedState() {
  await loadAllImages();

  const token = await ensureValidPublicApiToken();
  const apiClient = buildApiClient(token);

  return {
    currentApiToken: token,
    currentUserId: token.user,
    apiClient,
    isReady: true,
    loading: false,
  };
}

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIAL_STATE: {
      return { ...state, ...action.payload };
    }

    case ACTIONS.SIGNIN: {
      const token = action.payload.token;

      return {
        ...state,
        currentApiToken: token,
        currentUserId: token.user,
        apiClient: buildApiClient(token),
      };
    }

    case ACTIONS.SIGNOUT: {
      const token = action.payload.token;
      return {
        ...state,
        loading: false,
        currentApiToken: token,
        currentUserId: null,
        apiClient: buildApiClient(token),
      };
    }

    case ACTIONS.SIGNOUT_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case ACTIONS.UPDATE_ACCESS_TOKEN: {
      const token = action.payload.token;

      return {
        ...state,
        currentApiToken: token,
        currentUserId: token.user,
        apiClient: buildApiClient(token),
      };
    }

    default: {
      return state;
    }
  }
}

function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useApp must be used within a AppProvider`);
  }

  const [state, dispatch] = context;

  async function signIn(token) {
    const newToken = await saveUserToken(token);
    dispatch({
      type: "SIGNIN",
      payload: { token: newToken },
    });
  }

  async function signOut() {
    dispatch({ type: "SIGNOUT_START" });
    const token = await reset();
    dispatch({ type: "SIGNOUT", payload: { token } });
  }

  async function updateToken(newToken) {
    if (newToken == state.currentApiToken) return;
    await Storage.saveAccessToken(newToken);

    dispatch({
      type: ACTIONS.UPDATE_ACCESS_TOKEN,
      payload: { token: newToken },
    });
  }

  return {
    ...state,
    signIn,
    signOut,
    updateToken,
  };
}

function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  const contextValues = useMemo(() => [state, dispatch], [state]);

  const [fontsLoaded] = useFonts({
    rcRegular: require("../assets/fonts/RadioCanada-Regular.ttf"),
    rcMedium: require("../assets/fonts/RadioCanada-Medium.ttf"),
    rcSemiBold: require("../assets/fonts/RadioCanada-SemiBold.ttf"),
    glamourRegular: require("../assets/fonts/GlamourAbsolute_Regular.otf"),
    raBold: require("../assets/fonts/Raleway-Bold.ttf"),
    raSemiBold: require("../assets/fonts/Raleway-SemiBold.ttf"),
    rBold: require("../assets/fonts/Roboto-Bold.ttf"),
    rMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    rRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function getCurrentApiToken() {
      const payload = await recoverSavedState();
      dispatch({ type: ACTIONS.INITIAL_STATE, payload });
    }

    getCurrentApiToken();
  }, []);

  if (!state.isReady || !fontsLoaded) return null;
  return (
    <AppContext.Provider value={contextValues} {...props}></AppContext.Provider>
  );
}
export { AppProvider, useApp };
