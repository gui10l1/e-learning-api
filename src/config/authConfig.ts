export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default_for_jest',
    expiresIn: '1d',
  },
};
