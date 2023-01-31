$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function (tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, {
            logLevel: 'info'
        });

        // create the stream object
        syncClient.stream('messageData').then(function (stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function (event) {
                console.log('syncStream:', event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    // Write the code here
    function syncDrawingData(data) {
        document.getElementById("text_area").value = data.textarea_value
        if (data.text_area_colour == "white") {
            document.getElementById("text_area").style.backgroundColor = "white"
        }
        if (data.text_area_colour == "red") {
            document.getElementById("text_area").style.backgroundColor = "red"
        }
        if (data.text_area_colour == "yellow") {
            document.getElementById("text_area").style.backgroundColor = "yellow"
        }
        if (data.text_area_colour == "green") {
            document.getElementById("text_area").style.backgroundColor = "green"
        }



    }


    function messageSync() {
        text = document.getElementById("text_area").value;


        setTimeout(function () {
                SettingSyncData()
            },
            1700);

    }
    // Write the code here
    function SettingSyncData() {
        syncStream.publishMessage({
            text_area_colour: background_color,
            textarea_value: text
        });
    }
    // Write the code here
    function select_color() {

        sc = document.getElementById("select").value
        if (sc == "white") {
            background_color = "white"
        }
        if (sc == "red") {
            background_color = "red"
        }
        if (sc == "yellow") {
            background_color = "yellow"
        }
        if (sc == "green") {
            background_color = "green"
        }
















    }
    // Write the code here
    text_area.addEventListener("keyup", messageSync)
    select_element.addEventListener("change", select_color)


});