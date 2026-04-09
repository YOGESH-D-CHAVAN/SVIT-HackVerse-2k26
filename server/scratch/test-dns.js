const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.yogesh.vczqb7r.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS resolveSrv error:', err);
  } else {
    console.log('DNS resolveSrv addresses:', addresses);
  }
});
