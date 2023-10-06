import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

const MainCont = styled.div`
position: absolute;
bottom:0px;
width: 100%;

.chat-inp-cont{
    padding-left: 10px;
    height: 70px;
    background: rgb(2,0,36);
background: -moz-linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(7,7,8,1) 98%, rgba(0,0,0,1) 99%);
background: -webkit-linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(7,7,8,1) 98%, rgba(0,0,0,1) 99%);
background: linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(7,7,8,1) 98%, rgba(0,0,0,1) 99%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#000000",GradientType=1);

      display: flex;
    gap: 10px;
    align-items: center;
}
.input-container{
    display: flex;
    align-items: center;
    width: 95%;
    border-radius: 2rem;
    gap: 2rem;
    background-color: #ffffff34 ;
    input{
        width: 90%;
        height: 70%;
        background-color: transparent;
        color: white;
        border: none;
        outline: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color:#9186f3 ;
        }
        &:focus{
            outline: none;
        }
    }
}
.emoji svg{
    cursor: pointer;
    color: #ffff00c8;
    font-size: 1.5rem;
  
}
.emj{
        position: absolute;
        margin-top:-500px;
    }
.send-btn{
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 2rem;
        color: #fff;

    }
}
`


function Chatinput({handleSendMessage}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    const[emoji,setEmoji] = useState("");
    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);

    }

    function handleEmojiClick (event,emojiObject){
        let message = msg;
    //    console.log(mes);
        // message+=emoji.emoji;
        // console.log(emoji);
        // console.log(msg+emoji);
        setMsg(message);
    }
    const sendChat = ()=>{
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg('');
        }
    }
  return (
    <MainCont>
        <div className='chat-inp-cont'>
        <div className='emoji'>
            <BsEmojiSmileFill onClick={()=>handleEmojiPickerHideShow()}/>
            {
                showEmojiPicker && <div className='emj'><Picker onEmojiClick={handleEmojiClick}/></div>
            }
        </div>
        <div className='input-container'>
        <input type="text" className='inner-inp' placeholder='type your message here' value={msg}  onChange={(e)=>setMsg(e.target.value)} 
            onKeyDown={(e)=>{
                
                if(e.key === "Enter") { 
                    console.log(e.key);
                    sendChat()
              }
            }}
        />
            <div className='send-btn' onClick={()=>sendChat()}>
                <IoMdSend/>
            </div>
        </div>
        </div>
    </MainCont>
  )
}

export default Chatinput
