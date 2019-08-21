window.onload = function() {
	let centersidebar = document.querySelector('.centersideba');
	var span = document.querySelector('.action');
	let cslist = document.querySelector('.cs-list');
	let ali = cslist.querySelectorAll('li');




	// 倒计时
	var futertime = new Date("2019/06/10 22:25:35");

	var timer = setInterval(function() {
		var newtime = new Date();
		var futertimes = futertime.getTime();
		var newtimes = newtime.getTime();
		var timed = futertimes - newtimes;
		var alltime = parseInt(timed / 1000);

		var h = parseInt(alltime / 3600 % 24); //小时
		var m = parseInt(alltime / 60 % 60); //分钟
		var s = parseInt(alltime % 60); //秒钟
		h = checktime(h);
		m = checktime(m);
		s = checktime(s);

		let times = document.querySelector('.times');
		let allspan = times.querySelectorAll('span');
		allspan[0].innerHTML = h;
		allspan[1].innerHTML = m;
		allspan[2].innerHTML = s;

		if (times <= 0) {
			clearInterval(timer);
		}

	}, 1000);

	function checktime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}


	//跟随导航
	var beginX = 0;
	for (var i = 0; i < ali.length; i++) {
		var li = ali[i];

		li.onmouseover = function() {
			end = this.offsetLeft;
		}



		li.onmousedown = function() {
			beginX = this.offsetLeft;
		}


		li.onmouseout = function() {
			end = beginX;
		}
	}
	//开始定时器,产生动画效果;
	var begin = 0, //起点位置;
		end = 0; //终点位置
	setInterval(function() {
		begin = begin + (end - begin) * 0.2;
		span.style.left = begin + 'px';
	}, 20);

}

$(document).ready(function() {
	// alert($(".banner-ws").height())
	// alert($(".banner-ws").width());

	$(".corrn-shop").eq(0).show(); //第一个显示商品列表
	$(".bannerbtn>a").each(function(i) {
		$(this).click(function() {
			$(".corrn-shop").eq(i).stop().fadeIn(200).siblings('.corrn-shop').stop().fadeOut(200);
			$(".bannerbtn>a").removeClass('actioned');
			$(this).addClass("actioned");
		})

	})



	$(".bannerleft ul li").hover(function() {

		$(".bannerleft ul li div").eq($(this).index()).show();
	}, function() {
		$(".bannerleft ul li div").hide();
	})
	$(".banner-shop ul li img").css("width", "320px");

	$(".bc-img img").eq(0).show();
	timer();
	// start();

	$(".btns").each(function(i) {
		$(this).mouseover(function() {
			$(this).addClass('nows').siblings('button').removeClass('nows');
			$(".sn-shop>div").eq(i).show().siblings('.sn-shopwrap').hide();
		})
	})

	// 		$(".banner-shop ul li").hover(function(){
	// 			
	// 			$(this).animate({width:320},200).siblings().animate({width:160},200);
	// 		},function(){
	// 			$(this).animate({width:200},200);
	// 		})





})
//点击显示上一张
$(".prev").click(function() {
	i --;
	if (i == -1) {
		i = 7;
	}
	oncolor();
	onclass();
	show();
});

//点击显示下一张
$(".next").click(function() {
	i ++;
	if (i == 8) {
		i = 0;
	}
	oncolor();
	onclass();
	show();
});

//根据i的索引addclass到对应的span;
function onclass() {
	$(".control>span").each(function(e) {
		if (e === i) {
			$(this).addClass('now');
		} else {
			$(this).removeClass('now');
		}
	})
}


//点击span 当前的span加上class 显示对应索引的图片;
$(".control>span").click(function() {
	$(".control>span").removeClass('now');
	$(this).addClass('now');
	$(".bc-img img").eq($(this).attr('index')).stop().fadeIn(200).siblings('img').stop().fadeOut(200);
	i = parseInt($(this).attr('index'));
});




//图片淡入淡出;
function show() {
	$(".bc-img img").eq(i).fadeIn(500).siblings('img').fadeOut(500);

}
//大div背景的颜色也相应的改变;
function oncolor() {

	var arr = ["gainsboro", "deepskyblue", "yellow", "greenyellow", "salmon", "plum", "olivedrab", "purple"];

	$(".banner").css('background-color', arr[i]);

}
//hover显示或隐藏左右按钮	
$(".banner-wrap .bannercenter").hover(function() {
	clearInterval(banner);
	$(".comm").stop().fadeIn(500);

}, function() {
	timer();
	$(".comm").stop().fadeOut(500);
})


//开启定时器,使图片动起来;
var banner = null,
	i = 0;

function timer() {
	banner = setInterval(function() {
		i++;
		if (i == 8) {
			i = 0;
		}
		onclass();
		oncolor();
		show();

	}, 5000);



}
//开启定时器
var t = 0,
	timers = null;

function start() {
	timers = setInterval(function() {
		t++;
		if (t == 3) {
			t = 0;
		}
		Class();
		var le = t * -412;
		$(".banner-ws-img").animate({
			left: le
		}, 500);
	}, 2000)
}

//点得颜色跟着轮播一起动
function Class() {
	$(".controls>span").each(function(c) {
		if (t == c) {
			$(this).addClass('nower');
		} else {
			$(this).removeClass('nower');
		}
	});
}



//点击span显示当前图片和addclass

$(".controls>span").click(function() {
	$(".controls>span").removeClass('nower');
	$(this).addClass('nower');
	var le = $(this).attr('index') * -412;
	$(".banner-ws-img").animate({
		left: le
	});
	i = parseInt($(this).attr('index'));
});

//hover停止或开启定时器;
$(".bannerw").hover(function() {
	$(".prevs").stop().animate({
		left: 5
	}, 200);
	$(".nexts").stop().animate({
		right: 5
	}, 200);
	clearInterval(timers);


}, function() {
	$(".prevs").stop().animate({
		left: -50
	}, 200);
	$(".nexts").stop().animate({
		right: -50
	}, 200);
	start();
});

//next下一张
$(".nexts").click(function() {
	t++;
	if (t == 3) {
		t = 0;
	}
	Class();
	var le = t * -412;
	$(".banner-ws-img").stop().animate({
		left: le
	}, 200);
})
//上一张prevs
$(".prevs").click(function() {
	t--;
	if (t == -1) {
		t = 2;
	}
	Class();
	var le = t * -412;
	$(".banner-ws-img").stop().animate({
		left: le
	}, 200);
	$(".bannerbtn").animate({
		"transform": "translateX(20px)"
	}, 100)
})
