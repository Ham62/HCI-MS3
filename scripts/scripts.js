// Entered order objects for the main page
var orderList = [];

// Which range did we select for the graph?
var selectedRange = "week";

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

function showStats() {
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	var selectRange = '<FORM ID="selectRange">'+
				'<P>Show data for:</P>' + 
				'<INPUT TYPE = "radio" ID="year" name="rangeSel" value="year" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="year">Last Year</LABEL>' +
				'<INPUT TYPE = "radio" ID="month" name="rangeSel" value="month" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="year">Last Month</LABEL>' +
				'<INPUT TYPE = "radio" ID="week" name="rangeSel" value="week" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="year">Last Week</LABEL>' +
				'</FORM>' +
				'<A HREF="">Change Budget Goals</A>';

	var bblSelRange = createBubble(selectRange);
	docContent.appendChild(bblSelRange);

	// Set selected radio
	document.getElementById(selectedRange).checked = true;

	// Show graphs
	genGraphs();
}

// Redraw graphs when selected range changes
function changeRangeSel(newSelection) {
	selectedRange = newSelection.value;
	showStats();
}

function genGraphs() {
	var docContent = document.getElementById("content");

	docContent.appendChild(createBubble('<canvas id="spendingChart"></canvas>'));
	addSpendingGraph();
}

function addSpendingGraph() {
	const canvas = document.getElementById('spendingChart');
	const ctx = canvas.getContext('2d');

	if (selectedRange == "week") {
		const myChart = new Chart(ctx, {
	               type: 'bar',
	                data: {
	                    labels: [
	                    'Monday',
	                    'Tuesday',
	                    'Wednesday',
	                    'Thursday',
	                    'Friday',
	                    'Saturday',
	                    'Sunday'
	                    ],
	                datasets: [{
	                    label: 'Weekly Expenditure ($)',
	                    data: [10, 8, 15, 12, 16, 14, 20],
	                    backgroundColor: [
	                        'rgba(255, 99, 132, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',
	                        'rgba(255, 206, 86, 0.5)',
	                        'rgba(75, 192, 192, 0.5)',
	                        'rgba(153, 102, 255, 0.5)',
	                        'rgba(255, 159, 64, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',                
	                    ],
	                    borderColor:[
	                        'rgba(255, 99, 132, 0.2)',
	                        'rgba(54, 162, 235, 0.2)',
	                        'rgba(255, 206, 86, 0.2)',
	                        'rgba(75, 192, 192, 0.2)',
	                        'rgba(153, 102, 255, 0.2)',
	                        'rgba(255, 159, 64, 0.2)',
	                        'rgba(54, 162, 235, 0.5)',
	                    ],
	                    hoverOffset: 2,
	                    borderWidth: 1.5,
	                }]
	        },
	            options: {
	                scales:{
	                    y: {
	                        beginAtZero: true
	                    }
	                }
	            }
	    });
 
	} else if (selectedRange == "month") {
            const myChart = new Chart(ctx, {
	                type: 'bar',
	                data: {
	                    labels: [
	                    'Week1',
	                    'Week2',
	                    'Week3',
	                    'Week4',
	                    'Week5',
	                    'Week6',
	                    'Week7'
	                    ],
	                datasets: [{
	                    label: 'Monthly Expenditure ($)',
	                    data: [100, 75, 97, 110, 85, 105, 120],
	                    backgroundColor: [
	                        'rgba(255, 99, 132, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',
	                        'rgba(255, 206, 86, 0.5)',
        	                'rgba(75, 192, 192, 0.5)',
	                        'rgba(153, 102, 255, 0.5)',
	                        'rgba(255, 159, 64, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',                
	                    ],
	                    borderColor:[
	                        'rgba(255, 99, 132, 0.2)',
	                        'rgba(54, 162, 235, 0.2)',
	                        'rgba(255, 206, 86, 0.2)',
	                        'rgba(75, 192, 192, 0.2)',
	                        'rgba(153, 102, 255, 0.2)',
	                        'rgba(255, 159, 64, 0.2)',
	                        'rgba(54, 162, 235, 0.5)',
	                    ],
	                    hoverOffset: 2,
	                    borderWidth: 1.5,
	                }]
	        },
	            options: {
	                scales:{
	                    y: {
	                        beginAtZero: true
	                    }
	                }
	            }
	    });  

	} else { // Yearly
            const myChart = new Chart(ctx, {
	                type: 'bar',
	                data: {
	                    labels: [
	                    'January',
	                    'Febrauary',
	                    'March',
	                    'April',
	                    'May',
	                    'June',
	                    'July',
	                    'August',
	                    'September',
	                    'October',
	                    'November',
	                    'December'
	                    ],
	                datasets: [{
	                    label: '',
	                    data: [69, 420, 456, 473, 485, 468, 452, 490, 320, 483, 457, 490],
	                    backgroundColor: [
	                        'rgba(255, 99, 132, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',
	                        'rgba(255, 206, 86, 0.5)',
	                        'rgba(75, 192, 192, 0.5)',
	                        'rgba(153, 102, 255, 0.5)',
	                        'rgba(255, 159, 64, 0.5)',
	                        'rgba(54, 162, 235, 0.5)',                
	                    ],
	                    borderColor:[
	                        'rgba(255, 99, 132, 0.2)',
	                        'rgba(54, 162, 235, 0.2)',
	                        'rgba(255, 206, 86, 0.2)',
	                        'rgba(75, 192, 192, 0.2)',
	                        'rgba(153, 102, 255, 0.2)',
	                        'rgba(255, 159, 64, 0.2)',
	                        'rgba(54, 162, 235, 0.5)',
	                    ],
	                    hoverOffset: 2,
	                    borderWidth: 1.5,
	                }]
	        },
	            options: {
	                scales:{
	                    y: {
	                        beginAtZero: true
	                    }
	                },
	                plugins: {
	                    title: {
                	        display: true,
	                        text: 'Yearly Expenditure ($)'
	                    }
	                }
	            }
	    });
	}
}



function showHome() {
	// Clear document container
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	// Create "Add order" bubble
	var innerContent =  '<A HREF="javascript:void(0);" onclick="showAddOrderMenu()">' +
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


