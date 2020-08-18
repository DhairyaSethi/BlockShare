# BlockShare

## Abstract
Over the last few decades, there have been multiple technical revolutions starting from the
internet that have reshaped most businesses around the world. Similarly, the current decade is
highly witnessing once such change called the &quot;data revolution&quot;. With the four main uses -
describing, diagnosing, predicting, and prescribing potential ideas, patterns, or concerns, data
has become the new essential tool for development in the 21st century. Therefore, most
companies worldwide are relying on data to provide intelligent insights that could improve
their standards. In addition to this, all new exciting technologies like Machine learning,
artificial intelligence heavily rely upon factual data.     

Thus, data has slowly seeped into our lives and has become an ultimate part of every sector.
The value of the data has improved continuously and has caught the eyes of potential hackers
and intruders. There have been numerous stories concerning firms that have experienced
devastating losses due to data breaches. Despite the widespread awareness about the
importance of data security and integrity, many companies fail to prioritize when selecting
and implementing their file-sharing options. Thus, a secure and efficient data transfer service
to replace apps like ShareIt and Xander, for individuals and communities or organizations is
of utmost importance. With the above objective in mind, we propose a real-time file-sharing
application that could replace existing apps while simultaneously increasing security during
data/file transfer. One other notable feature of the application is that it does not store user
information to respect the privacy of user data.     

## Objectives
The application “Blockshare” has been designed in such a way to guarantee and meet the
following objectives:

- To create a replacement for recently banned applications like shareit and xender
which has been heavily relied upon by the Indians as their standard file sharing app.
- To solve the problems of the traditional file-sharing applications including data
security and user privacy.
- To create an open-source application for secure file transfer supporting both online or
offline modes.
- To design a serverless file-sharing technology, removing the dependability of the
middle-men by employing the peer-to-peer design architecture using websockets.
- To implement a solution that respects the user privacy and does not collect any user
related information, while enabling the user to transfer files in incognito mode.

## Set-Up
- Install nodemodules inside the client as well as server folder. 
``` 
cd client && npm i && npm start
cd server && npm i && nodemon index.js
```

## Technologies Used
- Websockets
- PeerJS WebRTC Library
- PubNub
- ReactJS

## Conclusion and Future Work
This project aims to create an alternative for the recently banned file-sharing applications like Shareit and Xender. Though the primary objective is to make an Indian-version of file sharing app that eliminates the dependability on foreign services, making India more self-reliant, the application has also parallelly improved its security paradigms to ensure a more secure and efficient alternative to the traditional file-sharing systems. On understanding the current issues and the latest demands of the industry concerning sharing apps, it was concluded that the centralized nature and the privacy threats of the existing solution have to be immediately addressed. Thus, by including the peer-to-peer distributed architecture rather than using a centralized server, the application removed the dependability on centralized systems. The app also allows the user to transfer files via incognito mode to understand and promote user privacy. Therefore, BlockShare stands an ultimate file-sharing tool that can be employed for official or personal uses.
