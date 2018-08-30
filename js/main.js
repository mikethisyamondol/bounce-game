//--------------------------Interstitial Overlay----------------------------------->
(function( $ ){

  var methods = {
     open : function( options ) {
     
       var defaults = {
         'url'         			: '../popup.html',
         'width' 				: 600,
         'height'				: 400,
         'opacity'				: 70,
         'id'					: 'popupBlock',
         'onInterstitialClose' 	: function(){}
    	};

        var settings = $.extend({}, defaults, options);

		//Fade in Background
		$('body').append('<div id="fade"></div>');
		$('#fade').css({'filter' : 'alpha(opacity=' + settings.opacity + ')'}).fadeIn();

		//Fade in the Popup
		$('body').append('<div id="' + settings.id + '"></div>');
		$('#' + settings.id).load(settings.url, function() {
			$('#' + settings.id).css({'width' : Number(settings.width), 'height' : Number(settings.height)}).fadeIn();
		});

		//Define margin for center alignment (vertical + horizontal)
		var popMargTop = settings.height / 2;
		var popMargLeft = settings.width / 2;

		//Apply Margin to Popup
		$('#' + settings.id).css({
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});

		//On click of the fade, close the popup and fade
		$('#fade').live('click', function() {
	  	  $().interstitial('close', settings);
		});

     },

     // Function: Close the interstitial
     close : function( options ) {

       var defaults = {
         'id'					: 'popupBlock',
         'onInterstitialClose' 	: function(){}
    	};

       var settings = $.extend({}, defaults, options);

		$('#fade , #' + settings.id).fadeOut(function() {
			$('#fade').remove();
		});

		// onInterstitialClose callback
    	settings.onInterstitialClose.call(this);

 	 }
  };

  $.fn.interstitial = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.interstitial' );
    }

  };

})( jQuery );

//------------------------------------Interstitial Overlay V2----------------------------->




//------------------------------------Animate------------------------------------------>

var frequency = Math.floor(Math.random() * (4000 - 1000)) + 1000;
var speed = Math.floor(Math.random() * (4000 - 2500)) + 2500;

$('#container').on('click', function(){
	$('#ball').animate({
		top: 275+'px'
	},950 , function(){
		$(this).animate({
			top: 423+'px'
		}, 900)
	})
});


setInterval( function() {  //sets interval to animate
	$('#square').animate({
		left: 602+'px'
	},speed , function(){
		$('#square').animate({
		left: -80+'px'
		}, speed)
	})
	return speed = Math.floor(Math.random() * (3000 - 2500)) + 2500;
	return frequency = Math.floor(Math.random() * (4000 - 1000)) + 1000;
}, frequency);


//-----------------------------------V1 Collision Detection---------------------------------------------->


function getPositions(box) {
  var $box = $(box);
  var pos = $box.position();
  var width = $box.width();
  var height = $box.height();
  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
  console.log(pos);
}

function comparePositions(p1, p2) {
  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;

}


function checkCollisions(){
  var box = $('#square')[0];
  var baller = $('#ball');
  var pos = getPositions(box);
  var pos2 = getPositions(baller);
  // console.log(pos2);

  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);
  var match = horizontalMatch && verticalMatch;
	if (match){
		$('#square').stop();
		$('#end').attr('class', 'youLose');
		$('#refresh').attr('class', 'youLose');
		return;
	} else {

	}

}
setInterval( function() {
	checkCollisions();
},10)


//-----------------------------------V2 Collision Detection--------------------------------------->

// function collision(){
// 	var x1 = $('#ball').offset().left;
// 	var y1 = $('#ball').offset().top;
// 	var h1 = $('#ball').outerHeight(true);
// 	var w1 = $('#ball').outerWidth(true);
// 	var b1 = y1 + h1;
// 	var r1 = x1 + w1;
// 	var x2 = $('#square').offset().left;
// 	var y2 = $('#square').offset().top;
// 	var h2 = $('#square').outerHeight(true);
// 	var w2 = $('#square').outerWidth(true);
// 	var b2 = y2 + h2;
// 	var r2 = x2 + w2;

// 	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
// 		// console.log('Working!');
// 	}
// 	else{
// 		// console.log('hit');
// 		$('#square').stop();
// 		$('#end').attr('class', 'youLose');
// 		$('#refresh').attr('class', 'youLose');
// 		return;

// 	};
// }

// setInterval( function() {
// 	collision();
// },10)

//--------------------------------Crafty------------------------------------------------>
