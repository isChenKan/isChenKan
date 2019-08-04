---
date: 2017-11-01
tags: JavaScript
author: 葵花养殖技术人员
location: Chengdu
---

# 我的第一个JavaScript程序：贪吃蛇
> 突然从电脑里翻出来两年前写的程序，记得大一学C语言的时候，因为C写图形界面很复杂，但是书上的贪吃蛇程序有几页。后来接触了JS之后，当时想着用这个写应该代码量少点儿，然后自己花了几天捣鼓出一个简易版贪吃蛇，还不完善，改天抽时间改进一下，还挺有意思。

```html
<!DOCTYPE html>
<html>
<head>
	<title>snake</title>
</head>
<body>
	<style>
		body {
			max-height: 600px;
			background: #ddd;
		}

		button {
			position: relative;
			display: block;
			left: 430px;
			top: -300px;
			width: 80px;
			height: 50px;
			margin-bottom: 20px;
			border: 1px solid #337ab7;
			border-radius: 3px;
			box-shadow: 0 0 5px rgba(0, 0, 0, .5);
			box-shadow: 3px 3px 5px rgba(0, 0, 0, .5);
			color: #fff;
			outline: none;
			font-size: 18px;
			background: #337ab7;
			transition: all .2s;
		}

		.playing {
			transform: scale(1.1);
			background: #1165ad;
			box-shadow: 0 0 5px rgba(0, 0, 0, .7);
			box-shadow: 3px 3px 5px rgba(0, 0, 0, .7);
		}

		.container {
			position: relative;
			top: -200px;
			color: #222;
		}

		.score {
			color: #ff0000;
		}
	</style>

	<canvas id='canv' width="400" height="400"></canvas>
	<button class="btn btn1">Slow</button>
	<button class="btn btn2">Normal</button>
	<button class="btn btn3">Fast</button>
	<div class="container">Current Score: 
		<span class="score"></span>
	</div>

	<script>
		window.onload = function() {
			canv = document.querySelector("#canv");
			ctx = canv.getContext("2d");
			document.addEventListener("keydown", keyPush);
			var play = setInterval(game, 200);
			var btn = document.querySelectorAll(".btn");

			function remove() {
				for (var i = 0, len = btn.length; i < len; i++) {
					btn[i].classList.remove("playing");
				}
		  }

      var slow = document.querySelector(".btn1");
			slow.addEventListener("mousedown", function() {
				clearInterval(play);
				play = setInterval(game, 400);
				remove();
				slow.classList.add("playing");
			});

			var normal = document.querySelector(".btn2");
			normal.addEventListener("mousedown", function() {
				clearInterval(play);
				play = setInterval(game, 100);
				remove();
				normal.classList.add("playing");
			});

			var fast = document.querySelector(".btn3");
			fast.addEventListener("mousedown", function() {
				clearInterval(play);
				play = setInterval(game, 40);
				remove();
				fast.classList.add("playing");
			});

		}
		
		var px = py = 10;   //current position
		var gs = tc = 20;   //scale
		var ax = ay = 15;   //apple position
		var xv = yv = 0;    //offset
		var trail = [];     //snake array
		var tail = 5;       //length


		function keyPush(e) {
			switch (e.keyCode) {
				case 37:
					xv = -1; yv = 0;
					break;
				case 38:
					xv = 0; yv = -1;
					break;
				case 39:
					xv = 1; yv = 0;
					break;
				case 40:
					xv = 0; yv = 1;
					break;
			}
		}

		function game() {
			var score = document.querySelector(".score");
			score.innerHTML = tail; 
			px += xv;
			py += yv;

			if (px < -1) {
				alert("GG");
				px = 10;
				tail = 5;
			}
			if (px > tc) {
				alert("GG");
				px = 10;
				tail = 5;
			}
			if (py < -1) {
				alert("GG");
				py = 10;
				tail = 5;
			}
			if (py > tc) {
				alert("GG");
				py = 10;
				tail = 5;
			}

			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = "#fff";

			for (var i = 0; i < trail.length; i++) {
				ctx.fillRect(trail[i].x * gs, trail[i].y * tc, gs - 1 , tc - 1);
				if (trail[i].x == px && trail[i].y == py) {
					tail = 5;
				}
			}

			trail.push({x: px, y: py});
			while (trail.length > tail) {
				trail.shift();
			}

			if (ax == px && ay == py) {
				tail++;
				ax = Math.floor(Math.random() * gs);
				ay = Math.floor(Math.random() * tc);
			}

			ctx.fillStyle = "#337ab7";
			ctx.fillRect(ax * gs, ay * tc, gs - 1, tc - 1);
		}
	</script>
</body>
</html>
```