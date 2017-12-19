import React from 'react';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';

import PaymentsTimetableList from 'PaymentsTimetableList';
import BackLink from 'BackLink';

var PaymentsTimetable = ({match, months, history, translate}) => {
        
    var renderMonths = () => {
        return months ? ` ${translate('for')} ${months} ${translate('months')}` : '';
    }   
    // console.log(props);

    return (
        <div className="row">
            <div className="small-12 medium-8 medium-offset-2 columns">
                <BackLink linkHistory={history}/>
                <div className="text-center">{translate('paymentsTimetable')}{renderMonths()}</div></div>
            <PaymentsTimetableList />
        </div>
    )
}

const mapSateToProps = (state) => {
    return { 
        months: state.activeCredit.months,
        translate: getTranslate(state.locale)
	}
}

export default withRouter(connect(mapSateToProps)(PaymentsTimetable));