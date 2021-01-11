import { Configuration, PublicClientApplication, PopupRequest } from "@azure/msal-browser";

const tenant = "sgdsddawidziak.onmicrosoft.com";
const signInPolicy = "B2C_1_signupsignin1";
const applicationID = "859b4a35-fe39-4304-9460-5102bd70e5a2";
// const reactRedirectUri = "http://localhost:3000/";
const tenantSubdomain = tenant.split(".")[0];
const instance = `https://${tenantSubdomain}.b2clogin.com/tfp/`;
const signInAuthority = `${instance}${tenant}/${signInPolicy}`;

const msalConfig: Configuration = {
  auth: {
    clientId: applicationID,
    authority: signInAuthority,
    knownAuthorities: [signInAuthority],
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["https://sgdsddawidziak.onmicrosoft.com/api/application.access"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
