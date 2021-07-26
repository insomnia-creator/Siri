
For the MacOSicons Discord server.

# Major Release 1.5
Hello world, it is I, the only collaborator of this Program. I have come with news to please you.

---
MAJOR RELEASE BABY! Now you can enjoy the *not perfect* filters and ranking system!
Also, I need to add a user info command. I'll do that later ok? Anyways, tons of work put into this(by tons of work I mean like 3 hours. Coding is easy, playing bedwars for 9 hours per week is not.)


A quick note, why I am not adding an invitation filter.

1. It's god-damn hard to code it, like takes a billion years and tons of regex magic(which I lack btw)
2. And, I don't what servers you are going to advertise but that is a job I am reserving for next release OK?

# Building yourself

Requirements:
1. A computer.
2. A brain.
3. Node.js(lts works fine, I'm using latest version)
4. A terminal

Clone this repository into your own.

```zsh
git clone https://github.com/insomnia-creator/Siri.git
```
Run `npm i` to install the modules.


And run ``npm start`` to start the bot.

# Using redis as a database.

If you are using Windows(trash) you are not in luck!!!!!!!! because windows is trash, and I can't be bothered finding a solution or something. 

This project uses redis as a database, locally. Not as clumsy as JSON but good enough.

Setting up your own database in redis.

Homebrew

```zsh
brew install redis
```
This installs Redis.

To start redis run:
```zsh
brew services start redis
```

This will start redis.

```zsh
redis-cli
```
This will open the redis cli.

127.0.0.1:6379>

You'll get something like this.

This is cool.
Now in the Redis-CLI run these 2 commands:

``SAVE`` and ``BG SAVE``.

<img width="274" alt="Screenshot 2021-07-02 at 10 10 22 AM" src="https://user-images.githubusercontent.com/69950985/124221601-b741a800-db1d-11eb-923f-3a015d1ba369.png">

You'll get a response saying OK. This means that now it's making backups in the background.

So just in case your power goes out or something happens(my dog ate my server).
This will create a backup just in case, so you can resume good.

You can go on with your day by running ``npm start``

dude pixel read this pls. you need to ok?
