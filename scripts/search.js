// JavaScript source code
var apiKey = "AIzaSyBWm04EA4EM0H2_Q24OAgFku9SyHYn5kEg";
var defaultCount = 10;

function doSearch() {
	var author = "";
	var title = "";
	var maxCount = 0;
	var url = "https://www.googleapis.com/books/v1/volumes?q=";
	var urlAuthor = "";
	var urlTitle = "";
	var urlSearch = "";

	// get search option from user
	if (document.getElementById("authorId").value != "")
		author = document.getElementById("authorId").value;
	if (document.getElementById("titleId").value != "")
		title = document.getElementById("titleId").value;

	// Check total number of results to display
	if (document.getElementById("quotaId").value > 40)
		maxCount = 40;
	else
		if (document.getElementById("quotaId").value != "")
			maxCount = document.getElementById("quotaId").value;

	if (document.getElementById("quotaId").value == "")
		maxCount = defaultCount;


	if (author != "") {
		// Create correct URL
		urlAuthor = url + "inauthor:" + author + "&maxResults=" + maxCount + "&key=" + apiKey;
		urlSearch = urlAuthor;
	}

	if (title != "") {
		// Create correct URL
		urlTitle = url + "intitle:" + title + "&maxResults=" + maxCount + "&key=" + apiKey;
		urlSearch = urlTitle;
	}

	// do book search from Google Book API
	$.getJSON(urlSearch, function (data, status) {
		if (status == 'success') {
			var input = "";
			var result = [];
			var total = data.items.length;		

			for (var i = 0; i < total; i++) {
				var val = data.items[i];
				var index = i + 1;
				result.push({
					"ID": index,
					"Book": {
						"Title": val.volumeInfo.title,
						"Author": val.volumeInfo.authors,
						"PublishedDate": val.volumeInfo.publishedDate
					}
				});				
				input += formatTable(index,val);
			}
			console.log(input);
			

			document.getElementById("tbdata").innerHTML = input;
		}
		else document.getElementById("tbdata").innerHTML = '<tr><td>Cannot find anything</td></tr>';
	});

	//	reset value after searched
	author = "";
	title = "";
}

// Adjusting textarea
function autoGrow(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight) + "px";
}


function formatTable(index, value) {
	return '<tr><td>' + index + '</td><td>' + value.volumeInfo.title + '</td><td>' + value.volumeInfo.authors + '</td><td>' + value.volumeInfo.publishedDate + '</td></tr>';
}

// sorting table by clicking header
function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("resultId");
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching)
	{
		//start by saying: no switching is done:
		switching = false;
		rows = table.getElementsByTagName("TR");

		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1) ; i++)
		{
			//start by saying there should be no switching:
			shouldSwitch = false;

			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];

			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}