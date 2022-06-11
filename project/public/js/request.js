function request(url, method, data) {
    
    url = '/form' + url
    if (method === 'POST')
        return fetch(url, {
            method: method,
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res=>{
            return res.json();
        })
    
    if (method === 'GET')
        return fetch(url, { 
            method: 'GET'
        })
        .then(res=>{
            return res.json();
        })
}

function request_table(url, method, data) {

    if (method === 'POST')
        return fetch(url, {
            method: method,
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res=>{
            return res.json();
        })
    
    if (method === 'GET')
        return fetch(url, { 
            method: 'GET'
        })
        .then(res=>{
            return res.json();
        })
}