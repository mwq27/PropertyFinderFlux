'use strict';

var AppDispatcher = require('../AppDispatcher.js');

var SearchActions = {
    runSearch (query) {
        fetch(query)
            .then(response => {
                return response.json();
            })
            .then(json => {
                 if (json.response.application_response_code.substr(0, 1) === '1') {
                    AppDispatcher.handleViewAction({
                        actionType: 'SEARCH',
                        data : json.response.listings
                    });
                  } else {
                    AppDispatcher.handleViewAction({
                        actionType: 'SEARCH_ERROR',
                        query
                    });
                  }
            })
            .catch(error => {
                AppDispatcher.handleViewAction({
                    actionType: 'SEARCH_CATCH',
                    error
                });
            })
    }   
};
module.exports = SearchActions;