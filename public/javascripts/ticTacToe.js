function gameMode() {
	gameMode = "";
	if($("#gameMode").length > 0) {
		gameMode = $("#gameMode").val();
	}
	return gameMode;
}

function allowClickOnEmptyCells() {
	$(".Clear").click(function() {
		if ($("#message").text().length == 0) {
			disableClicks();
			$(this).removeClass().addClass("O").html("O");
			var cells = $(".ticTacToe").text().replace(/ /g, "");
			var baseUrl = document.location.href.substr(0, document.location.href.lastIndexOf("/"));
			if(baseUrl.endsWith("0")) {
                baseUrl += "/1"
            }
			document.location.href = baseUrl + "/" + gameMode() + cells;
		}
	});
}

function disableClicks() {
	$(".Clear").unbind("click");
}

function determineLevelForNewGame(button) {
  var classes = button.getAttribute("class").split(' ');
  var level = classes.filter(function(className) {
    return (className.startsWith("level"));
  })[0].replace("level", "");
  return level;
}

var level = "1"
$(document).ready(function() {

	// start behavior for playing tic-tac-toe
	$(".X").html("X")
	$(".O").html("O")
	$(".Clear").html("A")

	allowClickOnEmptyCells();

	$(".meFirst").click(function() {
	        level = determineLevelForNewGame(this);
			document.location.href = "/" + level + "/" + gameMode();
	});

	$(".youFirst").click(function() {
	    level = determineLevelForNewGame(this);
		$(".ticTacToe td").removeClass().addClass("Clear").html("A");
		$("#message").text("")
		allowClickOnEmptyCells();
	});

	// start behavior for the aibuilder
	$("#usageWrapper").click(function(){
		$("#usage").slideToggle();
	});

	$("#usage").slideUp();

	$("li span.x").click(function() {
		$("#editRuleAsX").text($(this).siblings(".sampleRule").text());
	});

	$("li span.o").click(function() {
		$("#editRuleAsO").text($(this).siblings(".sampleRule").text());
	});

	$("input#parseRule").click(function() {
		var xRule = $("textarea#editRuleAsX").val();
		var oRule = $("textarea#editRuleAsO").val();
		document.location.href = "/aibuilder/" + encodeURIComponent(xRule) + "/" + encodeURIComponent(oRule);
	});
});