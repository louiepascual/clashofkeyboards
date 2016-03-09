/*

[Clash of Keyboards]
Main Game Program

Author: Pascual, Louie Lester E.
*/

$(document).ready(function() {
	
	// INITIATE CORRECT WORDS ARRAY
	var spans = document.getElementById('storybox').getElementsByTagName('span');
	var correctWords = new Array();
	for(var i = 0; i < spans.length; i++) {
    	correctWords.push(spans[i].innerHTML);
	}

	var time;
	var intervalID;

	var grossWPM;
	var netWPM;
	var timeElapsed;

	var errors = 0;
	var wrongWordsCount = 0;
	// Timer
	$(".type-area").click(function() {
		time = 60;
		timeElapsed = 0;
		intervalID = setInterval(changeTime,1000);

		function changeTime() {
			time--;
			$('#time').text(time);
			
			if(time <= 0) {
				clearInterval(intervalID);
				$('.type-area').attr('disabled','disabled');
				
				netWPM = grossWPM - wrongWordsCount;
				$('#netWPM').text(netWPM);
			}

			timeElapsed++;			
			grossWPM = ((index+1)/5)/(timeElapsed/60);
			grossWPM = grossWPM.toFixed(2);
			$('#grossWPM').text(grossWPM);
			
		}
	});

	// Checker
	var index = 0;
	var tappedSpace = false;
	var ind = 0;
	var userWords = new Array();
	var pastChar;
	var valueOfSpace;
	$("#storybox span:nth-child(1)").addClass("current");
	var offsetValue = $("#storybox span:nth-child(1)").position().top;

	// Some Existing Problems:
	// 1. Keypress of backspace pretty much destroys the program
	// 2. [SOLVED] Existence of " ' " prevents words from finishing 

	// checks and adjust stuff
	var pastOffset;
	var n =1;
	$(".type-area").keyup(function(e) {
		var keycode = e.keyCode;

		// Check if keycode is a letter,number,comma,dash,period
		if((keycode >= 48 && keycode <= 90) || (keycode >= 188 && keycode <= 190 || keycode == 222)) {
			if(typeof userWords[ind] == 'undefined' || userWords[ind] == ' ') {
				userWords[ind] = "";
			}

			pastChar = $(".type-area").val().substr(index,1);
			//console.log($(".type-area").val().substr(index,1));

			userWords[ind] = userWords[ind] + $(".type-area").val().substr(index,1);
			console.log(userWords[ind] + " ; " + correctWords[ind]);
			
			index++;
			$('.test').text(index);
			tappedSpace = false;
		}

		// Check for backspaces
		if(keycode == 8) {
			
			if(index > 0) {
				index--;
				$('.test').text(index);	

				var erasedChar = pastChar;
				pastChar = $(".type-area").val().substr(index-1,1);
				//console.log("backspaced: " + erasedChar);
				//console.log(erasedChar + " :: " + pastChar);
				//console.log(valueOfSpace.charCodeAt());

				if(erasedChar == valueOfSpace) {
					var nchild = "#storybox span:nth-child("+(ind+1)+")";
					userWords[ind] = "";
					$(nchild).removeClass("current");
					$(nchild).addClass("normal");


					ind--;
					nchild = "#storybox span:nth-child("+(ind+1)+")";
					
					if($(nchild).hasClass("wrong")) {
						wrongWordsCount--;
						$('#wrongWords').text(wrongWordsCount);
					}

					$(nchild).removeClass("correct wrong");
					$(nchild).addClass("current");

					tappedSpace = false;
				}
				else {
					console.log(ind);
					var len = userWords[ind].length;
					userWords[ind] = userWords[ind].substring(0,len-1);
					tappedSpace = false;
					
				}
				console.log(userWords[ind] + " ; " + correctWords[ind]);
			}
			//console.log(userWords[ind]);
						
		}

		// delimiter
		if(keycode == 32) {
			if(tappedSpace) {
				var str = $('.type-area').val();
				$('.type-area').val(str.substring(0, str.length - 1));
				console.log("IT WENT IN");
				return false;
			}
			else {
				
				index++;
				$('.test').text(index);

				pastChar = $(".type-area").val().substr(index-1,1);
				valueOfSpace = pastChar;
				console.log(' ');
				console.log(userWords[ind] + " ; " + correctWords[ind]);

				var nchild = "#storybox span:nth-child("+(ind+1)+")";
				if(userWords[ind] === correctWords[ind]) {
					console.log(nchild);
					$(nchild).removeClass("current normal wrong");
					$(nchild).addClass("correct");
				}
				else {
					wrongWordsCount++;
					console.log(nchild);
					$(nchild).removeClass("current correct normal");
					$(nchild).addClass("wrong");
					$('#wrongWords').text(wrongWordsCount);
				}

				ind++;
				nchild = "#storybox span:nth-child("+(ind+1)+")";
				$(nchild).removeClass("wrong correct normal");
				$(nchild).addClass("current");
				
				// adjusts the screen depending on input
				var tempOffset = $(nchild).position().top;
				console.log("SCROLLTOP: " + tempOffset);
				if(tempOffset >= 228) {
					$("#storybox").scrollTop(tempOffset*n);
					n++;
					offsetValue = tempOffset;
				}
				
				tappedSpace = true;
			}
		}


	});

	$('.type-area').keypress(function(e) {
		var keycode = e.keycode;

		if(keycode == 8) {
			
			if(index > 0) {
				index--;
				$('.test').text(index);	

				var erasedChar = pastChar;
				pastChar = $(".type-area").val().substr(index-1,1);
				//console.log("backspaced: " + erasedChar);
				//console.log(erasedChar + " :: " + pastChar);
				//console.log(valueOfSpace.charCodeAt());

				if(erasedChar == valueOfSpace) {
					var nchild = "#storybox span:nth-child("+(ind+1)+")";
					userWords[ind] = "";
					$(nchild).removeClass("current");
					$(nchild).addClass("normal");


					ind--;
					nchild = "#storybox span:nth-child("+(ind+1)+")";
					
					if($(nchild).hasClass("wrong")) {
						wrongWordsCount--;
						$('#wrongWords').text(wrongWordsCount);
					}

					$(nchild).removeClass("correct wrong");
					$(nchild).addClass("current");

					tappedSpace = false;
				}
				else {
					console.log(ind);
					var len = userWords[ind].length;
					userWords[ind] = userWords[ind].substring(0,len-1);
					tappedSpace = false;
					
				}
				console.log(userWords[ind] + " ; " + correctWords[ind]);
			}
		}
	})

	
});