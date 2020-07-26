---
date: 2017-08-20
tags: CSS
author: 社长的社畜
location: 成都
---

# Google的加载动画（SVG）

> svg写的Google常用的进度条和loading加载动画，可以直接复制拿去运行，也可以封装成一个组件，很实用。
代码如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Loading</title>
</head>
<body>
  <div class="load-bar">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>
</body>
  
<style>
  /* progress-bar: */
  body {
    padding: 0;
    margin: 0;
  }
  .load-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 5px;
  }
  .bar {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    left: 50%;
    text-align: center;
  }
  .bar:nth-child(1) {
    background-color: #ffcb26;
    animation: loading 3s linear infinite;
  }
  .bar:nth-child(2) {
    background-color: #337ab7;
    animation: loading 3s linear 1s infinite;
  }
  .bar:nth-child(3) {
    background-color: #42b983;
    animation: loading 3s linear 2s infinite;
  }
  @keyframes loading {
    from {left: 50%; width: 0;z-index:100;}
    33.3333% {left: 0; width: 100%;z-index: 10;}
    to {left: 0; width: 100%;}
  }

  /* loading: */
  .loader {
    left: 50%;
    top: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .loader #spinner {
    box-sizing: border-box;
    stroke: #673AB7;
    stroke-width: 3px;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
    animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
  }
  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(450deg);
      transform: rotate(450deg);
    }
  }
  @keyframes rotate {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(450deg);
      transform: rotate(450deg);
    }
  }
  @-webkit-keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
</style>
</html>
```