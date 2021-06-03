import OAuth2Client, {
  OAuth2ClientConstructor,
} from "@fewlines/connect-client";

const initClient = () => {
  const oauthClientConstructorProps: OAuth2ClientConstructor = {
    openIDConfigurationURL:
      "https://fewlines.connect.prod.fewlines.tech/.well-known/openid-configuration",
    clientID: process.env.CONNECT_CLIENT_ID,
    clientSecret: process.env.CONNECT_CLIENT_SECRET,
    redirectURI: process.env.CONNECT_REDIRECT_URI,
    audience: "wdb2g1",
    scopes: ["openid", "email", "phone"],
  };

  const otClient = new OAuth2Client(oauthClientConstructorProps);
  return otClient;
};
export default initClient;
