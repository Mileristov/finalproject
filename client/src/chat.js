import { useState, useEffect } from "react";

import io from "socket.io-client";

let socket;

export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        // here we are sure that socket is connected

        // listen to the recent messages event, update the state accordingly

        return () => {
            // unsubscribe from both events via socket.off(eventName)
            socket.disconnect();
            socket = null;
        };
    }, []);

    useEffect(() => {
        // listen to the new message event, update the state accordingly
    }, [messages]);

    function onSubmit(event) {
        event.preventDefault();
        // emit the "whisper" event
    }

    return (
        <section className="chat">
            <h2>Chat</h2>
            // list of messages // form
        </section>
    );
}
