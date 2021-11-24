**Multiplayer UNO game with Node.js and Vue**

![Screenshot](https://raw.githubusercontent.com/houseofbits/nodejs-uno-game/master/dev-screen.png)

[Check out YouTube video](https://www.youtube.com/watch?v=HPbMh1QAxb4)

**Set up development environment**
1) Install docker, docker-compose, Node.js/npm
2) Clone repo

3) Build Vue client 
``` 
npm install
npm run build
```
4) Run Node server on localhost:80 (might need to change some config to allow it to run on port 80, or change used port to 3000 in server.js)
``` 
node server.js
``` 
5) Or, to run dockerised Node.js app accessible in your local network
``` 
docker-compose up
```
**Used libraries/frameworks**
- Node.js
- Vue.js
- Gsap animation library
- Font Awesome