import { Configuration, PublicClientApplication, PopupRequest } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "859b4a35-fe39-4304-9460-5102bd70e5a2",
    authority:
      'https://login.microsoftonline.com/sgdsddawidziak.onmicrosoft.com/B2C_1_signupsignin1"',
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["https://sgdsddawidziak.onmicrosoft.com/api/application.access"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
