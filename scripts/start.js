// JavaScript source code
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


