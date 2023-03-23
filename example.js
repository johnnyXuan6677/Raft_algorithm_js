
var skiff = require('./skiff.js');
var argv = require('argh').argv;
var peerarray = [];
var portnum=argv.portnum;
//port setup    node example --portnum 1000 -->for 1000 port to setup
function peeradd(portnum){
  for(let i = 0; i < portnum;i++){
      peerarray.push('/ip4/127.0.0.1/tcp/'+(1000+i))
  }}
peeradd(portnum);

var options = {
  db: require('memdown'), // in memory database
  peers:peerarray
  // network:skiff.createNetwork(5000)
}
// Skiff library for raft algorithm setup
var Skiff = skiff('/ip4/127.0.0.1/tcp/9490',options)
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

Skiff.term((data)=> console.log(data))
Skiff.stats((err)=> console.log(err))
Skiff.join('/ip4/127.0.0.1/tcp/9490',(callback) => {console.log("join started   "+callback)})

Skiff.on('started', (err) => {
  if (err){
    console.log(' some thing wrong'+err.message)
}else{
  console.log("the node is started !")
  console.log("====================================")
}})
Skiff.on('new state',(state) => console.log("I am "+state+' now'))
Skiff.on('joined',(add)=> console.log("new node join !!       "+add))
Skiff.on('connect',peer =>console.log("connect event:   "+peer))
// Skiff.on('rpc latency',(rpc)=> console.log("RPC latency   "+rpc))

