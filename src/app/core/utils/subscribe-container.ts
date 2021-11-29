import { Subscription } from 'rxjs';

export class SubscribeContainer {
  private subs: Subscription[] = [];

  set add(subscription: Subscription) {
    this.subs.push(subscription);
  }

  unsubscribe() {
    this.subs.forEach((subscription) => subscription.unsubscribe());
  }
}
