import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import { getTranslate } from 'react-localize-redux';

class CreditParams extends React.Component{
	render() {
        var {dispatch, sum, percents, step, translate} = this.props;
        var min = 0;

		return (
            <div>
                <div className="row">
                    <div className="small-7 columns">
                         <label htmlFor="creditSum" className="text-right middle">{translate('creditSum')}</label>
                    </div>

                    <div className="small-5 columns">                            
                            <input type="number" id="creditSum" name="creditSum" ref="creditSum" value={sum} step={step} min={min}
                            onChange={() => {
                                var sum = this.refs.creditSum.value;
                                dispatch(actions.setCreditSum(sum));
                            }}/>                  
                    </div>
                </div>

                <div className="row">
                    <div className="small-7 columns">
                         <label htmlFor="percents" className="text-right middle">{translate('annualPercents')}</label>
                    </div>
                    <div className="small-5 columns">
                            <input type="number" id="percents" name="percents" ref="percents" value={percents} min={min}
                            onChange={() => {
                                var percents = this.refs.percents.value;
                                if (isNaN(parseFloat(percents))) return;
                                dispatch(actions.setPercents(percents));
                            }}/>                    
                    </div>
               
                </div>        
            {/*<div className="row">
                <div className="credit-form columns small-centered medium-4 small-12">   
                    <form>
                        
                    </form>    
                </div>
            </div>*/}
            </div> 
		)
	}
};

const mapStateToProps = state => ({
    sum: state.creditProps.sum,
    percents: state.creditProps.percents,
    step: state.creditProps.step,
    translate: getTranslate(state.locale),
  });

export default connect(mapStateToProps)(CreditParams);