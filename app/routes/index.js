import initVersion1Routes from './v1';

const initRoutes = (app) => {
  app.use('/api', initVersion1Routes());
};

module.exports = initRoutes;