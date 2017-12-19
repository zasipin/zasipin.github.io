import React from 'react';
import {Route, IndexRoute, BrowserRouter, Redirect} from 'react-router-dom';

import Main from 'Main';
import ConsumerLoan from 'ConsumerLoan'; 
import Mortage from 'Mortage'; 

export default (
      <BrowserRouter>
            <div>
                  <Route path="/" component={Main} />
                  <Route path="/" render={() => <Redirect to="/mortage" component={Mortage} />} />
            </div>
      </BrowserRouter>
)