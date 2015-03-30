'use strict';
var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';
var searchResults;
var PropertyStore = assign(EventEmitter.prototype, {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    getResults() {
        return searchResults;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    var user;
    switch(action.actionType) {
        case "SEARCH":
            searchResults = action.data;
            PropertyStore.emitChange();
            break;
        case "SEARCH_ERROR":
            console.log('Location not found by anyone');
            break;
        case "SEARCH_CATCH":
            console.log('some bigger error', action.error);
            break;

        default:
            return true;
    }
    PropertyStore.emitChange();
    return true;
});
module.exports = PropertyStore;