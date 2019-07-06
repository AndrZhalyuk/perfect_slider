$(document).ready(function(){
    let currentCount = 3;/// к-ть прокручених картинок за одну подію  		
   	

    $(window).resize(function(){
    	var widthWind = $(this).width();
    	if (widthWind <= 768) {
    		 $('.main .main-dots').hide(); 
    		 currentCount = 1;
    		
    	}
    	else {
    		$('.main .main-dots').show(); 
    		currentCount = 3;
    		
    	}
    	console.log(widthWind);   
     	console.log(currentCount);	
    });
	
  $(window).resize();

	$('.arrow').on('click', function(){
		var $this = $(this);
			clickNext = $this.hasClass('next'),
			clickPrev = $this.hasClass('prev'),
			slideWrap = $(this).closest('.slider-wrap');  

		if(clickNext){
			next_slide(slideWrap, currentCount);
			activeDots_next();
			return false;
		}
		if(clickPrev){
			prev_slide(slideWrap, currentCount);
			activeDots_prev();
			return false;
		}
	})

	function activeDots_prev() {
		var  activeDot = $('.item-dot.active-dot'),
		     activeindex = $('.item-dot').index(activeDot);

		if(!activeDot.prev().length) {
			activeDot.removeClass('active-dot');
			$('.item-dot').last().addClass('active-dot');

		}
		else {
			$('.dots-container').find('.active-dot').prev().addClass('active-dot').next().removeClass('active-dot');
		}
	}

	function activeDots_next(){
		var  activeDot = $('.item-dot.active-dot'),
		     activeindex = $('.item-dot').index(activeDot);			

		if(!activeDot.next().length) {
			activeDot.removeClass('active-dot');
			$('.item-dot').first().addClass('active-dot');
		}
		else {
			$('.dots-container').find('.active-dot').next().addClass('active-dot').prev().removeClass('active-dot');
		}
	}

	function prev_slide(slideWrap, count){
		var block_width = $(slideWrap).find('.slide').outerWidth();
		$(slideWrap).find(".slider-list").css({"left":"-"+(block_width * count)+"px"});
		$(slideWrap).find(".slider-list .slide:nth-last-child(-n+"+count+")").clone().prependTo($(slideWrap).find(".slider-list"));   
		$(slideWrap).find(".slider-list .slide:nth-last-child(-n+"+count+")").remove();    
		$(slideWrap).find(".slider-list").animate({left: "0px"}, 200);		 			

	}

	function next_slide(slideWrap, count){
		var block_width = $(slideWrap).find('.slide').outerWidth();
		var slideWrapNew = $(this).closest('.slider-wrap');
		$(slideWrap).find(".slider-list").animate({left: "-"+ (block_width * count) +"px"}, 200, function(){
			$(slideWrap).find(".slider-list .slide:lt("+count+")").clone().appendTo($(slideWrap).find(".slider-list")); 
			$(slideWrap).find(".slider-list .slide:lt("+count+")").remove(); 

			$(slideWrap).find(".slider-list").css({"left":"0px"}); 
		}); 
	}
		//розкоментуйте якщо потрібна автоматична прокрутка слайдерів///////////////////
		// $(function() {

		// 	auto_right('.slider-wrap:first');
		// })	

		// Автоматична прокрутка
		function auto_right(slideWrap){
			setInterval(function(){
				if (!$(slideWrap).is('.hover'))
					right_carusel(slideWrap);
			}, 2000)
		}
		// Навели курсор на slideWrap
		$(document).on('mouseenter', '.slider-wrap', function(){$(this).addClass('hover')});
		//Забрали курсор slideWrap
		$(document).on('mouseleave', '.slider-wrap', function(){$(this).removeClass('hover')});


		$('.slider-wrap').swipe({			
			swipeLeft:function(event, direction, distance, duration, fingerCount){
				 var fingerCount = 0;
				 fingerCount++
				 console.log(fingerCount);
					var slideWrap = ('.slider-wrap');  
				 next_slide(slideWrap, currentCount);
				 activeDots_next();
			},
			swipeRight:function(){
				var slideWrap = ('.slider-wrap');  
				 prev_slide(slideWrap, currentCount);
				 activeDots_prev();
			}
			 
		});

	$('.item-dot').on('click', function(e){
		var $this = $(this);
		if ($this.hasClass('active-dot')) {
			return false;
		}
		else{
			let slideWrapNew = $(this).closest('.slider-wrap');

			let activeDot = $('.item-dot.active-dot');
			let activeindex = $('.item-dot').index(activeDot);
			let clickedIndex = $('.item-dot').index($this);
			let count = (clickedIndex - activeindex) * currentCount;

			if (clickedIndex > activeindex) {
				$('.dots-container').find('.active-dot').removeClass('active-dot');
				$this.addClass('active-dot');
				next_slide(slideWrapNew, count);

			} else {
				$('.dots-container').find('.active-dot').removeClass('active-dot');
				$this.addClass('active-dot');
				prev_slide(slideWrapNew, Math.abs(count));
			}
		}
	});


});


