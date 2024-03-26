import * as coachController from '@coach/controller';
import Boom from '@hapi/boom';
import Router, {RouterAllowedMethodsOptions} from '@koa/router';
import * as studentController from '@student/controller';
import compose from 'koa-compose';

const coach: Router = new Router({prefix: '/coaches'});
const student: Router = new Router({prefix: '/students'});
const api: Router = new Router();

coach
  .get('/', coachController.viewAllCoaches)
  .get('/:coachId', coachController.viewCoach)
  .get('/:coachId/slots', coachController.viewSlots)
  .post('/:coachId/slots', coachController.createSlots)
  .patch('/:coachId/slots/:slotId', coachController.updateSlot);

student
  .get('/', studentController.viewAllStudents)
  .get('/:studentId', studentController.viewStudent)
  .get('/:studentId/slots', studentController.viewSlots)
  .patch('/:studentId/slots/:slotId', studentController.createCoachCall);

api.use('/api', coach.routes(), student.routes());

const routerOptions: RouterAllowedMethodsOptions = {
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed()
};

export default compose([api.routes(), api.allowedMethods(routerOptions)]);
