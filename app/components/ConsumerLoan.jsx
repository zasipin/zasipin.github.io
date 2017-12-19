import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import CreditParams from 'CreditParams';
import CreditParamsForm from 'CreditParamsForm';
import AnnuitetLoanList from 'AnnuitetLoanList';
import PaymentsTimetable from 'PaymentsTimetable';

export class ConsumerLoan extends React.Component{
	
	render() {
		// var {annuitetPayments} = this.props;
		// var renderAnnutitLoanList = () => {
		// 	return annuitetPayments.map((item, index) => {
		// 		return <AnnuitetCreditComponent key={index} {...item.getData()}/>
		// 	});
		// }
		// console.log(this.props);
		return (
		<div>
			<CreditParamsForm>
				<CreditParams />
			</CreditParamsForm>
			{/* <AnnuitetLoanList /> */}

			<Route exact path="/consumer" component={AnnuitetLoanList}/>
			<Route exact path="/consumer/payments" component={PaymentsTimetable}/>

			{this.props.children}
		</div>
		)
	}
};

export default withRouter(
//	connect(
// 	(state) => {
//     return { 
// 		annuitetPayments: state.annuitetPayments
// 	}
// }
//)
// (
ConsumerLoan
// )
);

