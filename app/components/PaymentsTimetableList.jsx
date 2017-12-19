import React from 'react';
import {connect} from 'react-redux';
import PaymentsTimetableItem from 'PaymentsTimetableItem';
import {AnnuitetMonthlyPayment} from 'AnnuitetMonthlyPayment';
import { getTranslate } from 'react-localize-redux';

export class PaymentsTimetableList extends React.Component{

	render() {
		// console.log(this);
		var {sum, percents, months, translate} = this.props;
		// var currentRouteName = this.props.location.pathname;

		var renderEmptyRow = () => {
			return (
				<tr>
					<td colSpan='5' className="text-center">{translate('noData')}</td>
				</tr>
			)
		}
		
		var renderTimetableItems = () => {
			var index = 0, items = [];
			for(;months > 0; months--)
			{
				// sum = 0, percents = 0, months = 0, extraPay = 0
				var payment = new AnnuitetMonthlyPayment(sum, percents, months);
				items.push(<PaymentsTimetableItem key={index} payment={payment}/>);
				sum = sum - payment.getData().paymentForCredit;
				index++;
			}
			
			return items.length > 0 ? items : renderEmptyRow();
		}

		

		return (
		  <div className="row"> 
				<div className="small-12 medium-8 medium-offset-2 columns">
					<table className="unstriped loan-table">
						<thead>
							<tr>
								<th className="small-text" style={{width:"10%"}}>{translate('month')}</th>
								<th className="small-text" style={{width:"23%"}}>{translate('monthlyPayment')}</th>
								<th className="small-text" style={{width:"23%"}}>{translate('paymentForLoan')}</th>
								<th className="small-text" style={{width:"20%"}}>{translate('paymentFor')} %</th>
								<th className="small-text" style={{width:"23%"}}>{translate('sumLeftToPay')}</th>
							</tr>
						</thead>
						<tbody>
							{renderTimetableItems()}
						</tbody>
					</table>	
					
				</div>
		  </div>
		)
	}
};

const mapStateToProps = (state) => {
    return { 
		// annuitetPayments: state.annuitetPayments,
		months: state.activeCredit.months,
        sum: state.creditProps.sum,
		percents: state.creditProps.percents,
		translate: getTranslate(state.locale)
	}
}

export default connect(mapStateToProps)(PaymentsTimetableList);