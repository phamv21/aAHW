const MessageStore = require("./messsage_store");


const Sent = {
    render: () => {
        let ul = document.createElement('ul');
        ul.className = 'messages';

        //
        let allmessages = MessageStore.getSentMessages();
        // from subject body

        allmessages.forEach((message) => {
            let li = document.createElement('li');
            li.className = 'message'
            let to = document.createElement('span');
            to.className = 'to';
            let subject = document.createElement('span');
            subject.className = 'subject';
            let body = document.createElement('span');
            body.className = 'body';

            to.innerHTML = message.to;
            subject.innerHTML = message.subject + "\t\t";
            body.innerHTML = message.body;

            li.appendChild(to);
            li.appendChild(subject);
            li.append(body)
            ul.appendChild(li)

        })
        //

        return ul;
    },



};

module.exports = Sent;