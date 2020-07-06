'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');
var when = require('do-when');

/**
 * Expose `SatisMeter` integration.
 */

var SatisMeter = (module.exports = integration('SatisMeter')
  .global('satismeter')
  .option('token', '')
  .option('apiKey', '')
  .tag('<script src="https://app.satismeter.com/satismeter.js">'));

/**
 * Initialize.
 *
 * @api public
 */

SatisMeter.prototype.initialize = function() {
  var self = this;
  var options = this.options;
  this.load(function() {
    when(
      function() {
        return self.loaded();
      },
      function() {
        window.satismeter('load', {
          writeKey: options.apiKey || options.token
        });
        self.ready();
      }
    );
  });
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

SatisMeter.prototype.loaded = function() {
  return !!window.satismeter;
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

SatisMeter.prototype.identify = function(identify) {
  window.satismeter('identify', {
    writeKey: this.options.apiKey || this.options.token,
    userId: identify.userId(),
    traits: this.analytics.user().traits()
  });
};

/**
 * Page.
 *
 * @api public
 * @param {Page} page
 */

SatisMeter.prototype.page = function(page) {
  window.satismeter('page', {
    writeKey: this.options.apiKey || this.options.token,
    userId: this.analytics.user().id(),
    name: page.name(),
    category: page.category(),
    properties: page.properties()
  });
};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

SatisMeter.prototype.track = function(track) {
  window.satismeter('track', {
    userId: this.analytics.user().id(),
    event: track.event(),
    properties: track.properties()
  });
};

/**
 * group.
 *
 * @api public
 * @param {group} group
 */

SatisMeter.prototype.group = function(group) {
  window.satismeter('group', {
    userId: this.analytics.user().id(),
    groupId: group.groupId(),
    traits: group.properties()
  });
};
