$('#username').editable({
    type: 'text',
    url: '/post',    
    pk: 1,    
    title: 'Enter username',
    ajaxOptions: {
        type: 'put'
    }        
});