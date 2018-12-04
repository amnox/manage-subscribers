import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

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
            <div>
                {
                    Object.keys(subscribers).map((it)=>(
                        <div key = {subscribers[it].id} onClick={()=>this.openSubscriber(subscribers[it].id)}>
                            <div>{subscribers[it].email}</div>
                            <div>{subscribers[it].name}</div>
                            <div>{subscribers[it].address}</div>
                            <div>{subscribers[it].state}</div>
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