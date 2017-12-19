import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';

import * as actions from 'actions';

class AddMonthsButton extends React.Component {
  constructor(props){
    super(props);
    this.onAddMonths = this.onAddMonths.bind(this);
    this.onMonthsToAddChange = this.onMonthsToAddChange.bind(this);
    
    this.state = {
      monthsToAdd: 1
    };
  }
  
  onAddMonths(e) {
    e.preventDefault();
    var months = this.state.monthsToAdd;
    var {dispatch, sum, percents} = this.props;
    dispatch(actions.addMonthsItem(sum, percents, months));
    this.setState({ monthsToAdd: 1 });
  }

  onMonthsToAddChange(e) {
    if (isNaN(parseFloat(e.target.value))) return;
    this.setState({monthsToAdd: Math.floor(e.target.value)});
  }

  render() {

    var {isAddingMonths, sum, percents, dispatch, translate} = this.props;

    const inputFieldRender = () => {
      if(isAddingMonths){
        return (
          <form className='add-button-form'>
            <div className="row">
              <div className="small-5 meduim-6 columns">
                <label className="text-right middle" for="monthsToAdd">
                {translate('addPeriodMonths')}
                </label>
              </div>
              <div className="small-5 meduim-3 columns">
                <input type="number" name="monthsToAdd" aria-describedby="nameHelpText" 
                  value={this.state.monthsToAdd} min={1}
                  onChange={this.onMonthsToAddChange}/>
              </div>
              <div className="small-2 medium-2 columns">
                <input type="button" value="OK" className="button small" onClick={this.onAddMonths}/>
              </div>
            </div>  
          </form>
        );
      } 
      return '';
    }

    const renderButtonValue = () => {
      if(isAddingMonths){
        return translate('hide');
      }
      return `+ ${translate('addPeriod')}`
    }

    const buttonPushed = (e) => {
      e.preventDefault();
      dispatch(actions.addMonthsButtonPushed());
    }

    return (
      <div className="add-months-button-wrapper row">
        <div className="small-2 medium-2 columns">
          <input type="button" className="button small " value={renderButtonValue()} onClick={(e) => {buttonPushed(e);}}/>
        </div>  
        <div className="small-9 medium-7 end columns">  
          {inputFieldRender()}  
        </div>  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    isAddingMonths: state.commonAppState.isAddingMonths,
    sum: state.creditProps.sum,
    percents: state.creditProps.percents,
    translate: getTranslate(state.locale)
  }
};

export default withRouter(connect(mapStateToProps)(AddMonthsButton));