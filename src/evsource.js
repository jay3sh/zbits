

class EventSource {

  /**
   * @param {string[]} events Event names for which this object will maintain
   *                    list of listeners
   */
  constructor(events) {
    this._event_listeners = {};
    for(let evname of events) {
      this._event_listeners[evname] = [];
    }
  }

  /**
   * Listen on an event
   * @param {!string} evname - Event name to listen to
   * @param {!EventSource~eventCallback} callback - Listener callback to be called on event trigger
   */
  on(evname, callback) {
    console.assert(!!this._event_listeners[evname]);
    console.assert(!!callback);
    this._event_listeners[evname].push(callback);
  }

  /**
   * Trigger an event
   * @param {!string} evname - Event name to trigger
   * @param {?Object} data - Data to pass to listeners
   */
  trigger(evname, data) {
    console.assert(this._event_listeners[evname]);
    for(let cb of this._event_listeners[evname]) {
      cb(data);
    }
  }

  /**
   * Unbind event listener
   * @param {!string} evname - Event name to unbind
   * @param {!EventSource~eventCallback} callback - Listener callback to unbind
   */
  unbind(evname, callback) {
    console.assert(!!this._event_listeners[evname]);
    console.assert(!!callback);
    let idx = this._event_listeners[evname].indexOf(callback);
    if(idx >= 0) {
      this._event_listeners[evname].splice(idx, 1);
    }
  }

  /**
   * Event Callback
   * @callback EventSource~eventCallback
   * @param {Object} data
   */
}

export default EventSource;
