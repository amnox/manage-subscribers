import React from 'react';
import { handleInitialData } from './actions/shared';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import HomePage from './pages/HomePage'
import NewSubscriber from './pages/NewSubscriber'
import SubscriberPage from './pages/SubscriberPage'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

class App extends React.Component {

    constructor(props){
        super(props);
        //console.log(props);
    }

    componentDidMount () {
        this.props.dispatch(handleInitialData());
    }
    render () {
        return (
          <Router>
            <div>
              <LoadingBar/>
              {
                this.props.loading===true
                ?<h1>Loading</h1>
                :<div>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/new_subscriber" exact component={NewSubscriber} />
                  <Route path="/subscriber/:id" exact component={SubscriberPage} />
                </div>
              }
            </div>
          </Router>
        )
    }
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
function mapStateToProps({subscribers}) {
  //console.log(isEmpty(authedUser))
  return {
    subscribers,
    loading:isEmpty(subscribers)
  }
}

export default connect(mapStateToProps)(App);