"use client";

import { useChat } from "ai/react";

export default function Form() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/translate",
    });
  const _handleSubmit = (e) => {
    setMessages([]);
    handleSubmit(e);
  };

  return (
    <>
      <form onSubmit={_handleSubmit}>
        <textarea
          name="prompt"
          value={input}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        ></textarea>
        <div style={{ width: "100%", minHeight: "50vh" }}>
          <pre style={{ width: "100%" }}>
            <code style={{ width: "100%", height: "50vh" }}>
              {messages
                .filter((message) => message.role == "assistant")
                .map((m) => (
                  <div key={m.id}>{m.content}</div>
                ))}
            </code>
          </pre>
        </div>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
