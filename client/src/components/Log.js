import React from 'react'
import {List, ListItem,Typography} from '@material-ui/core'


export default function Log(props) {

    return(
      <div>
        <List component="nav">
          <ListItem>
          <Typography component="div">
            { props.messages.map((item, index)=>(
                <div key={index}>{item.uuid + ':' + item.text}</div>
            )) }
          </Typography>
          </ListItem>
        </List>
      </div>
    )
};
