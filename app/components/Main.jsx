import React from'react';
import Nav from 'Nav';
import MiddleBar from 'MiddleBar';
import {Route} from 'react-router-dom';
import Bundle from 'Bundle';
import {Helmet} from 'react-helmet';
import { localize } from 'react-localize-redux';

import loadMortage from 'bundle-loader?lazy!Mortage'

import LanguageSelector from 'LanguageSelector';

// components load their module for initial visit
// const Mortage = (props) => (
//   <Bundle load={loadMortage}>
//     {(Mortage) => <Mortage {...props}/>}
//   </Bundle>
// )

import ConsumerLoan from 'ConsumerLoan';  

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // Mortage: () => {},
      CarLoan: () => {}
    }
  }

  componentWillMount() {
    import('Mortage').then(component => {
      this.setState({Mortage: component.default});
    });

    import('CarLoan').then(component => {
      this.setState({CarLoan: component.default});
    });
  }

  render() {
    let {CarLoan, Mortage} = this.state;
    let {translate} = this.props;

    return (
        <div className=" main">
          <Helmet>
            <title>{translate('title')}</title>
          </Helmet>
          <div >
            <LanguageSelector />
            <Nav />
            
            <MiddleBar />
            <div className="row small-12 columns">
              {this.props.children}

              <Route path="/consumer" component={ConsumerLoan} /> 
              {/* {CarLoan} */}
              <Route path="/car" component={CarLoan}/>
              <Route path="/mortage" component={Mortage}/>
            </div>
          </div>
        </div>
    );
  }
}

export default localize(Main, 'locale')