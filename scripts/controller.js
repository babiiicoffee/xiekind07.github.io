
function onConnect() {
    console.log("Connecting.......");
    client = mqtt.connect(document.getElementById("broker").value);
    console.log(document.getElementById("broker").value)
  
    client.on("connect", function(){
        console.log("You are Succesfully Connected!")
    })
    
  }
  function onSubscribe(){
      var subTopic = document.getElementById("subscribeTopic").value;
      client.subscribe(subTopic);
      console.log(`Topic : ${subTopic}`);
  }

function onPublish(){
    var subTopic = document.getElementById("subscribeTopic").value;
    var pubTopic = document.getElementById("publishTopic").value;
    var pubPayLoad = document.getElementById("publishPayload").value;
    client.publish(pubTopic,pubPayLoad);
    // console.log(pubTopic+pubPayLoad)
    if(subTopic == pubTopic){
        console.log(`Topic: ${pubTopic} \nPayload: ${pubPayLoad}`);
    }else{
        console.log('Sorry! The topic you have enterd is unavailbale.');
    }
}