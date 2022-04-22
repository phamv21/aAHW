let messages = {
    sent: [
        {
            to: "friend@mail.com",
            subject: "Check this out",
            body: "It's so cool"
        },
        { to: "person@mail.com", subject: "zzz", body: "so booring" }
    ],
    inbox: [
        {
            from: "grandma@mail.com",
            subject: "Fwd: Fwd: Fwd: Check this out",
            body:
                "Stay at home mom discovers cure for leg cramps. Doctors hate her"
        },
        {
            from: "person@mail.com",
            subject: "Questionnaire",
            body: "Take this free quiz win $1000 dollars"
        }
    ]
};

class Messagge {
    constructor(){
        this.from = '';
        this.to = '';
        this.subject = '';
        this.body = '';
    }
    rendertoSend(){
        return {
            to: this.to,
            subject: this.subject,
            body: this.body
        }
    }

}

let MessageStore = {
    getInboxMessages: ()=>{
        return messages.inbox;
    },
    getSentMessages: ()=>{
        return messages.sent;
    },
    messageDraft: new Messagge(),
    updateDraftField:(data)=>{
        MessageStore.messageDraft.from = data.from;
        MessageStore.messageDraft.to = data.to;
        MessageStore.messageDraft.subject = data.subject;
        MessageStore.messageDraft.body = data.body;

    },
    sendDraft: ()=>{ // save draft to the database and reset draft
        messages.sent.push(MessageStore.messageDraft.rendertoSend());
        MessageStore.messageDraft = new Messagge;

    }

}

module.exports = MessageStore;