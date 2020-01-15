import 'module-alias/register';
import express from 'express';
import SessionUser from '@Controller/SessionUser';

const routes = express.Router();

routes.post('/Register', SessionUser.store);


export default routes;