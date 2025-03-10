import UserNotLoggedInException from '../exception/UserNotLoggedInException';
import User from '../user/User';
import userSession, { UserSession } from '../user/UserSession';

import Trip from './Trip';
import TripDAO from './TripDAO';

export default class TripService {
  public getTripsByUser(user: User): Trip[] {
    return this.getTripsByUserAndSession(user, userSession, TripDAO.findTripsByUser);
  }
  public getTripsByUserAndSession(user: User, session: UserSession, findTripsByUser: (user: User) => Trip[]): Trip[] {
    const loggedUser: User = session.getLoggedUser();

    this.assertLoggedUser(loggedUser);

    return this.isFriend(user, loggedUser) ? findTripsByUser(user) : [];
  }

  private isFriend(user: User, loggedUser: User) {
    return user.getFriends().some((friend) => friend === loggedUser);
  }

  assertLoggedUser(user: User): void {
    if (user == null) {
      throw new UserNotLoggedInException();
    }
  }
}
