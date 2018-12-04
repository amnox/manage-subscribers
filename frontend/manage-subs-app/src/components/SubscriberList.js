import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames';

class SubscriberList extends React.Component {
    constructor(props){
        super(props)
        this.openSubscriber = this.openSubscriber.bind(this)
    }

    openSubscriber(id){
        this.props.openSubscriber(id)
    } 

    render() {
        const { subscribers } =  this.props
        return(
            <div className="container">
                {
                    Object.keys(subscribers).map((it)=>(
                        <div className="subz_item" key = {subscribers[it].id} onClick={()=>this.openSubscriber(subscribers[it].id)}>
                            <div><b>Email: </b>{subscribers[it].email}</div>
                            <div><b>Name: </b>{subscribers[it].name}</div>
                            <div><b>Address: </b>{subscribers[it].address}</div>
                            <div><b>State: </b>{subscribers[it].state}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps({ subscribers }){
    return {
        subscribers
    }
}

export default connect(mapStateToProps)(SubscriberList)