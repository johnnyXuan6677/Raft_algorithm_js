var skiff = require('./skiff.js');
var options = {
   db: require('memdown'), // in memory database
  peers: [ // peer addresses
    '/ip4/127.0.0.1/tcp/9490',
    '/ip4/127.0.0.1/tcp/9491',
    '/ip4/127.0.0.1/tcp/9492',
    '/ip4/127.0.0.1/tcp/9493',
    '/ip4/127.0.0.1/tcp/9494'

  ],
}


var Skiff = skiff('/ip4/127.0.0.1/tcp/9492',options
);


const db = Skiff.levelup()
Skiff.start(err => {
  if (err) {
    console.error('Error starting skiff node: ', err.message)
  } else {
    console.log('Skiff node started')

    db.put('key', 'value', (err) => {
      // ...
    })
  }
})

// '/ip4/0.0.0.0/tcp/9163'
Skiff.join('/ip4/127.0.0.1/tcp/9492',(callback) => {console.log("join started   "+callback)})
Skiff.stats((callback) => {console.log("status!!:   "+callback)})

// Skiff.leveldown((err)=> console.log("hello!!  "+ err))
Skiff.readConsensus((err)=> console.log(err))
Skiff.stats((err)=> console.log(err))



Skiff.on('started', (err) => {
  if (err){
    console.log(' some thing wrong'+err.message)
}else{
  console.log("the node is started ")
  console.log("====================================")
}})
Skiff.on('new state',(state) => console.log("I am "+state+' now'))
// Skiff.on('rpc latency',(rpc)=> console.log("RPC latency   "+rpc))
Skiff.on('warning',(err)=> console.log("non fatal error:  "+ err))