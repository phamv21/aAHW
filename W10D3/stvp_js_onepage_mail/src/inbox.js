const MessageStore = require("./messsage_store");



const Inbox = {
    render: ()=>{
        let ul = document.createElement('ul');
        ul.className = 'messages';

        // get the messages
        let allmessages = MessageStore.getInboxMessages();
        // from subject body
        
        allmessages.forEach((message)=>{
            let li = document.createElement('li');
            li.className = 'message'
            let from = document.createElement('span');
            from.className = 'from';
            let subject = document.createElement('span');
            subject.className = 'subject';
            let body = document.createElement('span');
            body.className = 'body';
            
            from.innerHTML = message.from;
            subject.innerHTML = message.subject + "\t\t";
            body.innerHTML = message.body;

            li.appendChild(from);
            li.appendChild(subject);
            li.append(body)
            ul.appendChild(li)

        })

        // ul.innerHTML = 'An Inbox Message';


        return ul;
    },



};



module.exports = Inbox;