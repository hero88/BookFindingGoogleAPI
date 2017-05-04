// JavaScript source code
var apiKey = "AIzaSyBWm04EA4EM0H2_Q24OAgFku9SyHYn5kEg"; // Your Google API key
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

	$('#resultId').removeAttr('disabled');

	
	if (author != "")
	{		
		// Create correct URL
		urlAuthor = url + "inauthor:" + author + "&maxResults=" + maxCount + "&key=" + apiKey;
		urlSearch = urlAuthor;
		console.log(urlSearch);
	}		

	if (title != "")
	{		
		// Create correct URL
		urlTitle = url + "intitle:" + title + "&maxResults=" + maxCount + "&key=" + apiKey;
		urlSearch = urlTitle;
		console.log("  adag   " + maxCount + "   abc   "+ urlTitle);
	}

		// do book search from Google Book API
		$.getJSON(urlSearch, function (data, status) {			
			if (status == 'success') {
				document.getElementById("resultId").value = "Found " + maxCount + " results:\n";
				var result = [];
				var total = data.items.length;

				for (var i = 0; i < total; i++) {
					var val = data.items[i];
					result.push({
						"ID": i + 1,
						"Book": {
							"Title": val.volumeInfo.title,
							"Author": val.volumeInfo.authors,
							"PublishedDate": val.volumeInfo.publishedDate
						}
					});
				}

				// Output result to user
				document.getElementById("resultId").value += JSON.stringify(result, undefined, 4);
			}
			else document.getElementById("resultId").value = "Cannot find anything";
		});
	
}

// Adjusting textarea
function autoGrow(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight) + "px";
}


$(document).ready(function () {
	// update search selection by user's selection
	$("select").change(function () {
		$(this).find("option:selected").each(function () {
			var optionValue = $(this).attr("value");
			if (optionValue) {
				$(".choice").not("." + optionValue).hide();
				$("." + optionValue).show();
			} else {
				$(".choice").hide();
			}
		});
	}).change();

	// toggle search button on/off
	$('#button').attr('disabled', 'disabled');
	$('#authorId').keyup(function () {
		if ($(this).val() != '') {
			$('#button').removeAttr('disabled');
		}
		else {
			$('#button').attr('disabled', 'disabled');
		}
	});

	$('#titleId').keyup(function () {
		if ($(this).val() != '') {
			$('#button').removeAttr('disabled');
		}
		else {
			$('#button').attr('disabled', 'disabled');
		}
	});
});
