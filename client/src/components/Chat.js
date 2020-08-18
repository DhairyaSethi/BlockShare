import React, { useEffect, useState} from 'react'
import PubNub from 'pubnub'
import Config from './../assets/config'
import {Card, CardActions, CardContent,List, ListItem,Button,Typography,Input} from '@material-ui/core';
import Log from './Log'
import './Chat.css'

let pubnub 

export default function Chat (props) {

    const {username, channel} = props
    
    const [temp, setTemp] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        pubnub = new PubNub({
            publishKey: Config.publishKey,
            subscribeKey: Config.subscribeKey,
            secretKey: Config.secretKey,
            uuid: username,
            setSecure: false
        })
        console.log('USERNAME CHANNEL  ', username, channel)

        pubnub.addListener({
            status: e => {
                if(e.category === 'PNConnectedCategory') console.log('pubnub connected')
            },
            message: msg => {
                if(msg.message.text) {
                    let newMessages = []
                    newMessages.push({
                        uuid: msg.message.uuid,
                        text: msg.message.text
                    })
                    setMessages(messages => messages.concat(newMessages))
                }
            }

        })

        pubnub.subscribe({
            channels: [channel]
        })
        // pubnub.history({
        //     channel: channel,
        //     count: 10,
        //     stringifiedTimeToken: true
        // }, (status, response) => {
        //     console.log('Status ', status)
        //     if(!response) return
        //     let newMessages = []
        //     for(let i = 0; i < response.messages.length ; i++){
        //         newMessages.push({
        //             uuid: response.messages[i].entry.uuid,
        //             text: response.messages[i].entry.text
        //         })
        //     }
        //     setMessages(messages=>messages.concat(newMessages))
        // })
        return function cleanup() {
            pubnub.unsubscribeAll()
            setMessages([])
        }
    }, [])

    const publishMessage = () => {
        if(temp) {
            pubnub.publish({
                message: {
                    text: temp,
                    uuid: username
                },
                channel: channel
            })
            setTemp('')
        }   
    }


    return (
        <div>
            <Card elevation={0}>
                <CardContent>
                    <div className="top">
                        <Typography variant="h5" inline >
                            Chat
                        </Typography>
                    </div>
                    <div>
                        <Log messages={messages} user={username}/>
                    </div>
                </CardContent>
            <CardActions>
                <Input
                    placeholder="Enter a message"
                    fullWidth={true}
                    id="messageInput"
                    value={temp}
                    onChange={e=>setTemp(e.target.value)}
                    onKeyDown={e => {if(e.key === 'Enter') publishMessage();}}
                    inputProps={{'aria-label': 'Message Field',}}
                    autoFocus={true}
                />
                <Button
                    size="small"
                    color="primary"
                    onClick={publishMessage}
                    >
                    Send
                </Button>
            </CardActions>
        </Card>
      </div>
    )
}