# Clipshare
A lightweight clip sharing service written in Svelte and using Pocketbase. Clipshare does not have many features, as it is more of a proof-of-concept, but it still meets its intended target goal.

### Why?
I needed a self-hostable service that could easily upload and share clips with my friends, and other services weren't doing it for me, so I decided that it would be a learning experience, and started working on Clipshare.

### Features:
- Uploading Videos
- Deleting Videos
- Creating an Account
- Video Descriptions

### Tech Stack:
- Svelte Kit
- Pocketbase
- Bootstrap CSS

### Roadmap
- [ ] Saving videos
- [ ] Comments
- [ ] Thumbnail Generation 
  
### Installation:
1. Run `npm i` to install dependencies
2. Place a Pocketbase executable file in `bin`
3. Serve Pocketbase
4. Open `src/lib/config.js`
5. Change `POCKETBASE_URL` to the URL that your Pocketbase is being hosted on
6. Run `npm run build`
7. Serve `build/index.js` using `node index.js`, `pm2 start index.js`, `nodemon index.js`, etc
