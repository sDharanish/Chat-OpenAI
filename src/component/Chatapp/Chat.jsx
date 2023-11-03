import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import gptlogo from '../Asserts/chatgpt.svg';
import addbtn from '../Asserts/add-30.png';
import mssgbtn from '../Asserts/message.svg';
import home from '../Asserts/home.svg';
import save from '../Asserts/bookmark.svg';
import rocket from '../Asserts/rocket.svg';
import send from '../Asserts/send.svg';
import user from '../Asserts/user-icon.png';
import gpt from '../Asserts/chatgptLogo.svg';
import {Sendmssgtoopenai} from './Oprnai'

function Chat() {
    const msgend = useRef(null);
    const [input, setinput] = useState("");
    const [message , setmessage] = useState([
        {
        text: "Hi, i'm openai ! how can i help you",
        isbot: true,
    }
]);

useEffect(()=>{
    msgend.current.scrollIntoView();
},[message]);

    const handlesend = async() =>{
        const text = input;
        setinput('');
        setmessage([
            ...message,{text,isbot:false}
        ]);
        const res = await Sendmssgtoopenai(text);
        setmessage([
            ...message,
            {
                text, isbot:false
            },
            {text:res,isbot:true}
        ]);
    }

    const handlenter = async(e)=>{
        if(e.key === 'Enter') await handlesend();
    }

    const handlequery = async (e) =>{
        const text = e.target.value;
        setmessage([
            ...message,{text,isbot:false}
        ]);
        const res = await Sendmssgtoopenai(text);
            setmessage([
                ...message,
                {
                text, isbot:false
                },
            {text:res,isbot:true}
    ])}
  return (
    <div className='app'>
        <div className='sidebar'>
            <div className='upperside'>
                <div className='uppersidetop'>
                    <img src={gptlogo} alt="logo" className='logo'/>
                    <span className='brand'>ChatGPT</span>
                </div>
                <button className='midbtn' onClick={()=> window.location.reload()}>
                    <img src={addbtn} alt="new chat" className='addbtn' />
                    New Chat
                </button>
                <div className='uppersidebottom'>
                    <button className='query' onClick={handlequery} value={input}>
                        <img src={mssgbtn} alt="query" />
                        What is the use of API?
                    </button>
                    <button className='query' onClick={handlequery} value={input}>
                        <img src={mssgbtn} alt="query" />
                        How to use chatgpt?
                    </button>
                </div>


            </div>
            <div className='lowerside'>
                <div className='listitem'>
                    <img src={home} alt="home"  className='listitemimg'/> Home
                </div>
                <div className='listitem'>
                    <img src={save} alt="save"  className='listitemimg'/> Save
                </div>
                <div className='listitem'>
                    <img src={rocket} alt="rocket"  className='listitemimg'/>Upgrade to pro 
                </div>

            </div>

        </div>
        <div className='mainbar'>
            <div className='chats'>
                
                {message.map((message,i) =>
                    <div key={i} className={message.isbot? 'chat bot': 'chat'}>
                        <img src={message.isbot?gpt:user} alt="gptlogo" className='chatimg' />
                        <p className='txt'>{message.text}</p>

                    </div>
                )}
                <div ref={msgend}/>

            </div>
            <div className='chatsfooter'>
                <div className='inp'>
                    <input type="text" placeholder='Send a Message' value={input}  onChange={(e) => setinput(e.target.value) }onKeyDown={handlenter}/>
                    <button className='send' onClick={handlesend}> <img src={send} alt="send" />
                    </button>

                </div>
                <p>ChatGPT can make mistakes. Verify important information.</p>

            </div>

        </div>


    </div>
  )
}

export default Chat