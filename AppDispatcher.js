var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = {}
/**
 * AppDispatcher 
 * A singleton that operates as the central hub for application updates.
 * @type {*|exports}
 */
var AppDispatcher = Object.assign(new Dispatcher(), {
    /**
     * A bridge function between the views and the dispatcher, marking the action
     * as a view action.  Another variant here could be handleServerAction.
     * @param  {object} action The data coming from the view.
     */
    handleViewAction(action) {
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    },

    handleRequestAction(payload) {
        this.dispatch({
            source : 'REQUEST_ACTION',
            action : payload
        });
    }
});

module.exports = AppDispatcher;