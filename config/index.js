require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  apiUrl: process.env.API_URL,
  adminUrl: process.env.ADMIN_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  sessionSecret: process.env.SESSION_SECRET,
  socketUser: process.env.USER_SOCKET,
  socketPassword: process.env.PASSWORD_SOCKET,
  authJwtSecret: process.env.AUTH_JWT_SECRET,

};
