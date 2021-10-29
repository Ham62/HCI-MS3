
function createID() {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function createBubble() {
	// Main content container on the webpage
	var docContent = document.getElementById("content");

	// Create a new bubble object
	var bubble = document.createElement("DIV");
	bubble.setAttribute("id", "bubble");

	// Create content div to insert into bubble object
	var bubContent = document.createElement("DIV");
	bubContent.setAttribute("class", "content");

	bubContent.innerHTML = "<center>Test</center>";


	// Append content to bubble
	bubble.appendChild(bubContent);

	// Append bubble to document container
	docContent.appendChild(bubble);
}


