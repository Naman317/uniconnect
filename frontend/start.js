const concurrently = require('concurrently');

const frontend = 'cd frontend && node server.js';
const backend = 'cd backend && npm start';

concurrently(frontend, backend, {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3
});