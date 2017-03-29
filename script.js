$(document).ready(function() {
	
	var downTimer;
	var upTimer;
	var loopCount = 0;
	var secsLeft = 0;
	var sliderPos = $("#slider").position().left;
	var sliderWidth = $("#slider").width();
	var leafRotation = 0;

	var sound = new Howl({
		src:['audio/notification.mp3']
	});

	$("#slider").draggable({
		axis : "x",
		containment: "#timer-top-mid",
		start: function(){
			if(upTimer) {
				clearInterval(upTimer);
				loopCount = 0;
			}
	    downTimer=setInterval(function(){
          sliderPos = $("#slider").position().left;
          secsLeft = (sliderWidth-sliderPos)*(3600/sliderWidth);
	    }, 10); // the above code is executed every 10 ms
		},
		drag: function(){
			updateRotation();
		},
		stop: function(){
			if (downTimer){
	    	clearInterval(downTimer);

	    	sliderPos = $("#slider").position().left;

	    	upTimer = setInterval(function(){
	    		
	    		loopCount %= (3600/sliderWidth);
	    		if(sliderPos < sliderWidth){
	    			// Timer is set
	    			secsLeft = ((sliderWidth-sliderPos)*(3600/sliderWidth))-loopCount;
	    			updateTime(secsLeft);
	    			loopCount++;
	    			
	    			if(loopCount === (3600/sliderWidth)){
	    				//Move timer right
	    				sliderPos++;
	    				var newPos = sliderPos + "px";
	    				$("#slider").css("left", newPos);
	    				updateRotation();
	    			}
	    			
	    		} else {
	    			clearInterval(upTimer);
	    			loopCount = 0;
	    			updateTime(0);
	    			sound.play();
	    		}
	    	}, 1000); //every 1s
	    }
		} //end of stop

	}); //end of draggable

	function updateTime(s) {

		var mins = ("0" + Number(Math.floor(s/60))).slice(-2);
	  var secs = ("0" + Number(s%60)).slice(-2); 

	  var formattedTime = mins+":"+secs;
	  console.log(formattedTime);
		$("#time-display p").text(formattedTime);

	}

	function updateRotation(){

		leafRotation = 360 - sliderPos;
		var newRotation = "rotateZ("+leafRotation+"deg)"
	  $("#leaves-img").css("transform", newRotation);

	}

}); //end of $(document).ready();