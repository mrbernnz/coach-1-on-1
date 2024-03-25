import * as coachController from '@coach/controller';
import Boom from '@hapi/boom';
import Router, {RouterAllowedMethodsOptions} from '@koa/router';
import compose from 'koa-compose';

const coach: Router = new Router({prefix: '/coaches'});
const api: Router = new Router();

coach
  .post('/:coach/slots', coachController.createSlots)
  .get('/:coach/slots', coachController.viewSlots);

api.use('/api', coach.routes());

const routerOptions: RouterAllowedMethodsOptions = {
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed()
};

export default compose([api.routes(), api.allowedMethods(routerOptions)]);
