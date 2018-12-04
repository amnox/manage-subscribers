export async function getAllSubscribersAPI(){
  return fetch('http://127.0.0.1:8000/api/subscriber')
  .then((resp) => resp.json()) 
  .then((resp) => {
    let data = {}
    var i
    for (i in resp){
      let id = resp[i].id
      data[id] = resp[i]
      
    }
    return data
  })
  .catch(error => {
    alert(error)
    return error
  })
}

export function getSubscriberAPI(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}`)
  .then((resp) => {
    let data = resp.json()
    return {[data.id]:data}
  })
  .catch(error => {return error} )
}

export function getFieldsAPI(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}/fields`)
  .then((resp) => resp.json()) 
  .then((resp) => {
    
    return resp
  })
  .catch(error => {
    alert(error)
    return error
  })
}

export function deleteSubscriberAPI(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {return error} )
}

export function createSubscriberAPI(data){
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('state', data.state);
  return fetch(`http://127.0.0.1:8000/api/subscriber`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
      data = response.json()
      return {[data.id]:data}
    })
    .catch(error => {return error} )
}

export function createFieldAPI(data){

  return fetch(`http://127.0.0.1:8000/api/field`, {
        method: 'POST',
        body: JSON.stringify({
          'title': data.title,
          'type': data.type,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
        }
    })
    .then(response => {
      data = response.json()
      return {[data.id]:data}
    })
    .catch(error => {return error} )
}

export async function updateSubscriberAPI(data){
  return fetch(`http://127.0.0.1:8000/api/subscriber/`+data.id, {
        method: 'PATCH',
        credentials: "same-origin",
        body: JSON.stringify({
          'name': data.name,
          'email': data.email,
          'address':data.address,
          'state':data.state
      }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
      },

    })
    .then(response => {
      console.log(response)
      if(!response.ok){
        
        throw response
      }
      response.json().then((dat)=>{
        alert("Updated Successfully")
        return {[dat.id]:dat}
      })
    })
    .catch(error => {
      const res = error.json().then((dat)=>{
        console.log(dat)
        alert(dat.message)
      })
      
    } )
}

export function updateFeildAPI(data){

  return fetch(`http://127.0.0.1:8000/api/field/`+data.id, {
        method: 'PATCH',
        body: JSON.stringify({
          'title': data.title,
          'type': data.type,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
        }
    })
    .then(response => {
      response.json().then((dat)=>{
        alert("Updated Successfully")
        return {[dat.id]:dat}
      })
    })
    .catch(error => {return error} )
}