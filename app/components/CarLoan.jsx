import React from 'react';
import { Route } from 'react-router-dom';

import PriceCreditParams from 'PriceCreditParams';
import CreditParamsForm from 'CreditParamsForm';
import AnnuitetLoanList from 'AnnuitetLoanList';
import PaymentsTimetable from 'PaymentsTimetable';


class CarLoan extends React.Component{
	render() {
		return (
		<div>	
			<CreditParamsForm>
				<PriceCreditParams />
			</CreditParamsForm>
			{/* <AnnuitetLoanList /> */}

			<Route exact path="/car" component={AnnuitetLoanList}/>
			<Route exact path="/car/payments" component={PaymentsTimetable}/>

			{this.props.children}

		</div>
		)
	}
};

export default CarLoan;