import React from 'react';
import BigTextLabel from 'BigTextLabel';
import { localize } from 'react-localize-redux';

const BigTextLabelComponent = function({translate}) {
  return (
    <div className="show-for-medium">
      <BigTextLabel>
        { translate('makeDecision') }
        <br/>
        { translate('loanCalcRod') }
      </BigTextLabel>	
    </div>
  )
}

export default localize(BigTextLabelComponent, 'locale');