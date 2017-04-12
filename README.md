# Deep Art Effects API Example For JavaScript
Here is an example on how you can use the Deep Art Effects API for JavaScript to
display available styles, upload an image and get the result.

If you want to try out the example, change the values for the apiKey, accessKey
and secretKey in `js\scripts.js` to your key values.

<img src="./Screenshot.png" width = "880" height = "630" alt="0" align="center" />

## 1. Add dependencies to your website
```javascript
<script type="text/javascript" src="js/lib/axios/dist/axios.standalone.js"></script>
<script type="text/javascript" src="js/lib/CryptoJS/rollups/hmac-sha256.js"></script>
<script type="text/javascript" src="js/lib/CryptoJS/rollups/sha256.js"></script>
<script type="text/javascript" src="js/lib/CryptoJS/components/hmac.js"></script>
<script type="text/javascript" src="js/lib/CryptoJS/components/enc-base64.js"></script>
<script type="text/javascript" src="js/lib/url-template/url-template.js"></script>
<script type="text/javascript" src="js/lib/apiGatewayCore/sigV4Client.js"></script>
<script type="text/javascript" src="js/lib/apiGatewayCore/apiGatewayClient.js"></script>
<script type="text/javascript" src="js/lib/apiGatewayCore/simpleHttpClient.js"></script>
<script type="text/javascript" src="js/lib/apiGatewayCore/utils.js"></script>
<script type="text/javascript" src="js/apigClient.js"></script>
```

## 2. Get a client instance
First of all create an Deep Art Effects Client instance and insert your API-Key,
your Access-Key and your Secret-Key.

```javascript
var deepArtEffectsClient = apigClientFactory.newClient({
  apiKey: '--INSERT YOUR API KEY--',
  accessKey: '--INSERT YOUR ACCESS KEY--',
  secretKey: '--INSERT YOUR SECRET KEY--',
});
```

## 3. Get a list of available styles
Next you want get a list of available styles using the stylesGet method. You
get the id and a URL to an image representing the style.

```javascript
deepArtEffectsClient.stylesGet()
.then(function(result){
  console.log("Successfully loaded styles");
  styles = result.data;
  for (var i = 0, length = styles.length; i < length; i++) {
    console.log("StyleId: " + styles[i].id + ", URL: " + styles[i].url);
  }
}).catch(function(result){
  console.log("Error loading styles");
});
```

## 4. Upload an image
To upload an image set the styleId you want and hand over the image binary data
converted to Base64. In JavaScript you can convert data to Base64 using the
btoa() function. After uploading the image you get a submissionId to check for
the result.
```javascript
var params = {
    styleId: styleId,
};
deepArtEffectsClient.uploadPost(params, base64ConvertedImage)
.then(function(result) {
  console.log("Successfully uploaded image");
  console.log("SubmissionId: " + result.data.submissionId
}).catch(function(result){
  console.log("Error uploading image");
});
```

## 5. Check for the result
You can pass the submissionId to the resultGet function in order to receive a
status for your submission. If your submission is in `finished` state, you can
use the URL to download your artwork.
```javascript
var params = {
    submissionId: submissionId,
};
deepArtEffectsClient.resultGet(params)
.then(function(result) {
  console.log("Successfully checked status");
  if(result.data.status=="finished") {
    console.log("URL for artwork: " + result.data.url)
  }
}).catch(function(result){
  console.log("Error checking status");
});
```
