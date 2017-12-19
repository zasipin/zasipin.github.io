import React from 'react';
import { localize } from 'react-localize-redux';
    
const ShowYear = ({months, translate}) => {
	var renderYear = (year) => {
		year = year > 0 ? year : 0;
		if(year == 1)
			return translate('year');
		if(year > 1 && year < 5)
			return translate('years_2_4');
		return translate('years_5');
	}

	const renderYearNumber = (months) => {
		if(months % 12 == 0)
			return months / 12;
		return parseFloat(months / 12).toFixed(2);			
	}

  return ( 
    <React.Fragment>
      {renderYearNumber(months)} {renderYear(months/12)}
		</React.Fragment>
  );
};

export default localize(ShowYear, 'locale');