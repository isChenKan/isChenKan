<template>
  <div class="home-container">
    <div class="home-description"> 
      <div>这里是葵花养殖技术人员的技术博客，因为女朋友喜欢葵花，所以我就叫葵花养殖技术人员啦！🌻</div>
      <div>有需要交流的地方你可以'Contact'发个邮件给我^ ^</div>
      <div
        class="home-btn"
        @click="handleClickBtn">
        进入
      </div>
    </div>
    <div class="svg-wrap">
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <g class="wholePenguin">
            <g>
                <ellipse cx="397" cy="512.59" rx="91.2" ry="23.4" fill="#96b0cd" />
                <g class="penguinTop">
                    <g class="flipperGroup">
                        <path class="arm armR" d="M481.3,389.89c-.94-2.82-21-49.3-29.64-69.43l-4-9.17s-25.85-6-29.72,10.08c-1.47,6.12,31.82,62.22,36.13,69.81,7.19,12.68,19.95,39.15,21.79,41.91,2.4,3.6,4.8-1.2,5.4-3s2.07-16.22,2.4-19.2C484.3,405.49,482.5,393.49,481.3,389.89Z" fill="#252425" />
                        <path class="arm armL" d="M374.06,336a47.24,47.24,0,0,0-4.36,7.65c-1.2,3.6-16.8,38.4-18.6,42.6s-3.6,10.8-3.6,15c0,0-1.2,18-1.2,19.8s1.8,5.4,4.8,4.2c2.48-1,15.42-19.35,20.1-25.49,9.6-12.61,27-43.81,27-43.81l-18.3-28.5S376.85,331.76,374.06,336Z" fill="#252425" />
                    </g>
                    <g class="penguinHead">
                        <path d="M451,299c0,.51.06,2.79.17,6.4a14,14,0,0,1-5.27,2.9c-9.69,4.58-9.88,1.83-16.06,1.69-5.51-.12-6.12-3.23-8-5.8-.35-.49-1.85-8.55-3-9.41-1.73-1.3,1.22-5.08,2.42-8.68.74-2.21,3.05-3.74,4.73-4.59a15.12,15.12,0,0,1,1.87-.81s9-1.8,13.8,1.8a35.81,35.81,0,0,1,8.08,9.12h0A26.66,26.66,0,0,1,451,299Z" fill="#ffce80" />
                        <path d="M440.8,276.79a35.49,35.49,0,0,1,9,14.82,35.81,35.81,0,0,0-8.08-9.12c-4.8-3.6-13.8-1.8-13.8-1.8a15.12,15.12,0,0,0-1.87.81c1.73-1,2.47-4.41,1.87-8.61s-10.94-5.58-11.39-5.64C423.35,267.6,433.45,269.44,440.8,276.79Z" fill="#ff6949" />
                        <g class="face">
                            <path d="M427.9,272.89c.6,4.2-.14,7.62-1.87,8.61s-4,2.38-4.73,4.59c-1.2,3.6-.37,9.24-.46,10,0,0,.21,5.31-2.19,7.11s-15,13.47-19.38,1.24c2.3-2.77,2.83-7.24,2.83-11.18,0-4.2-3-12.6-6-16.2-2.5-3-16.09-6.64-20.51-7.76a.66.66,0,0,1-.18-1.2c2.67-1.62,5.53-1.89,8.39-2.14,3.3-.3,23.4,1.2,30,1.2.82,0,1.73,0,2.7.06h0C417,267.31,427.31,268.78,427.9,272.89Z" fill="#252425" />
                            <path d="M406.3,274.69a2.67,2.67,0,0,0-1.8-3.6c-1-.35-13.23-1-17.63-1.15a.23.23,0,0,0-.08.44c4,1.35,14.93,5,15.91,5.51A2.89,2.89,0,0,0,406.3,274.69Z" fill="#ffce80" />
                            <circle class="eye" cx="415.3" cy="276.49" r="1.2" fill="#fdfcfd" />
                        </g>
                    </g>
               
                    <path d="M455.8,390.79s-5.08-76.07-6-77.4l-3.9-5.1c.6-2.4,0-11.4-3-16.8s-13.58-1.28-17.4,0c-1.8.6-4.8,3-6.6,4.2-.74.49-4.2,3.6-6.6,5.4s-11.4,3.6-13,3.38c-.15.18-.3.35-.47.52,0,0-13.2,11.4-15.6,13.8-1.55,1.54-6.11,8.11-9.14,17.25A54.09,54.09,0,0,0,371.2,353v63h84.6Z" fill="#fdfcfd"/>
     
                    <path class="flank" d="M455.8,391.34c0-23.71-3.51-51.86-4.14-70.88-.2-6.14-.37-11.33-.49-15.07a14,14,0,0,1-5.27,2.9l-3.6,3c-2.4,2.4-4.8,6.6-4.8,19.2,0,7.08,1.3,36.76,1.8,61.8.18,8.9.14,17.2.11,23.7H455.8Z" fill="#252425" />
                </g>
                <g class="penguinBot">
                    <path d="M397.3,498.49c-3,1.51-6,3.6-7.2,4.2a8.53,8.53,0,0,1-3.6,1.2,19.07,19.07,0,0,1,1.8-5.4c-1.8,1.2-9.6,3-12.6,3,1.2-3,4.8-4.8,4.8-4.8-3,0-6.6.6-8.4,0a14.3,14.3,0,0,1,6.6-3.6c2.4-.6,6.55-.6,10.2-.6,4.2,0,12.9-.3,12,.6S399.7,497.29,397.3,498.49Z" fill="#272b2e" />
                    <path d="M429.1,495.49a10.76,10.76,0,0,0-3.6,6c1.2,0,4.2-1.2,6-1.8-.6,2.4-.6,4.2,0,4.8a15.53,15.53,0,0,0,6.6-4.2c1.2,1.2,2.4,3.6,3.6,4.2,1.2-1.2,4.8-4.8,5.4-6.6s0-6-1.2-6.6-12.6,0-13.8.6S429.1,495.49,429.1,495.49Z" fill="#272b2e" />
                    <path d="M371.2,422v25.8s.6,4.8,1.2,7.2c.49,1.95,8.54,26.21,11.51,35.13a4.78,4.78,0,0,0,4.53,3.27h9.74a3.92,3.92,0,0,0,3.5-2.16,4.83,4.83,0,0,1,1.76-1.93,4.76,4.76,0,0,1,2.51-.71h17.82a4.77,4.77,0,0,1,4.43,3,4.82,4.82,0,0,0,4.43,3H443a4.77,4.77,0,0,0,4.65-3.69c1.22-5.27,3.51-15.15,5.16-22.63,1.78-8.48,3-28.28,3-34.28V422Z" fill="#fdfcfd" />
                    <path d="M439.41,422c-.05,4.34-.11,7.09-.11,7.5,0,2.4,1.2,14.4,3.6,20.4s6.64,15.76,9.92,18.38c.81-3.69,1.47-6.8,1.78-8.48,1.2-6.6,1.2-27,1.2-27V422Z" fill="#252425" />
                </g>
                <g class="stretch">
         <rect x="370.7" y="415" width="84.6" height="7" fill="#fdfcfd"/>
          <rect x="439.36" y="415" width="16.39" height="7" fill="#252425"/>


                </g>
            </g>
        </g>
