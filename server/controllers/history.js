'use strict'

module.exports = {
  recipientCutOff: 20,
  setHistory: function(action, user) {
    var history = {
      action: action,
      user: user.userName,
      dt: new Date()
    }
    return history;
  }
}
