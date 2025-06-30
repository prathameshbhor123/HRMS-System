import React from "react";

const ChatBot = () => {

  return (
      <>

        <df-messenger
                chat-icon="/Logo.png"
                intent="WELCOME"
                chat-title="OddTech Bot"
                agent-id="43a58ae9-7364-47e2-8262-3a1eb686f293"
                language-code="en"
        ></df-messenger>
        </>
  );
};

export default ChatBot;