</svg>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    },
    penguinTop = select('.penguinTop'),
    penguinHead = select('.penguinHead'),
    maxDragY = 260,
    dragPosY = 0,
    stretchBoxInitHeight = 7,
    armL = select('.armL'),
    armR = select('.armR'),
    maxArmRotation = 100,
    maxHeadRotation = 12
  

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(armL, {
 transformOrigin: '100% 5%'
})
TweenMax.set(armR, {
 transformOrigin: '30% 20%'
})
TweenMax.set(penguinHead, {
 transformOrigin: '100% 95%'
})

function onDrag() {
 dragPosY = penguinTop._gsTransform.y;
 dragPosY = (dragPosY <=0) ? dragPosY : 0;
 TweenMax.set('.stretch rect', {
  attr: {
   height: stretchBoxInitHeight - dragPosY
  },
  y: dragPosY,
  roundProps:"height,y"
 })
 
 TweenMax.to(armL, 0.8, {
  rotation: ((-dragPosY)/maxDragY) * maxArmRotation,
  ease: Elastic.easeOut.config(0.65, 0.34)
 })
 TweenMax.to(armR, 1, {
  rotation: ((dragPosY)/maxDragY) * maxArmRotation,
  ease: Elastic.easeOut.config(0.5, 0.36)
 })
 TweenMax.to(penguinHead, 1, {
  rotation: ((dragPosY)/maxDragY) * maxHeadRotation,
  ease: Elastic.easeOut.config(0.85, 0.31)
 })
}

var topDrag = Draggable.create(penguinTop, {
 type: 'y',
 bounds: {minY: -maxDragY, maxY: 0},
 onDrag: onDrag,
 throwProps: true,
 onThrowUpdate: onDrag,
 overshootTolerance: 0,
 onThrowComplete: function () {
 var duration = -dragPosY/maxDragY;
  TweenMax.delayedCall(duration/2, resetPenguin)
 }
})

function resetPenguin () {
 var duration = -dragPosY/maxDragY;
 TweenMax.to(penguinTop, (duration + 0.1), {
  y: 0,
  onUpdate: onDrag,
  ease: Elastic.easeOut.config(duration/2 , 0.4)
 })
}

// function headNod (duration) {
 
//  TweenMax.to(penguinHead, 0.6, {
//   rotation: -8,
//   delay: duration/2,
//  })
// }

// function blink () {
//  TweenMax.to('.eye', 0.3, {
//   alpha: 0,
//   delay: Math.random() * 4,
//   onComplete: blink
//  })
// }

function init () {
 
//  blink();
 TweenMax.to(penguinTop, 0.6, {
  y: -160,
  onUpdate: onDrag,
  onComplete: function () {
   TweenMax.delayedCall(0.3, resetPenguin)
  }
 })
}

init();
  },
  methods: {
    handleClickBtn() {
      this.$router.push({
        path: '/index/',
      })
    },
  },
}
</script>


<style scoped>
.svg-wrap {
  display: flex;
  justify-content: center;
  height: 100%;
}
svg {
  width: 100%;
  visibility: hidden;
}
.home-container {
  height: 82vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.home-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 30px;
}
.home-btn {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  background: #ffda76;
  font-size: 14px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  cursor: pointer;
}
.penguinTop{
 -webkit-tap-highlight-color:transparent;
}
</style>
