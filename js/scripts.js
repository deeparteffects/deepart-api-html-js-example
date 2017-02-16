var imageBinary;
var styles;
var resultCheck;
var submissionId;

var deepArtEffectsClient = apigClientFactory.newClient({
	apiKey: '--INSERT YOUR API KEY--',
	accessKey: '--INSERT YOUR ACCESS KEY--',
    secretKey: '--INSERT YOUR SECRET KEY--',
});

$(document).ready(function(){
	$("#result").hide();
	$("#progress-wrapper").hide();
	deepArtEffectsClient.stylesGet()
    .then(function(result){
    	console.log("Successfully loaded styles");
        //This is where you would put a success callback
        var ol = $('<ol id="selectable">');
        ol.appendTo('#style-list')
		styles = result.data;
        for (var i = 0, len = styles.length; i < len; i++) {	
  			var li = $("<li>");
  			li.attr('onClick',"uploadImage("+styles[i].id+")")
  			var div = $('<div class="style">');
			div.attr('style', "background-image: url("+styles[i].url+")");
			li.append(div);
			li.appendTo('#selectable');
		}
    }).catch(function(result){
        //This is where you would put an error callback
        console.log("Error loading styles");
    });
}) 
function uploadImage(styleId) {
	if(imageBinary==null) {
		alert('Please choose a picture first')
		return;
	}

	$("#styles").hide();
	$("#progress-wrapper").show();
	var params = {
    	styleId: styleId,
	};
	deepArtEffectsClient.uploadPost(params, imageBinary)
	.then(function(result) {
		console.log("Successfully uploaded image");
		submissionId = result.data.submissionId
		resultCheck = setInterval(imageReadyCheck, 2500);
	}).catch(function(result){
        //This is where you would put an error callback
        console.log("Error uploading image");
    });
}
function imageReadyCheck() {
	var params = {
    	submissionId: submissionId,
	};
	deepArtEffectsClient.resultGet(params)
	.then(function(result) {
		console.log("Successfully status check");
		if(result.data.status=="finished") {
			var img = $('<img class="result-image">');
			img.attr('src', result.data.url);
			img.appendTo('#artwork');
			clearInterval(resultCheck);
			$("#result").show();
			$("#styles").show();
			$("#progress-wrapper").hide();
		}
	}).catch(function(result){
        console.log("Error checking status");
    });
}
function onFileSelected(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            imageBinary = btoa(readerEvt.target.result);
        };

        reader.readAsBinaryString(file);
    }
}