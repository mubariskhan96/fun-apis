import express from 'express';
import initEventRoutes from './eventRoutes';

const initVersion1Routes = () => {
    const v1Router = express.Router();

    v1Router.use('/auth', initEventRoutes());

    return v1Router;
};

export default initVersion1Routes;
