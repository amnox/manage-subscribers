import React,{ Component } from 'react';
import Nav from '../components/Nav';
import SubscriberList from '../components/SubscriberList';
import { connect } from 'react-redux';
import '../styles/home.css';
import classNames from 'classnames';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class HomePage extends Component {
    constructor(props){
        super(props);
        //console.log(props)
        this.openSubscriber = this.openSubscriber.bind(this)
    }

    openSubscriber(id){
        this.props.history.push('/subscriber/'+id)
    }

    render () {
        var homeClass = classNames({
            'home':true
          });
        //console.log(questionList)
        return (

            <div id="home" className = {homeClass}>
                <Nav/>
                <h1 className = "welcome">Welcome Back</h1>
                <div>
                    <SubscriberList openSubscriber = {this.openSubscriber}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({subscribers}) {

    return {
        subscribers
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));