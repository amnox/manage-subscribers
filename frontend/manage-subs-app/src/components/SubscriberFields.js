import React from 'react'
import { getFieldsAPI, updateFeildAPI, createFieldAPI } from '../utils/api'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

export default class SubscriberFields extends React.Component {
  constructor(props){
    super(props)
    this.getFields = this.getFields.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.sendFieldUpdate = this.sendFieldUpdate.bind(this)
    this.sendFieldCreate = this.sendFieldCreate.bind(this)
    this.addField = this.addField.bind(this)
    this.state = {
      fields: null,
      modalIsOpen: false,
      createModalIsOpen:false,
      field_now : null,
      field_new : {
        title:'',
        type:'date'
      }
    }
  }

  addField(){
    this.setState({createModalIsOpen: true});
  }

  sendFieldCreate(){
    const { title, type } = this.state.field_new
    createFieldAPI({
      title,
      type,
      subscriber_id:this.props.subscriber_id
    }).then(()=>{
      this.getFields(this.props.subscriber_id)
    })
  }

  sendFieldUpdate() {
    
      return updateFeildAPI({...this.state.field_now})
        .then((data)=>{
          this.getFields(this.props.subscriber_id)
        })    
  }

  handleChange(type,event){
    const evals = event.target.value
    switch(type){
      case "type":
        this.setState((prevState)=>{
          return {
            ...prevState,
            field_now:{
              ...prevState.field_now,
              type:evals
            }
          }
        })
        break
      case "title":
        this.setState((prevState)=>{
          return {
            ...prevState,
            field_now:{
              ...prevState.field_now,
              title:evals
            }
          }
        })
        break
      case "typeCreate":
        this.setState((prevState)=>{
          return {
            ...prevState,
            field_new:{
              ...prevState.field_new,
              type:evals
            }
          }
        })
        break
      case "titleCreate":
        this.setState((prevState)=>{
          return {
            ...prevState,
            field_new:{
              ...prevState.field_new,
              title:evals
            }
          }
        })
        break
      
    }
  }

  openModal(field_now,e) {
    this.setState({modalIsOpen: true,field_now:field_now});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false,createModalIsOpen:false});
  }

  getFields(id){
    return getFieldsAPI(id).then((fields)=>{
      this.setState((prevState)=>{
        return {
          ...prevState,
          fields:fields
        }
      })
      
    })
    
  }

  componentDidMount(){
    this.getFields(this.props.subscriber_id)
  }

  render() {
    const fields = this.state.fields
    const options = ['date', 'number', 'string', 'boolean']
    
    return (
      <div className="fields-wrapper">
        <button className="create-field" onClick={this.addField}>Add Field</button>
      {
        this.state.fields == null
          ? (
              <p>Loading Fields...</p> 
          )
          : (
              <div>
                {
                  fields.map((it)=>{
                    return(
                      <div key={it.id} className='field-item'>
                        <p><b>Title: </b>{it.title}</p>
                        <label> <b>Type:</b>
                        <select value={it.type} disabled={true}>
                          {options.map((element) => {
                            return <option key={element}>{element}</option>
                          })}
                        </select>
                        </label>
                        <button className="field-button" onClick={(e)=>this.openModal(it,e)}>Edit Field</button>
                      </div>
                    )
                    
                  })
                }
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Edit Field</h2>
                  <div>
                    {
                      this.state.field_now==null
                        ? (
                          <h1></h1>
                        )
                        : (
                          <div>
                            <input name = "title" value = {this.state.field_now.title} onChange={(h) => this.handleChange("title", h)}/>
                            <select value={this.state.field_now.type} onChange={(h) => this.handleChange("type", h)}>
                              {options.map((element) => {
                                return <option key={element}>{element}</option>
                              })}
                            </select>
                          </div>
                        )
                    }
                  </div>
                  <button onClick={this.sendFieldUpdate}>Submit</button>
                  <button onClick={this.closeModal}>Close</button>
                  
                </Modal>
                <Modal
                  isOpen={this.state.createModalIsOpen}
                  onAfterOpen={this.afterOpenCreateModal}
                  onRequestClose={this.closeCreateModal}
                  style={customStyles}
                  contentLabel="Create Field"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Create Field</h2>
                  <div>
                    <input name = "title" value = {this.state.field_new.title} onChange={(h) => this.handleChange("titleCreate", h)}/>
                    <select value={this.state.field_new.type} onChange={(h) => this.handleChange("typeCreate", h)}>
                      {options.map((element) => {
                        return <option key={element}>{element}</option>
                      })}
                    </select>
                  </div>
                  <button onClick={this.sendFieldCreate}>Submit</button>
                  <button onClick={this.closeModal}>Close</button>
                  
                </Modal>
              </div>
          )
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
