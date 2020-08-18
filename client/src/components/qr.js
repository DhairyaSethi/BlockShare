import React, {useState} from 'react'
import QRCode from 'qrcode.react';
import {Button, Input, Link} from '@material-ui/core'

export default function QR (props) {
    const {channel, setChannel} = props
    const [temp, setTemp] = useState()

    const changeChannel = () => {
        setChannel(temp)
    }

    return (
        <div>
                <QRCode  value={channel} />
                <h6>Currently on <Link>{channel}</Link></h6>
            <div>
                <Input type='text' label='Enter Channel Id' multiline onChange={e=>setTemp(e.target.value)}></Input>
                <Button onClick={changeChannel}>Join Channel</Button>
            </div>
        </div>
    )
}