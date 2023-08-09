// ./app/page.js
'use client'

import { useChat } from 'ai/react'
import Tabs from './components/tabs'
import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Opening from "@/app/components/opening";
import Chatpage from "@/app/components/chatpage";

export default function Chat() {
  const [activeTab, setActiveTab] = useState(1);
  const [name, setName]  = useState("")
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    // <div className='bg-white'>
    //   {messages.map(m => (
    //     <div key={m.id}>
    //       {m.role}: {m.content}
    //     </div>
    //   ))}

    //   <form onSubmit={handleSubmit}>
    //     <input
    //       value={input}
    //       placeholder="Say something..."
    //       onChange={handleInputChange}
    //     />
    //   </form>
    // </div>

      <div className="min-h-screen flex flex-col">

          {/*<Tabs changeTab={setActiveTab} />*/}
          {/*<div className="mt-4">*/}
          {/*    {activeTab === 1 && <div className="p-4">Hello World - Tab 1 Content</div>}*/}
          {/*    {activeTab === 2 && <div className="p-4">Hello World - Tab 2 Content</div>}*/}
          {/*</div>*/}
          {
              name.length > 0 ? <Chatpage userName={name}/>: (
                  <div>
                      <Navbar width={270}/>
                      <Opening setName={setName}/>
                  </div>
              )
          }
      </div>
  )
}