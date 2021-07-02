For the MacOSicons Discord server.

# Building yourself

Requirements:
1. A computer.
2. A brain.
3. Node.js(lts works fine)
4. A terminal

Clone this repository into your own.

```zsh
git clone https://github.com/insomnia-creator/Siri.git
```
Run `npm i` to install the modules.


And run ``npm start`` to start the bot.

# Using redis as a database.

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

You'll get a response saying OK. This means that now it's making backups in the background.

So just in case your power goes out or something happens(my dog ate my server).
This will create a backup just in case, so you can resume good.

You can go on with your day by running ``npm start``
