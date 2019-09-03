// basic functionalities

// // advance functionalities
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
//   // Once a connection has been made, make a subscription and send a message.
//   console.log("onConnect");
//   client.subscribe("World");
  
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

// basic functionalities

$('#btn-connect').click(function(){
	client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
	client.subscribe($("#topic").val());

	console.log('connect button clicked');
	$("#status").text("Connecting");
	client.on("connect", function(){
		$("#status").text("Successfully connected");
		console.log("success");
	});

	$("#btn-disconnect").click(function() {
		Swal.fire({
			title: 'Are you sure?',
			showCancelButton: true,
			confirmButtonText: 'Yes, disconnect!'
		  }).then((result) => {
			if (result.value) {
				client.end();
			  alert("You're disconnected succesfully");
			  $("#status").text("Successfully Disconnected");
			}
		  })
		
	});

	$("#btn-publish").click(function() {
		var topic = $("#topic").val();
		var payload = $("#message").val();
		if (topic == "" && payload == "") {
			// pag wala ka ka connect then mu publish ka, mu error siya
			alert("Oops Error!");
		}
		else { 
			client.publish(topic,payload, function(err) {
				  if (err){
					alert("Oops Error!");
				} else {
					console.log("published")
					alert("Published successfully!")
					var row = $("<tr>");
					$("<td>").text(topic).appendTo($(row));
					$("<td>").text(payload).appendTo($(row));
					$("#tbl-body-pub").append($(row));
				}
			});
		}

	});
	$("#btn-subscribe").click(function() {
		var topic = $("#topic").val();
		var subscribe = $("#topic-sub").val();
		if (subscribe != topic) {
			alert("Sorry entered topic is not available");
		}
		else if (subscribe == topic && topic !== "") {
			client.subscribe(topic, function(error) {
				if(error) {
					alert("Sorry You are not Connected");
				} 
				else {
					var row = $("<tr>").attr("id", "mysub");
					$("<td>").text(topic).appendTo($(row));
					$("#tbl-body-subscribe").append($(row));
					alert('Subscribed successfully!');
				}
			});
			
		}
			
	})
	$("#btn-unsubscribe").click(function() {
			var topic = $("#topic").val();
			client.unsubscribe(topic, function(error) {
				if(error) {
					// pag naka disconnect naka then mu unsubscribe ka, mo error siya
					alert("Unsubscribe error! You are not connected")
				} else {
					alert("Unsubscribed successfully");
				}
			});
	})
	client.on("message", function (topic, payload) {
		console.log([topic, payload].join(": "));
		var row = $("<tr>");
		$("<td>").text(topic).appendTo($(row));
		$("<td>").text(payload).appendTo($(row));
		$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
		$("#tbl-body").append($(row));

  })
});