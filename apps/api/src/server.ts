import express from 'express';

const app = express();
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.json({ message: 'BeeStorage API is alive! 🐝' });
});

app.listen(port, () => {
  console.log('server up on', port)
});
