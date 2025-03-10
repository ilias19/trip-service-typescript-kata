import * as sinon from 'sinon';

import UserNotLoggedInException from '../src/exception/UserNotLoggedInException';
import Trip from '../src/trip/Trip';
import TripService from '../src/trip/TripService';
import User from '../src/user/User';
import { UserSession } from '../src/user/UserSession';

interface UserSessionStub extends UserSession {
  getLoggedUser: any;
}

let service: TripService;

const stubSession = (user?: User) => {
  const session: UserSessionStub = {
    getLoggedUser: sinon.stub().returns(user),
  };
  return session;
};

describe('TripService', () => {
  beforeEach(() => {
    service = new TripService();
  });

  it('should not get trips without connected user', () => {
    expect(() => service.getTripsByUserAndSession(new User(), stubSession(), () => [])).toThrow(UserNotLoggedInException);
  });

  it('should get empty trips for newcomer', () => {
    const trips = service.getTripsByUserAndSession(new User(), stubSession(new User()), () => []);

    expect(trips).toHaveLength(0);
  });

  it('Should get user trips', () => {
    const authenticatedUser = new User();
    const user = new User();
    user.addFriend(authenticatedUser);
    const tripToLyon = new Trip();

    authenticatedUser.addTrip(tripToLyon);

    const findTripsByUser = sinon.mock().withExactArgs(user).returns([tripToLyon]);

    const trips = service.getTripsByUserAndSession(user, stubSession(authenticatedUser), findTripsByUser);

    const [trip] = trips;
    expect(trips).toHaveLength(1);
    expect(trip).toEqual(tripToLyon);
  });
});
