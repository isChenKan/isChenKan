# 纯CSS轮播图

如果想做一个点击两边的箭头来切换轮播图图片的效果，而又不能使用JavaScript的话，用纯css也是可以实现的，只不过可控性没有js写的好。

用css的话主要是利用`<label for="#">`标签和`<input type="radio">`，由于input标签的单选按钮正好跟轮播图的性质契合，所以可以将左右箭头绑定到单选按钮上，因为`<label>`的for可以绑定input元素的ID，从而实现点击label就可以实现切换图片的效果， 这样就可以点击按钮实现图片的切换了。大致思路是这样的。关键代码：

```html
<div class="group">
  <input type="radio" name="test" id="0" value="0">
  <label for="2" class="previous"><</label>
  <label for="1" class="next">></label>
  <div class="content">
    <img src="#">
  </div>
</div>
<div class="group">
  <input type="radio" name="test" id="1" value="1">
  <label for="0" class="previous"><</label>
  <label for="2" class="next">></label>
  <div class="content">
    <img src="#">
  </div>
</div>
<div class="group">
  <input type="radio" name="test" id="2" value="2">
  <label for="1" class="previous"><</label>
  <label for="0" class="next">></label>
  <div class="content">
    <img src="#">
  </div>
</div>
```
CSS关键部分：
```css
.group input:checked ~ .content {
  display: block;
}
.group input:checked ~ .previous, .group input:checked ~ .next {
  display: block;
}
```