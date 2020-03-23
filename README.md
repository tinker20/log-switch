Set the environment variables as specified in the `.env.example`





```
const logger = require('./log');

logger('info', 'This is an info log.');
logger('warning', 'This is an warning log.');
logger('alert', 'This is an alert log.');
logger('emergency', 'This is an emergency log.');
logger('notice', 'This is an notice log.');
logger('debug', 'This is an debug log.');
logger('error', 'This is an error log.');
logger('critical', 'This is an critical log.');
logger('error', {message: 'Some Error', error: {status: 500}});
```