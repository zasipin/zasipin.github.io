import React from 'react';

var BigTextLabel = (props) => {
	return (
        <div className="row big-text-label">
            <div className="columns small-centered small-10 small-offset-1 medium-8 medium-offset-2 big-font">
                {props.children}
            </div>
        </div>
    )
}

export default BigTextLabel;