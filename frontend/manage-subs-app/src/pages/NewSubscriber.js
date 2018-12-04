import React from 'react';
import Nav from '../components/Nav'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleCreateSubscriber } from '../actions/subscribers'

class NewSubscriber extends React.Component {
  constructor(props){
    super(props)
    this.state = {

      id:'',
      email:'',
      name:'',
      address:'',
      state:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendUpdate = this.sendUpdate.bind(this)
  }

  sendUpdate(){
    const { email, name, address, state } = this.state
    if(email=="" || name=="" || address=="" || state==""){
      alert("Fill Values first")
      return
    }
    const subscriber = {
      email,name,address,state
    }
    this.props.createSubscriber(subscriber)
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
    const options = ['','active', 'unsubscribed', 'junk', 'bounced', 'unconfirmed']
    return (
      <div>
        <Nav/>
        <div>
          <label>
            Email:
            <input type="text" name="email" value = { this.state.email } onChange = {(e)=>this.handleChange("email",e)}/>
          </label>
          <label>
            Name:
            <input type="text" name="name" value = { this.state.name } onChange = {(f)=>this.handleChange("name",f)}/>
          </label>
          <label>
            Address:
            <input type="text" name="address" value = { this.state.address } onChange = {(g)=>this.handleChange("address",g)}/>
          </label>
          <select value={this.state.state} onChange={(h) => this.handleChange("state", h)}>
            {options.map((element) => {
                return <option key={element}>{element}</option>
              }
              
            )}
          </select>
          <input type="button" onClick={this.sendUpdate}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ subscribers }){
  return {
    subscribers
  }
}

const mapDispatchToProps = dispatch => ({createSubscriber: (s) => dispatch(handleCreateSubscriber(s))})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewSubscriber))