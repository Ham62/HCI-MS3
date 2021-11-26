// Entered order objects for the main page
var orderList = [];

// Which range did we select for the graph?
var selectedRange = "week";

var budgetGoal = 0;

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

function showSettings() {
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	var setGoal = '<FORM ID="setBudgetGoal">' +
			'<H2>Budget Goals</H2>' +
			'<LABEL FOR="budgetInput">Weekly spending limit: $</LABEL>' +
			'<INPUT ID="budgetInput" NAME="budgetInput" TYPE="number" min="0" step="0.01" placeholder="' + budgetGoal.toFixed(2) + '">' +
			'</FORM>' +
			'<A HREF="javascript:void(0)" onClick="setNewBudget()">Set New Budget</A>';

	docContent.appendChild(createBubble(setGoal));
}

function setNewBudget() {
	var formData = new FormData(document.getElementById("setBudgetGoal"));

	var budgetInput = formData.get("budgetInput");
	if (budgetInput == "") {
		alert("No changes made...");
	} else {
		budgetGoal = parseFloat(budgetInput);
		alert("Changes saved!");
	}

}


function showHome() {
	// Clear document container
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	// Create "Add order" bubble
	var innerContent =  '<DIV class="addOrder">' +
				'<A HREF="javascript:void(0);" onclick="showAddOrderMenu()">' +
				'<IMG SRC="media/images/addbutton.png">Add Order...</A>' +
				'</DIV>';
	var addOrderBtn = createBubble(innerContent);

	docContent.appendChild(addOrderBtn);

	// Append order bubbles to document container
	for (i = 0; i < orderList.length; i++) {
		docContent.appendChild(orderList[i]);
	}

	if (orderList.length == 0) {
		var noOrders = document.createElement("DIV");
		noOrders.setAttribute("style", "text-align: center; font-size: 27pt; color: #D0D0D0; margin-top: 2em;");
		noOrders.innerHTML = "No Orders Yet...";
		docContent.appendChild(noOrders);
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

	var innerContent = '<DIV class="center">' +
			'<FORM ID="newOrderForm">' +
				'<H2>Add Order</H2>' +
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
					'<OPTION VALUE="Skip The Dishes">Skip The Dishes</OPTION>' +
					'<OPTION VALUE="Uber Eats">Uber Eats</OPTION>' +
					'<OPTION VALUE="Other">Other</OPTION>' +
				'</SELECT><BR>' +
				'<LABEL FOR="orderName">What did you order?</LABEL><BR>' +
				'<INPUT TYPE="text" ID="orderName" NAME="orderName"><BR>' +
				'<LABEL FOR="orderCost">Cost: $</LABEL><BR>' +
				'<INPUT TYPE="number" ID="orderCost" NAME="orderCost" min="0" step="0.01" placeholder="0.00"><BR>' +
			'</FORM>' +
			'<BUTTON id="btnConfirm" onclick="submitOrder()">Confirm</BUTTON><BUTTON id="btnCancel" onclick="showHome()">Cancel</BUTTON>' +
			//'<A HREF="javascript:void(0)" class="confirm" onclick="submitOrder()">Confirm</A>' +
			//'<A HREF="javascript:void(0)" class="cancel" onclick="showHome()">Cancel</A>' +
			'</DIV>';


	var addOrderMenu = createBubble(innerContent);
	docContent.appendChild(addOrderMenu);
}

// Create new order bubble and add to list
function addOrderBubble(appSel, locationSel, mealType, mealName, mealCost) {
	var innerContent = 
				'<DIV class="orderSource">' + locationSel + ' - ' + mealType + '</DIV>' +
				'<DIV class="orderType">' + mealType + '</DIV>' +
				'<DIV class="orderDate">' + new Date().toLocaleDateString() + '</DIV><BR>' +
				'<DIV class="orderName">' + mealName + " - $" + mealCost + '</DIV>' +
				'<DIV class="orderApp">' + appSel + '</DIV>';

	var orderBubble = createBubble(innerContent);
	orderList.unshift(orderBubble); // Place at top of array

	// Go to home page (order list)
	showHome();
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

	addOrderBubble(appSel, locationSel, mealType, mealName, mealCost);
}


function showStats() {
	var docContent = document.getElementById("content");
	docContent.innerHTML = "";

	var selectRange = '<FORM ID="selectRange">'+
				'<P>Show data for:</P>' + 
				'<INPUT TYPE = "radio" ID="year" name="rangeSel" value="year" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="year">Last Year</LABEL>' +
				'<INPUT TYPE = "radio" ID="month" name="rangeSel" value="month" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="month">Last Month</LABEL>' +
				'<INPUT TYPE = "radio" ID="week" name="rangeSel" value="week" onClick="changeRangeSel(this)">' +
				'<LABEL FOR="week">Last Week</LABEL>' +
				'</FORM>' +
				'<A HREF="javascript:void(0)" onClick="showSettings()">Change Budget Goals</A>';

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

	// Spending over time bar chart
	docContent.appendChild(createBubble('<canvas id="spendingChart"></canvas>'));
	addSpendingGraph();

	// Budget goal report
	var budgetGoal = createBubble('<div id="spendgoals">'+addBudgetGoalBubble()+'</div>');
	docContent.appendChild(budgetGoal);

	// Order location pie chart
	docContent.appendChild(createBubble('<canvas id="locationChart"></canvas>'));
	addLocationChart();

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
	                    label: '',
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
	                        beginAtZero: true,
		                ticks: {
		                    // Include a dollar sign in the ticks
		                    callback: function(value, index, values) {
		                        return '$' + value;
		                    },
		                }
	                    }
	                },
	                plugins: {
	                    title: {
                	        display: true,
	                        text: 'Weekly Expenditure ($)'
	                    },
				tooltip: {
					callbacks: {
						label: function(context) {
							return ' $' + context.parsed.y;
						}
					}
				}
			}
	            }
	    });
 
	} else if (selectedRange == "month") {
            const myChart = new Chart(ctx, {
	                type: 'bar',
	                data: {
	                    labels: [
	                    'Week 1',
	                    'Week 2',
	                    'Week 3',
	                    'Week 4'
	                    ],
	                datasets: [{
	                    label: '',
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
	                        beginAtZero: true,
		                ticks: {
		                    // Include a dollar sign in the ticks
		                    callback: function(value, index, values) {
		                        return '$' + value;
		                    },
		                }
	                    }
	                },
	                plugins: {
	                    title: {
                	        display: true,
	                        text: 'Monthly Expenditure ($)'
	                    },
				tooltip: {
					callbacks: {
						label: function(context) {
							return ' $' + context.parsed.y;
						}
					}
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
	                        beginAtZero: true,
		                ticks: {
		                    // Include a dollar sign in the ticks
		                    callback: function(value, index, values) {
		                        return '$' + value;
		                    },
		                }
	                    }
	                },
	                plugins: {
	                    title: {
                	        display: true,
	                        text: 'Yearly Expenditure ($)'
	                    },
				tooltip: {
					callbacks: {
						label: function(context) {
							return ' $' + context.parsed.y;
						}
					}
				}
			}
	            }
	    });
	}
}

function addLocationChart() {
	const canvas = document.getElementById('locationChart');
	const ctx = canvas.getContext('2d');

	if (selectedRange == "week") {
		const myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Skip The Dishes', 'Uber Eats', 'Door Dash'],
				datasets: [{
					data: [57, 19, 24],
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCD56'],
					hoverOffset: 4
				}]
			},
		
			options: {
				plugins: {
					title: {
						display:true,
						text:'Where are you ordering from?'
					}
				}
			}
		});
	} else if (selectedRange == "month") {
		const myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Skip The Dishes', 'Uber Eats', 'Door Dash'],
				datasets: [{
					data: [7, 4, 9],
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCD56'],
					hoverOffset: 4
				}]
			},
		
			options: {
				plugins: {
					title: {
						display:true,
						text:'Where are you ordering from?'
					}
				}
			}
		});
	} else { // Yearly
		const myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Skip The Dishes', 'Uber Eats', 'Door Dash'],
				datasets: [{
					data: [69, 52, 30],
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCD56'],
					hoverOffset: 4
				}]
			},
		
			options: {
				plugins: {
					title: {
						display:true,
						text:'Where are you ordering from?'
					}
				}
			}
		});
	}
}

function addBudgetGoalBubble() {
	var congrats, dollar, over, range;
	if (selectedRange == "week") {
		congrats = "Sorry, y";
		dollar = "12";
		over = "over";
		range = "weekly";
	} else if (selectedRange == "month") {
		congrats = "Congrats! Y";
		dollar = "6";
		over = "under";
		range = "monthly";
	} else {
		congrats = "Congrats! Y";
		dollar = "43";
		over = "under";
		range = "yearly";
	}

	return congrats + 'ou spent $' + dollar + ' ' + over + ' your ' + range + ' budget!';
}
