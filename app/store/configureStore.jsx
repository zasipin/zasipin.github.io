import * as redux from 'redux';
import thunk from 'redux-thunk';

import {
    // searchTextReducer, showCompletedReducer, todosReducer, 
    authReducer, creditPropsReducer, annuitetPaymentsReducer,
    activeCreditReducer, commonAppStateReducer } from 'reducers';

    import { localeReducer as locale } from 'react-localize-redux';

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        // searchText: searchTextReducer,
        // showCompleted: showCompletedReducer,
        // todos: todosReducer,
        auth: authReducer,
        creditProps: creditPropsReducer,
        annuitetPayments: annuitetPaymentsReducer,
        activeCredit: activeCreditReducer,
        commonAppState: commonAppStateReducer,
        locale
    });
    
    initialState.creditProps = {
        sum: 100000,
        percents: 10,
        years: 30,
        step: 10000,
        price: 100000,
        downPayment: 0
    }

    initialState.commonAppState = {
        isAddingMonths: false
    }

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
}