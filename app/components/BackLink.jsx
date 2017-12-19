import React from 'react';
import {Link} from 'react-router-dom';
import { localize } from 'react-localize-redux';

var BackLink = ({linkHistory, translate, backClass}) => {
    var goBack = (e) => {
        e.preventDefault();
        linkHistory.goBack();
    }

    backClass = (backClass || 'float-left') + ' button small back-link';
    var backText = `< ${translate('back')}`;

    return (
        <Link to="/" className={backClass} onClick={(e) => {goBack(e);}}>{backText}</Link>
    )
}

export default localize(BackLink, 'locale');