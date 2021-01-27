module.exports = {
    development: {
        ENV_VARS: {
            name: process.env.NAME,
            version: process.env.VERSION,
            profile: process.env.DEVELOPMENT_PROFILE,
            baseUrl: process.env.DEVELOPMENT_BASE_URL,
            frontUrl: process.env.DEVELOPMENT_FRONT_URL,
            sso:{
              url: process.env.DEVELOPMENT_SSO_URL,
              authorize: process.env.DEVELOPMENT_SSO_AUTHORIZE,
              userInfo: process.env.DEVELOPMENT_SSO_USER_INFO,
              userProfile: process.env.DEVELOPMENT_SSO_USER_PROFILE,
              endSession: process.env.DEVELOPMENT_SSO_END_SESSION,
              clientId: process.env.DEVELOPMENT_SSO_CLIENT_ID,
              responseType: process.env.DEVELOPMENT_SSO_RESPONSE_TYPE,
              application: process.env.DEVELOPMENT_SSO_APPLICATION,
              loginCallback: process.env.DEVELOPMENT_SSO_LOGIN_CALLBACK
            }
        }
    },
    production: {
        ENV_VARS: {
            name: process.env.NAME,
            version: process.env.VERSION,
            profile: process.env.PRODUCTION_PROFILE,
            baseUrl: process.env.PRODUCTION_BASE_URL,
            frontUrl: process.env.PRODUCTION_FRONT_URL,
            sso:{
              url: process.env.PRODUCTION_SSO_URL,
              authorize: process.env.PRODUCTION_SSO_AUTHORIZE,
              userInfo: process.env.PRODUCTION_SSO_USER_INFO,
              userProfile: process.env.PRODUCTION_SSO_USER_PROFILE,
              endSession: process.env.PRODUCTION_SSO_END_SESSION,
              clientId: process.env.PRODUCTION_SSO_CLIENT_ID,
              responseType: process.env.PRODUCTION_SSO_RESPONSE_TYPE,
              application: process.env.PRODUCTION_SSO_APPLICATION,
              loginCallback: process.env.PRODUCTION_SSO_LOGIN_CALLBACK
            }
        }
    }
};
