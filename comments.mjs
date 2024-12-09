import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, set, ref, query, orderByKey, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyBcES2xLXS_ncRGQktBDlr7i8S_AB_b-Vc", // just take it fuck you bitch 
    authDomain: "mywebsite1-b6033.firebaseapp.com",
    databaseURL: "https://mywebsite1-b6033-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mywebsite1-b6033",
    storageBucket: "mywebsite1-b6033.firebasestorage.app",
    messagingSenderId: "489974492139",
    appId: "1:489974492139:web:62b64a831e4451a16407ae",
    measurementId: "G-XHZLCGTN2N"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

class Message 
{
    constructor(name, message) 
    {
        this.obj = {
            name: name,
            message, message,
        };
    }
}

class MessageElem
{
    constructor(name, message, timestamp)
    {
        this.timestamp = new Date(timestamp);
        this.element = document.createElement("div");

        let date = `${this.timestamp.getDate()}/${this.timestamp.getMonth() + 1}/${this.timestamp.getFullYear()}`;
        let time = `${this.timestamp.getHours()}:${this.timestamp.getMinutes() < 10 ? '0' : ''}${this.timestamp.getMinutes()}`;

        const nametime = document.createElement("p");
        nametime.innerText = `${name} at ${date} ${time}`;
        nametime.style.fontSize = "12px";
        nametime.style.marginBottom = "3px";

        const msg = document.createElement("p");
        msg.innerText = message;
        msg.style.marginTop = "3px";

        this.element.append(nametime, msg);
    }
}

async function appendMessage(data) 
{
    const time = new Date().getTime();
    await set(ref(database, `messages/${time}`), data.obj);
    return time;
}

async function queryMessages() 
{
    const mquery = query(ref(database, `messages/`), orderByKey());
    const messages = await get(mquery);

    if(messages.exists())
    {
        return messages.val();
    }
    else return null;
}

async function loadMessages()
{
    const comments = document.querySelector("#comments");
    const messages = await queryMessages();

    for(const key in messages)
    {
        const elem = new MessageElem(messages[key].name, messages[key].message, parseInt(key));
        comments.append(elem.element);
    }

    comments.scrollTo(0, comments.scrollHeight);
}

async function sendMessage()
{
    const nameElem = document.querySelector("#msg-name");
    const msgElem = document.querySelector("#msg-msg");
    const comments = document.querySelector("#comments");

    if(nameElem.value.match(/^\s*$/gm) || msgElem.value.match(/^\s*$/g)) return;

    const msg = new Message(nameElem.value, msgElem.value);
    const time = await appendMessage(msg);
    const newMessage = new MessageElem(nameElem.value, msgElem.value, time);

    comments.append(newMessage.element);
    msgElem.value = "";

    comments.scrollTo(0, comments.scrollHeight);
}

document.body.onload = loadMessages;

window.sendMessage = sendMessage;