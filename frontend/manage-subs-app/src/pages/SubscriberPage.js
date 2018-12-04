import React from 'react';
import Nav from '../components/Nav'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUpdateSubscriber } from '../actions/subscribers'
import SubscriberFields from '../components/SubscriberFields';
import '../styles/subscriber.css';

class SubscribePage extends React.Component {
  constructor(props){
    super(props)
    const subscriber_onpage = this.props.subscribers[this.props.match.params.id]
    this.state = {
      edit_enabled: false,
      select_options:['active', 'unsubscribed', 'junk', 'bounced', 'unconfirmed'],
      id:subscriber_onpage.id,
      email:subscriber_onpage.email,
      name:subscriber_onpage.name,
      address:subscriber_onpage.address,
      state:subscriber_onpage.state
    }

    this.handleChange = this.handleChange.bind(this)
    this.sendUpdate = this.sendUpdate.bind(this)
    this.enableEditing = this.enableEditing.bind(this)


  }

  enableEditing(){
    this.setState((prevState)=>{
      return {
        ...prevState,
        edit_enabled: !prevState.edit_enabled
      }
    })
  }

  sendUpdate(){
    
    const { id, email, name, address, state } = this.state
    const subscriber = {
      id,email,name,address,state
    }
    this.props.updateSubscriber(subscriber)
  }

  handleChange(type,event){
    const evals = event.target.value
    switch(type){
      case "email":
        this.setState((prevState)=>{
          return {
            ...prevState,
            email:evals
          }
        })
        break
      case "name":
        this.setState((prevState)=>{
          return {
            ...prevState,
            name:evals
          }
        })
        break
      case "address":
        this.setState((prevState)=>{
          return {
            ...prevState,
            address:evals
          }
        })
        break
      case "state":
        this.setState((prevState)=>{
          return {
            ...prevState,
            state:evals
          }
        })
        break
      
    }
  }
  
  render() {
    const subscriber_onpage = this.props.subscribers[this.props.match.params.id]
    const options = this.state.select_options

    return (
      <div>
        <Nav/>
        <h1>Subscriber Page</h1>
        <div className="container subz-boxx">
          <h1>Details</h1>
          <div className="edit-button-wrapper">
          <input className="edit-details" type="button" value="Edit" onClick={this.enableEditing}/>
          </div>
          <div className="detail-wrapper">
              <label className="detail-item">
                Email:
                <input type="text" name="email" disabled={!this.state.edit_enabled} value = { this.state.email } onChange = {(e)=>this.handleChange("email",e)}/>
              </label>
              <label className="detail-item">
                Name:
                <input type="text" name="name" disabled={!this.state.edit_enabled} value = { this.state.name } onChange = {(f)=>this.handleChange("name",f)}/>
              </label>
              <label className="detail-item">
                Address:
                <input type="text" name="address" disabled={!this.state.edit_enabled} value = { this.state.address } onChange = {(g)=>this.handleChange("address",g)}/>
              </label>
              <label> Status: 
              <select  value={this.state.state} onChange={(h) => this.handleChange("state", h)} disabled={!this.state.edit_enabled}>
                {options.map((element) => {
                  if(subscriber_onpage.state == element){
                    return <option key={element}>{element}</option>
                  } else {
                    return <option key={element}>{element}</option>
                  }
                  
                })}
              </select>
              </label>
              <div className="edit-button-wrapper">
              <input className="submit-details" type="button" hidden={!this.state.edit_enabled} onClick={this.sendUpdate} value="submit"/>
              </div>
            </div>
            <SubscriberFields subscriber_id={subscriber_onpage.id}/>
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

const mapDispatchToProps = dispatch => ({updateSubscriber: (s) => dispatch(handleUpdateSubscriber(s))})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SubscribePage))