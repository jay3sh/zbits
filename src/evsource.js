
export default class EventSource {
  constructor(events) {
    this._event_listeners = {};
    for(let evname of events) {
      this._event_listeners[evname] = [];
    }
  }

  on(evname, callback) {
    console.assert(!!this._event_listeners[evname]);
    console.assert(!!callback);
    this._event_listeners[evname].push(callback);
  }

  trigger(evname, data) {
    console.assert(this._event_listeners[evname]);
    for(let cb of this._event_listeners[evname]) {
      cb(data);
    }
  }

  unbind(evname, callback) {
    console.assert(!!this._event_listeners[evname]);
    console.assert(!!callback);
    arrRemove(this._event_listeners[evname], callback);
  }
}
