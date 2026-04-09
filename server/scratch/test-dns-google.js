const dns = require('dns');

// Set DNS servers to Google's
dns.setServers(['8.8.8.8', '8.8.4.4']);

dns.resolveSrv('_mongodb._tcp.yogesh.vczqb7r.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS resolveSrv (with Google DNS) error:', err);
  } else {
    console.log('DNS resolveSrv (with Google DNS) addresses:', addresses);
  }
});
