import app from './server/index.js';

const port = process.env.PORT || 3000;
const host = process.env.HOST !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});