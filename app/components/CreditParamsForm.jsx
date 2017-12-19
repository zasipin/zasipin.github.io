import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

class CreditParamsForm extends React.Component{
	render() {
        
		return (
            <div className="row">
                <div className="credit-form columns small-centered medium-7 large-6 small-12">   
                    <form>
                        {this.props.children}
                    </form>    
                </div>
            </div>
		)
	}
};

export default (
// connect()(
    CreditParamsForm
// )
);