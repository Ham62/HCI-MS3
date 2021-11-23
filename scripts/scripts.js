// Entered order objects for the main page
var orderList = [];

function createID() {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function createBubble(innerContent) {
	// Main content container on the webpage
	var docContent = document.getElementById("content");

	// Create a new bubble object
	var bubble = document.createElement("DIV");
	bubble.setAttribute("id", "bubble");

	// Create content div to insert into bubble object
	var bubContent = document.createElement("DIV");
	bubContent.setAttribute("class", "content");

	bubContent.innerHTML = innerContent;


	// Append content to bubble
	bubble.appendChild(bubContent);

	return bubble;
}

function showHome() {
	// Clear document container
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	// Main content container on the webpage
	var docContent = document.getElementById("content");

	// Create "Add order" bubble
	var innerContent =  '<A HREF="javascript:void;" onclick="showAddOrderMenu()">' +
				'<IMG SRC="media/images/addbutton.png">Add Order...</A>';
	var addOrderBtn = createBubble(innerContent);

	docContent.appendChild(addOrderBtn);

	// Append order bubbles to document container
	for (i = 0; i < orderList.length; i++) {
		docContent.appendChild(orderList[i]);
	}	
}

/////////////////////////////////////
//         Add order menu          //
//           functions             //
/////////////////////////////////////

// Show order menu
function showAddOrderMenu() {
	// Clear document container
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	var innerContent = '<FORM ID="newOrderForm">' +
				'<LABEL FOR="mealType">Meal Type:</LABEL><BR>' +
				'<SELECT NAME="mealType" ID="mealType">' +
					'<OPTION VALUE="none">Pick One...</OPTION>' +
					'<OPTION VALUE="Breakfast">Breakfast</OPTION>' +
					'<OPTION VALUE="Lunch">Lunch</OPTION>' +
					'<OPTION VALUE="Dinner">Dinner</OPTION>' +
					'<OPTION VALUE="Snack">Snack/Other</OPTION>' +
				'</SELECT><BR>' +
				'<LABEL FOR="locationSel">Where did you order from?</LABEL><BR>' +
				'<INPUT TYPE="text" ID="locationSel" NAME="locationSel"><BR>' +
				'<LABEL FOR="appSel">Select App</LABEL><BR>' +
				'<SELECT NAME="appSel" ID="locationSel">' +
					'<OPTION VALUE="none">Pick One...</OPTION>' +
					'<OPTION VALUE="Doordash">Doordash</OPTION>' +
					'<OPTION VALUE="Skip">Skip The Dishes</OPTION>' +
					'<OPTION VALUE="UberEats">Uber Eats</OPTION>' +
					'<OPTION VALUE="Other">Other</OPTION>' +
				'</SELECT><BR>' +
				'<LABEL FOR="orderName">What did you order?</LABEL><BR>' +
				'<INPUT TYPE="text" ID="orderName" NAME="orderName"><BR>' +
				'<LABEL FOR="orderCost">Cost: $</LABEL>' +
				'<INPUT TYPE="number" ID="orderCost" NAME="orderCost" min="0" step="0.01" placeholder="0.00"><BR>' +
			'</FORM>' +
			'<BUTTON onclick="submitOrder()">Confirm</BUTTON><BUTTON onclick="resetOrder()">Reset</BUTTON>';


	var addOrderMenu = createBubble(innerContent);
	docContent.appendChild(addOrderMenu);
}

// Create new order bubble and add to list
function addOrderBubble(appSel, locationSel, mealName, mealCost) {
	var innerContent = '<DIV class="orderSource">' + locationSel + '</DIV>' +
				'<DIV class="orderDate">' + new Date().toLocaleDateString() + '</DIV>' +
				'<DIV class="orderName">' + mealName + " - $" + mealCost + '</DIV>' +
				'<DIV class="orderApp">' + appSel + '</DIV>';

	var orderBubble = createBubble(innerContent);
	orderList.unshift(orderBubble);

	// Go to home page (order list)
	showHome();
}

// Reset form
function resetOrder() {
	var form = document.getElementById("newOrderForm");
	var formData = new FormData(document.getElementById("newOrderForm"));

	
}

// Submit new order
function submitOrder() {
	var formData = new FormData(document.getElementById("newOrderForm"));

	var mealType = formData.get("mealType");
	if (mealType == "none") {
		alert("Please select a meal type...");
		return;
	}

	var locationSel = formData.get("locationSel");
	if (locationSel == "") {
		alert("Please enter where you ordered from...");
		return;
	}

	var appSel = formData.get("appSel");
	if (appSel == "none") {
		alert("Please select an order app...");
		return;
	}

	var mealName = formData.get("orderName").trim();
	if (mealName == "") {
		alert("Please enter the meal name...");
		return;
	}

	var mealCost = formData.get("orderCost").trim();
	if (mealCost == "") {
		alert("Please enter the meal cost...");
		return;
	}

	addOrderBubble(mealType, locationSel, mealName, mealCost);
}


