const MessageStore = require("./messsage_store");

const Compose = {
    render: () => {
        let div = document.createElement('div');
        div.className = 'new-messages';
        let p = document.createElement('p');
        p.className = 'new-message-header';
        p.innerHTML = 'New Message';
        
        let form = document.createElement('form');
        form.className = 'compose-form';
            // 3 inputs
            let to = document.createElement('input');
            to.name = 'to';
            to.value = MessageStore.messageDraft.to
            to.placeholder = 'Recepiant';
            let subject = document.createElement('input');
            subject.name = 'subject';
            subject.value = MessageStore.messageDraft.subject
            subject.placeholder = 'Subject'
            let body = document.createElement('textarea');
            body.name = 'body'
            body.rows = 20;
            body.innerHTML = MessageStore.messageDraft.body;
            let button = document.createElement('button');
            button.className = "btn btn-primary submit-message";
            button.type ='submit'
            button.innerHTML = 'Send';
        
        // addchild
        form.appendChild(to);
        form.appendChild(subject);
        form.appendChild(body);
        form.appendChild(button);
        div.appendChild(p);
        div.appendChild(form);
        return div;
    },

    // I/O to update field
    update: ()=>{
        
        let data =MessageStore.messageDraft.rendertoSend();
        let handle = (e)=>{
            e.preventDefault();
            let field = e.target;
            let fieldName = field.name;
            let fieldValue = field.value;
            data[fieldName] = fieldValue;
            MessageStore.updateDraftField(data);
            console.log(MessageStore.messageDraft);
        };

        

        let form = document.querySelector(".content")
        form.addEventListener('change',handle);
    },
    submit: ()=>{
        let send =(e)=>{
            e.preventDefault();
            MessageStore.sendDraft();
            window.location.hash = 'sent'
        };
        let form = document.querySelector(".content")
        form.addEventListener('submit', send);
    }
  


};

module.exports = Compose;