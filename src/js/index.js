'use strict';

//Document ready
$(document).ready(function() {
  //Power button toggles slider and all functionality
  $('#power').click(function() {
    $('#powerSlider').toggleClass('on');
    if ($('#powerSlider').hasClass('on')) {
      $('#display')
        .text('--')
        .fadeToggle(500)
        .fadeToggle(500)
        .fadeToggle(500)
        .fadeToggle(500);
    } else {
      $('#display').text('');
      $('#strictLight').removeClass('on');
      $('#start').removeClass('disabled');
      location.reload(false); //This reloads the page from the cache (keeps anything from carrying over between games)
    }

    //Toggles the strict light when pressed
    $('#strict').click(function() {
      $('#strictLight').toggleClass('on');
    });

    // Variables for and links to sounds - Must be URLs for some reason.
    // var audioTL = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound1.ogg');
    var audioTL = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound1.mp3');
    // var audioTL = new Audio('../sounds/simonSound1.ogg');
    // var audioTL = new Audio('https://static.charmedsatyr.com/sounds/simonSound1.ogg');
    // var audioTR = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound2.ogg');
    var audioTR = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound2.mp3');
    // var audioTR = new Audio('../sounds/simonSound2.ogg');
    // var audioTR = new Audio('https://static.charmedsatyr.com/sounds/simonSound2.ogg');
    // var audioBL = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound3.ogg');
    var audioBL = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound3.mp3');
    // var audioBL = new Audio('../sounds/simonSound3.ogg');
    // var audioBL = new Audio('https://static.charmedsatyr.com/sounds/simonSound3.ogg');
    // var audioBR = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound4.ogg');
    var audioBR = new Audio('https://charmedsatyr.github.io/simon_game/sounds/simonSound4.mp3');
    // var audioBR = new Audio('../sounds/simonSound4.ogg');
    // var audioBR = new Audio('https://static.charmedsatyr.com/sounds/simonSound4.ogg');
    // var buzzer = new Audio('https://charmedsatyr.github.io/simon_game/sounds/Buzzer.ogg');
    var buzzer = new Audio('https://charmedsatyr.github.io/simon_game/sounds/Buzzer.mp3');
    // var buzzer = new Audio('../sounds/Buzzer.ogg');
    // var buzzer = new Audio('https://static.charmedsatyr.com/sounds/Buzzer.ogg');

    //Standard highlight/sound function that takes specific quarter variables
    var theQ, audio;
    function fx() {
      $(theQ).addClass('pressed');
      audio.play();
      setTimeout(function() {
        $(theQ).removeClass('pressed');
      }, 300);
    }

    //Top left fx
    function tl() {
      audio = audioTL;
      theQ = '#tl';
      fx();
    }
    $('#tl').click(function() {
      if ($('#powerSlider').hasClass('on')) {
        tl();
      }
    });

    //Top right fx
    function tr() {
      audio = audioTR;
      theQ = '#tr';
      fx();
    }
    $('#tr').click(function() {
      if ($('#powerSlider').hasClass('on')) {
        tr();
      }
    });

    //Bottom left fx
    function bl() {
      audio = audioBL;
      theQ = '#bl';
      fx();
    }
    $('#bl').click(function() {
      if ($('#powerSlider').hasClass('on')) {
        bl();
      }
    });

    //Bottom right fx
    function br() {
      audio = audioBR;
      theQ = '#br';
      fx();
    }
    $('#br').click(function() {
      if ($('#powerSlider').hasClass('on')) {
        br();
      }
    });

    //Common function bank
    var cpuArr, display, moveCount, playerArr, randNum;
    //Start sequence
    function start() {
      if ($('#powerSlider').hasClass('on')) {
        $('#start').addClass('disabled');
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
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
    //"Play" an array in sequence. Requires array, starting index, speed of
    //playback. If it weren't recursive, setTimeout (not blocking) wouldn't
    //work properly.
    function repeat(arr, index, speed) {
      setTimeout(function() {
        lightsCameraAction(arr[index]);
        index++;
        if (index < arr.length) {
          repeat(arr, index, speed);
        }
        //Quarters are disabled during the match function when it's the
        //computer's turn. Once the computer has finished playing, wait a short
        //time and restore the ability to click on quarters. Prevents confusion.
        if (index === arr.length) {
          setTimeout(function() {
            $('.quarter').removeClass('disabled');
          }, 500);
        }
      }, speed);
    }

    //Start the game
    $('#start').click(function() {
      if ($('#powerSlider').hasClass('on')) {
        setTimeout(start, 1000);
      }
      /* Play the Game */
      function match() {
        //Victory sequence - upon completing 20 turns
        if (moveCount > 19 && $('#powerSlider').hasClass('on')) {
          setTimeout(function() {
            display = 'WIN';
            $('#display')
              .text(display)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500)
              .fadeToggle(500);
            var victory = [2, 3, 1, 0, 1, 0, 2, 3, 1, 3, 2, 3, 2, 3, 1, 0, 1, 0, 2, 3, 1, 3, 2];
            repeat(victory, 0, 300);
            setTimeout(function() {
              $('#display')
                .text(display)
                .fadeToggle(500)
                .fadeToggle(500)
                .fadeToggle(500)
                .fadeToggle(500);
              start();
            }, 11000);
          }, 1000);
          //Regular match sequence
          //When player clicks a button, check if playerArr and cpuArr have the same length. If so, clear playerArr, add a random number to cpuArr, and play cpuArr from beginning to end. The buzzer should have already reset the turn/game if the player pushed the wrong button.
        } else if (
          playerArr.length !== 0 &&
          playerArr.length === cpuArr.length &&
          $('#powerSlider').hasClass('on')
        ) {
          //Quarters are disabled during the match function when it's the
          //computer's turn. The 'disabled' class is removed by the repeat() fn
          $('.quarter').addClass('disabled');
          setTimeout(function() {
            playerArr = [];
            moveCount = 0;
            randNum = rando(0, 3);
            cpuArr.push(randNum);
            display++;
            setTimeout(function() {
              $('#display').text(display);
            }, 800);
            repeat(cpuArr, 0, 800 - 15 * display); //The game gets a little faster as the player moves up levels
          }, 1000);
        }
      }
      //Fail sequence with strict option
      function fail() {
        if ($('#powerSlider').hasClass('on')) {
          buzzer.play();
          moveCount = 0;
          playerArr = [];
          setTimeout(function() {
            if ($('#strictLight').hasClass('on')) {
              $('#display')
                .text('--')
                .fadeToggle(500)
                .fadeToggle(500)
                .fadeToggle(500)
                .fadeToggle(500);
              setTimeout(start, 3000);
            } else {
              repeat(cpuArr, 0, 800 - 15 * display);
            }
          }, 1000);
        }
      }
      //Mechanics for quarter clicks during gameplay
      $('#tl').click(function() {
        if ($('#powerSlider').hasClass('on')) {
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
        if ($('#powerSlider').hasClass('on')) {
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
        if ($('#powerSlider').hasClass('on')) {
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
        if ($('#powerSlider').hasClass('on')) {
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
