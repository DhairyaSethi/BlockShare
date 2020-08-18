import React from 'react'
import {List, ListItem,Typography} from '@material-ui/core'


export default function Log(props) {

    return(
      <List component="nav">
        <div className='chat'>
          <ListItem className='user-text'>
            <Typography component="div">
              { props.messages.map((item, index)=>(
                  <div key={index}>
                    <strong>{item.uuid}</strong>   :   {item.text}
                  </div>
              )) }
            </Typography>
          </ListItem>
          </div>
      </List>
    )
};
