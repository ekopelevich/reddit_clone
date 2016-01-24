document.addEventListener('DOMContentLoaded', function(event) {
  console.log('sanity check');

  var earthPornRequest = new XMLHttpRequest();

  earthPornRequest.onreadystatechange = function() {
    var parsedJSON;
    var earthPornListings;

    if (this.readyState === 4 && this.status === 200){
      parsedJSON = JSON.parse(this.responseText);
      console.log(parsedJSON);
    }

    for (var i = 0; i < parsedJSON.data.children.length; i++) {
      earthPornListings = parsedJSON.data.children[i];
      console.log(earthPornListings.data.title, earthPornListings.data.thumbnail);
    }
  };

  earthPornRequest.open('GET','https://www.reddit.com/r/EarthPorn.json');

  earthPornRequest.send();
});
