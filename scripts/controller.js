

// advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })


// // Create a client instance
// // var client = new Paho.Client(location.hostname, Number(location.port), "clientId");
// console.log("This is an excercise for our SD_Elective");
// var client = new Paho.Client("broker.hivemq.com", 8000, "clientId");
// var btnConnect = document.getElementById('btn-connect');
// var btnPublish = document.getElementById('btn-publish');
// var inputPublish = document.getElementById('publishInput').value;

// // set callback handlers
// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// // called when the client connects
// function onConnect() {
//   console.log("Wait Connecting");
//   client = mqtt.connect(document.getElementById("broker").value);
//   console.log(document.getElementById("broker").value)
  
// }

// // called when the client loses its connection
// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost: "+responseObject.errorMessage);
//   }
// }

// // called when a message arrives
// function onMessageArrived(message) {
//   console.log("onMessageArrived:"+message.payloadString);
// }
// btnConnect.addEventListener('click', function(e){
//     e.preventDefault();
//     console.log("Connect button..");
//     // connect the client
//     client.connect({onSuccess:onConnect});
// });

// btnPublish.addEventListener('click',function(e){
//     e.preventDefault();
//     // console.log("publish button");
//     // message = new Paho.Message(" Hello World");
//     // message.destinationName = "World";
//     // client.send(message);
//     console.log(inputPublish);
// });

function onConnect() {
    console.log("Wait Connecting");
    client = mqtt.connect(document.getElementById("broker").value);
    console.log(document.getElementById("broker").value)
  
    client.on("connect", function(){
        console.log("Succesfully Connected")
    })
    
  }

function onPublish(){
    var pubTopic = document.getElementById("publishTopic").value;
    var pubPayLoad = document.getElementById("publishPayload").value;
    client.publish(pubTopic,pubPayLoad);
    // console.log(pubTopic+pubPayLoad)
    console.log(`Topic: ${pubTopic} \nPayload: ${pubPayLoad}`);
}
function onSubscribe(){
    var subTopic = document.getElementById("subscribeTopic").value;
    client.subscribe(subTopic);
    console.log(`Topic : ${subTopic}`);
}