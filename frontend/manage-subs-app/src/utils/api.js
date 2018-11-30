export function getAllSubscribers(){
  return fetch('http://127.0.0.1:8000/api/subscriber')
  .then((resp) => {return resp.json()})
  .catch(error => {return error} )
}

export function getSubscriber(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}`)
  .then((resp) => {return resp.json()})
  .catch(error => {return error} )
}

export function getFields(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}/fields`)
  .then((resp) => {return resp.json()})
  .catch(error => {return error} )
}

export function deleteSubscriber(id){
  return fetch(`http://127.0.0.1:8000/api/subscriber/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {return error} )
}

export function createSubscriber(data){
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('state', data.state);
  return fetch(`http://127.0.0.1:8000/api/subscriber`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {return error} )
}

export function createField(data){
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('type', data.type);
  formData.append('subscriber_id', data.subscriber_id);
  return fetch(`http://127.0.0.1:8000/api/field`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {return error} )
}

export function updateSubscriber(data){
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('state', data.state);
  return fetch(`http://127.0.0.1:8000/api/subscriber`, {
        method: 'PATCH',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {return error} )
}

export function updateFeild(){
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('type', data.type);
  formData.append('subscriber_id', data.subscriber_id);
  return fetch(`http://127.0.0.1:8000/api/field`, {
        method: 'PATCH',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {return error} )
}