import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AnnuitetCreditComponent from 'AnnuitetCreditComponent';
import AddMonthsButton from 'AddMonthsButton';

import { getTranslate } from 'react-localize-redux';

// export class AnnuitetLoanList extends React.Component{
	
const AnnuitetLoanList = ({annuitetPayments, translate, ...props}) => {

		var currentRouteName = props.location ? props.location.pathname : '';

		var renderAnnuitetLoanList = () => {
			return annuitetPayments.map((item, index) => {
				return <AnnuitetCreditComponent key={item.getData().months} {...item.getData()} currentRouteName={currentRouteName}/>
			});
		}

		return (
		<div className="row loan-list-wrapper">
			<div className="small-12 medium-8 medium-offset-2">
				<AddMonthsButton/>
				<table className="unstriped loan-table">
					<thead>
							<tr>
								<th className="small-text" style={{width:"32px"}}>{translate('listHeaderDelete')}</th>
								<th className="small-text" style={{width:"15%"}}>{translate('listHeaderMonthsAmount')}</th>
								<th className="small-text" style={{width:"23%"}}>{translate('listHeaderMonthlyPayment')}</th>
								<th className="small-text" style={{width:"23%"}}>{translate('listHeaderTotalPayments')}</th>
								<th className="small-text" style={{width:"15%"}}>{translate('listHeaderOverpayment')}</th>
								<th className="small-text" style={{width:"15%"}}>{translate('listHeaderOverpayment')} %</th>
							</tr>
						</thead>
						<tbody>
							{renderAnnuitetLoanList()}			
						</tbody>	
				</table>
			</div>	
		</div>
		)
	}

const mapStateToProps = state => ({
	annuitetPayments: state.annuitetPayments,
  translate: getTranslate(state.locale),
});

export default withRouter(connect(mapStateToProps)(AnnuitetLoanList));