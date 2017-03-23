//Document ready
$(document).ready(function() {
	//Power button toggles slider and all functionality
	$('#power').click(function() {
		$('#powerSlider').toggleClass('powerSliderOn');
		if ($('#powerSlider').hasClass('powerSliderOn')) {
			$('#display').text('--').fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500);
		} else {
			$('#display').text('');
			$('#strictLight').removeClass('strictOn');
			$('#start').removeClass('start-disabled');
			location.reload(false); //This reloads the page from the cache (keeps anything from carrying over between games)
		}

		//Variables
		var audio, audioTL, audioTR, audioBL, audioBR, buzzer, cpuArr, display, highlight, moveCount, randNum, theQ, playerArr, victory;

		//Toggles the strict light when pressed
		$('#strict').click(function() {
			$('#strictLight').toggleClass('strictOn');
		});

//Variables for and links to sounds - THESE DON'T WORK UNLESS THEY'RE CONVERTED TO URLS
//	audioTL = new Audio('../sounds/simonSound1.ogg');
		audioTL = new Audio('https://static.charmedsatyr.com/sounds/simonSound1.ogg')
//	audioTR = new Audio('../sounds/simonSound2.ogg');
		audioTR = new Audio('https://static.charmedsatyr.com/sounds/simonSound2.ogg');
//	audioBL = new Audio('../sounds/simonSound3.ogg');
		audioBL = new Audio('https://static.charmedsatyr.com/sounds/simonSound3.ogg');
//	audioBR = new Audio('../sounds/simonSound4.ogg');
		audioBR = new Audio('https://static.charmedsatyr.com/sounds/simonSound4.ogg');
//	buzzer = new Audio('../sounds/Buzzer.ogg');
		buzzer = new Audio('https://static.charmedsatyr.com/sounds/Buzzer.ogg');

		//Standard highlight/sound function that takes specific quarter variables
		function fx() {
			$(theQ).addClass(highlight);
			audio.play();
			setTimeout(function() {
				$(theQ).removeClass(highlight);
			}, 300);
		}

		//Top left fx
		function tl() {
			audio = audioTL;
			theQ = '#tl';
			highlight = 'pressedTL';
			fx();
		}
		$('#tl').click(function() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				tl();
			}
		});

		//Top right fx
		function tr() {
			audio = audioTR;
			theQ = '#tr';
			highlight = 'pressedTR';
			fx();
		}
		$('#tr').click(function() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				tr();
			}
		});

		//Bottom left fx
		function bl() {
			audio = audioBL;
			theQ = '#bl';
			highlight = 'pressedBL';
			fx();
		}
		$('#bl').click(function() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				bl();
			}
		});

		//Bottom right fx
		function br() {
			audio = audioBR;
			theQ = '#br';
			highlight = 'pressedBR';
			fx();
		}
		$('#br').click(function() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				br();
			}
		});

		//Common function bank
		//Start sequence
		function start() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				$('#start').addClass('start-disabled');
				cpuArr = [];
				playerArr = [];
				randNum = rando(0, 3);
				cpuArr.push(randNum);
				lightsCameraAction(randNum);
				moveCount = 0;
				display = 0;
				display++;
				$('#display').text(display);
			}
		}

		//Random number generator
		function rando(min, max) {
			return (Math.floor(Math.random() * (max - min + 1)) + min);
		}

		//Rando's link to quarter fx
		function lightsCameraAction(num) {
			switch (num) {
				case 0:
					tl();
					break;
				case 1:
					tr();
					break;
				case 2:
					bl();
					break;
				case 3:
					br();
					break;
			}
		}
		//"Play" an array in sequence. Requires array, starting index, speed of playback. If it weren't recursive, setTimeout (not blocking) wouldn't work properly
		function repeat(arr, index, speed) {
			setTimeout(function() {
				lightsCameraAction(arr[index]);
				index++;
				if (index < arr.length) {
					repeat(arr, index, speed);
				}
			}, speed);
		}

		//Start the game
		$('#start').click(function() {
			if ($('#powerSlider').hasClass('powerSliderOn')) {
				setTimeout(start, 1000);
			}
			/* Play the Game */
			function match() {
				//Victory sequence - upon completing 20 turns
				if (moveCount > 19 && $('#powerSlider').hasClass('powerSliderOn')) {
					setTimeout(function() {
						display = 'WIN';
						$('#display').text(display).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500);
						victory = [2, 3, 1, 0, 1, 0, 2, 3, 1, 3, 2, 3, 2, 3, 1, 0, 1, 0, 2, 3, 1, 3, 2];
						repeat(victory, 0, 300);
						setTimeout(
							function() {
								$('#display').text(display).fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500);
								start();
							}, 11000);
					}, 1000);
					//Regular match sequence
					//When player clicks a button, check if playerArr and cpuArr have the same length. If so, clear playerArr, add a random number to cpuArr, and play cpuArr from beginning to end. The buzzer should have already reset the turn/game if the player pushed the wrong button.
				} else if (playerArr.length !== 0 && playerArr.length === cpuArr.length && $('#powerSlider').hasClass('powerSliderOn')) {
					setTimeout(function() {
						playerArr = [];
						moveCount = 0;
						randNum = rando(0, 3);
						cpuArr.push(randNum);
						display++;
						setTimeout(function() {
							$('#display').text(display);
						}, 800);
						repeat(cpuArr, 0, 800 - (15 * display)); //The game gets a little faster as the player moves up levels
					}, 1000);
				}
			}
			//Fail sequence with strict option
			function fail() {
				if ($('#powerSlider').hasClass('powerSliderOn')) {
					buzzer.play();
					moveCount = 0;
					playerArr = [];
					setTimeout(function() {
						if ($('#strictLight').hasClass('strictOn')) {
							$('#display').text('--').fadeToggle(500).fadeToggle(500).fadeToggle(500).fadeToggle(500);
							setTimeout(start, 3000);
						} else {
							repeat(cpuArr, 0, 800 - (15 * display));
						}
					}, 1000);
				}
			}
			//Mechanics for quarter clicks during gameplay
			$('#tl').click(function() {
				if ($('#powerSlider').hasClass('powerSliderOn')) {
					playerArr.push(0);
					moveCount++;
					if (0 === cpuArr[moveCount - 1]) {
						match();
					} else {
						fail();
					}
				}
			});

			$('#tr').click(function() {
				if ($('#powerSlider').hasClass('powerSliderOn')) {
					playerArr.push(1);
					moveCount++;
					if (1 === cpuArr[moveCount - 1]) {
						match();
					} else {
						fail();
					}
				}
			});

			$('#bl').click(function() {
				if ($('#powerSlider').hasClass('powerSliderOn')) {

					playerArr.push(2);
					moveCount++;
					if (2 === cpuArr[moveCount - 1]) {
						match();
					} else {
						fail();
					}
				}
			});

			$('#br').click(function() {
				if ($('#powerSlider').hasClass('powerSliderOn')) {
					playerArr.push(3);
					moveCount++;
					if (3 === cpuArr[moveCount - 1]) {
						match();
					} else {
						fail();
					}
				}
			});
		});
		//End of Start functionality
	});
	//End of power functionality
});
//End of document ready
