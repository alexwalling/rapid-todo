# RapidTODO

The idea behind this project came from aalways texting myself or slacking myself little notes or things I needed to do. I was already using imessage so I would just start a new conversation and send a message to myself with the imporant information or reminder and the same thing was happening with slack. So I thought, what if there was a better way to do this, but I could have more access to that data across different platforms and even a website that had my notes hosted on it.

## Slack: 
Slack webhooks through RapidAPI allow for easy implementation of slash commands from slack. So I started with them. A few short minutes had past and I was already able to have a slash command working through slack and a good idea of how I would improve my code to do what I wanted it to do. Slack webhooks through RapidAPI can be found at https://rapidapi.com/package/Slack

## Email 
Email isn't one that I actually use terribly often, but I figured it might be useful for someone to have and the goal of this project was to use a bunch of different APIs to familiarize myself with the RapidAPI platform. https://rapidapi.com/package/AmazonSES/functions/sendEmail

## Text
I had heard and used Twilio in the past so it was a logical SMS API to use in my platform. I did some digging and it was pretty straight forward what I wanted to do, but RapidAPI didn't have "receiveSms" as part of their endpoints so I was going to have to get creative with my solution

## TODO:

### General
- [x] Implement better data storage solution (i.e. not text file)
- [x] Make a front end for the todo list
- [ ] Combine the website and the slack slash commands
- [ ] Use Socket.IO to auto update the website
### Slack
- [x] create slash command and link to a team
- [x] Receive message and store in data storage system(note.txt)
- [x] Finish response implementation
- [x] Implement completion of TODO items
- [ ] Implement deletion of TODO items
- [ ] Change what the slash command is. I'd like it to be like /todo and /done
### Email
- [ ] Everything
### SMS
- [ ] Receiving a message
- [ ] Storing a received message in to todo list
- [ ] Sending message WITH data from note/todo list


Learned about env variables from: https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f