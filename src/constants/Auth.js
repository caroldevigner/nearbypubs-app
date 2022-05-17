import Server from "./Server";
import * as Storage from "./Storage";

const fetchJson = async (url, config) => {
  const response = await fetch(url, {
    ...config,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(config.body),
  });
  return response.json();
};

export const reset = async () => {
  await Storage.clearAccesToken();
  await Storage.clearPushToken();
  const token = await ensureValidPublicApiToken();
  return token;
};

export const introspectToken = async (token) => {
  const url = `${Server.url}/oauth/introspect`;

  const body = {
    client_id: Server.clientId,
    client_secret: Server.clientSecret,
    token: token.access_token,
  };

  return await fetchJson(url, { method: "POST", body });
};

const requestNewPublicAccessToken = async () => {
  const url = `${Server.url}/oauth/token`;

  const body = {
    grant_type: "client_credentials",
    client_id: Server.clientId,
    client_secret: Server.clientSecret,
  };

  const token = await fetchJson(url, { method: "POST", body });
  if (token.error) throw token.error_description;
  return token;
};

export const ensureValidPublicApiToken = async () => {
  let token = await Storage.getAccessToken();
  if (!token) token = await requestNewPublicAccessToken();

  let instropection = await introspectToken(token);
  if (!instropection.active) {
    token = await requestNewPublicAccessToken();
    introspectionToken = await introspectToken(token);
  }

  token = { ...instropection, ...token };
  await Storage.saveAccessToken(token);
  return token;
};

export const requestNewPasswordToken = async ({ username, password }) => {
  const url = `${Server.url}/oauth/token`;

  const body = {
    grant_type: "password",
    client_id: Server.clientId,
    client_secret: Server.clientSecret,
    username,
    password,
  };

  const token = await fetchJson(url, { method: "POST", body });
  if (token.error) throw token.error_description;
  return token;
};

export const tryUserLogin = async (email, pass) => {
  const userToken = await requestNewPasswordToken({
    username: email,
    password: pass,
  });

  const introspection = await introspectToken({
    ...userToken,
    accessToken: userToken.access_token,
  });

  return { ...introspection, ...userToken };
};

export const saveUserToken = async (loginToken) => {
  const introspection = await introspectToken(loginToken);
  const token = { ...introspection, ...loginToken };

  await Storage.saveAccessToken(token);
  return token;
};
