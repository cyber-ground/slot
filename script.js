'use strict';

//------------------------------------------------------------------------------------------------

//                           ----- SLOT MACHINE 機能拡張 完成版 -----  
//------------------------------------------------------------------------------------------------


let reelCount = 1;
  let total = 0;
    let currentDept = 0;
      let panelsRemain = 3;
        let spinStopBtnEvent = false;
          let activeLight = false;
        let applyCheckOut = false;
      let checkOutDept = false; 
    let checkOutLock = false;  
  let betCount = false; 
let bigSpin = false;


class Panel {
  constructor() {
    const main = document.querySelector('main');
    const section = document.createElement('section'); 
      section.classList.add('panel');
        this.img = document.createElement('img');
        this.img.src = this.getRandomImg();
        this.stopBtn = document.createElement('div');
        this.stopBtn.classList.add('stop');
        this.stopBtn.textContent = 'STOP';
        this.panelShadow = document.createElement('p');
      section.appendChild(this.img);
      section.appendChild(this.stopBtn);
      section.appendChild(this.panelShadow); 
      main.appendChild(section);  
    // event --------------------------------------
  
    this.stopBtn.addEventListener('click', () => { 
      if(!spinStopBtnEvent) return;
      if(this.stopBtn.classList.contains('js_inActive')) return;  // ポイント //
        this.stopBtn.classList.add('js_inActive');   // ポイント //  new //
        this.stopBtn.classList.add('js_stopBtnAnimation'); // trf animation //
      clearTimeout(this.timeout);
        this.manipulateReel();
        reelCount++
      panelsRemain--;
      // console.log(panelsRemain); // console.log // 
      if(panelsRemain === 0) {         // 判定 //
        if(insertPoint.classList.contains('js_blank')) { // BIG SPIN // reset //
          winPoint.classList.remove('js_bigSpinRed'); // text & color reset //
            bigSpinX.classList.remove('js_bigSpinX'); // BIG SPIN X remove //
            winPoint.textContent = 0; // needs higher then checkForFunction //
          winPoint.classList.remove('js_winRed'); 
        }
        checkForMatchedAll(); checkForUnMatched(); checkForTwoPairMatched(); // 判定 //
          checkForTwoPairExtraSeven(); checkForTwoPairExtraDiamond(); checkForTwoPairExtraBar(); 
        // 判定 // reset shadow effect // 判定 //
        panelsRemain = 3; // reset counter //
        spinStopBtnEvent = false; activeLight = false; applyCheckOut = false;
          bigSpin = false; betCount = false; // betCounter dblclick disabled reset // 
            spinBtn.classList.remove('js_inActive'); // reset btn opacity //
          spinBtn.classList.remove('js_spinBtnAnimation'); // reset trf animation // 
        if(total === 0) {  // rewrite default message //
          spinBtn.textContent = 'INSERT POINT TO PLAY';
          betPoint.textContent = 0;
        }
        if(currentDept === 0 && total <= 0)  { 
          checkOutDept = true; // game over // 
          betPoint.textContent = 0;
          checkOutLock = false;
        }
        // if(insertPoint.classList.contains('js_blank')) { // BIG SPIN READ TEST //
        //   console.log('contain read in stop event');
        // }
      }
    });
  }

// out of constructor -----------------------------------------------------------------------

  // getRandomImg() { // modern version //
  //   const images = ['img/bell.jpg', 'img/cherry.jpg', 'img/watermelon.jpg', 
  //   'img/diamond.jpg', 'img/bar.jpg', 'img/seven.jpg', 'img/dollar.jpg'];
  //   return images[Math.floor(Math.random() * images.length)];
  // }
  
  getRandomImg() {
    const images = ['img/bell.jpg','img/cherry.jpg','img/watermelon.jpg',
      'img/diamond.jpg', 'img/bar.jpg', 'img/seven.jpg'];
    return images[Math.floor(Math.random() * images.length)];
  }

  manipulateImg() {
    const image = ['img/bell.jpg','img/cherry.jpg','img/watermelon.jpg'];
    return image[Math.floor(Math.random() * image.length)];
  }

  manipulateReel() {
    if(reelCount <= 15) {
      console.log('inactive');
      // console.log('inactive - ' + (reelCount));
    }
    if(reelCount <= 15) return;
      console.log('now activate');
      // console.log('now activate - ' + (reelCount));
      this.img.src = this.manipulateImg();
    if(reelCount === 21) {
      reelCount = 0;
    }
  }
  
  spin() {
    this.panelShadow.classList.remove('js_unMatched-effect');  // reset shadow effect //
      this.stopBtn.classList.remove('js_inActive'); // stop btn opacity effect remove // 
        this.stopBtn.classList.remove('js_stopBtnAnimation'); // reset trf animation //
      this.img.src = this.getRandomImg();

    this.timeout = setTimeout(() => {
      this.spin();
    }, 50);
  }

  matched(p1, p2) {
    return this.img.src === p1.img.src && this.img.src === p2.img.src;
  }

  unMatched(p1, p2) {    // new // // new // // new // 
    return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
  }

  unMatchEffect() {
    this.panelShadow.classList.add('js_unMatched-effect'); // shadow effect //
  }
  disableUnMatchEffect() {
    this.panelShadow.classList.remove('js_unMatched-effect');
  }
}

const panels = [ new Panel(), new Panel(), new Panel()];

// out of class ---------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
// check for match result --------------------------------------------------------
//  match all & unMatch ---------------------------------

function checkForMatchedAll() {
  if(panels[2].matched(panels[1], panels[0])) {  // new //
    pointAdd_matchedAll(); // BIG SPIN  // this return down below keep on 5x2x active effect //
      if((panels[0].img.src === panels[1].img.src) 
        && panels[2].img.src.includes('diamond')) return; 
    // reset2x_activeEffect(); // when MatchedAll 2x activeEffect disable //  
    // reset5x_activeEffect(); // when MatchedAll 5x activeEffect disable //    
  }
}

function checkForUnMatched() {
  if(panels[0].unMatched(panels[1], panels[2])) {  // new //
    panels[0].unMatchEffect();
  }
  if(panels[1].unMatched(panels[0], panels[2])) {  // new //
    panels[1].unMatchEffect();
  }
  if(panels[2].unMatched(panels[0], panels[1])) {  // new //
    panels[2].unMatchEffect();
  }
}

// two pair & extra ------------------------------------

function checkForTwoPairExtraSeven() {
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('seven')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraSeven();
  }
}

function checkForTwoPairExtraDiamond() {
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('diamond')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraDiamond();
  }
}

function checkForTwoPairExtraBar() { 
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('bar')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraBar();
  }
}

function checkForTwoPairMatched() {
  if((panels[0].img.src === panels[2].img.src)  
    && panels[2].img.src !== panels[1].img.src) { 
      disable_duplicate_point();
    pointAdd_twoPair();
  }
}

function disable_duplicate_point() {
  if((panels[0].img.src === panels[2].img.src) 
    &&  panels[1].img.src.includes('diamond')) { 
    return;
  }
  if((panels[0].img.src === panels[2].img.src) 
    &&  panels[1].img.src.includes('seven')) { 
    return;
  }
  if((panels[0].img.src === panels[2].img.src) 
    &&  panels[1].img.src.includes('bar')) { 
    return;
  }
}

// point panel -----------------------------------------------------------------------

const bigSpinX = document.querySelector('.btn-bigSpinX');
const winPoint = document.querySelector('.win-point');
  const totalPoint = document.querySelector('.total-point');
    const betPoint = document.querySelector('.bet-point');
      const betText = document.querySelector('.bet-text');
      const deptPoint = document.querySelector('.dept-point');
      winPoint.textContent = 0;
    totalPoint.textContent = 0;
  betPoint.textContent = 0;
deptPoint.textContent = 0;

//-------------------------------------------------------------------------------------------------
// point add ---------------------------------------------------------------------------

function pointAdd_matchedAll() {
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
  && bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { // BIG SPIN POINT //
        // console.log('contain read in 5x2x - pointAdd_matchedAll');
          pointRate(100);
        totalPoint.textContent = total;
      return;
    }
      pointRate(10);
        totalPoint.textContent = total;
      // console.log('10xPoint');
    return;
  } 
  else if(bet5x.classList.contains('js_bet5x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { // BIG SPIN POINT // 
        // console.log('contain read in 5x - pointAdd_matchedAll');
          pointRate(50);
        totalPoint.textContent = total;
      return;
    }
      pointRate(5);
        totalPoint.textContent = total;
      // console.log('5xPoint');
    return;
  } 
  else if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { // BIG SPIN POINT //
        // console.log('contain read in 2x - pointAdd_matchedAll');
          pointRate(20);
        totalPoint.textContent = total;
      return;
    }
      pointRate(2);
        totalPoint.textContent = total;
      // console.log('2xPoint');
    return;
  } 
  else {
    if(insertPoint.classList.contains('js_blank')) { // BIG SPIN POINT //
        // console.log('contain read in 1x - pointAdd_matchedAll');
          pointRate(10);
        totalPoint.textContent = total;
      return;
    }
      pointRate(1);
        totalPoint.textContent = total;
    // console.log('1xPoint');
  }
}

// pointAdd_twoPair ------------------------------------

function pointAdd_twoPair() {
  if(panels[2].img.src.includes('seven')) {
    checkBetX(50);
  } else if(panels[2].img.src.includes('diamond')) {
    checkBetX(200);
  } else if(panels[2].img.src.includes('bar')) {
    checkBetX(100);
  } else if(panels[2].img.src.includes('watermelon')) {
    checkBetX(50);
  } else if(panels[2].img.src.includes('cherry')) {
    checkBetX(50);
  } else if(panels[2].img.src.includes('bell')) {
    checkBetX(50);
  } 
}

// pointAdd_twoPairExtraSeven ----------------------------

function pointAdd_twoPairExtraSeven() {
  if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('diamond')) {
    checkBetX(3000);
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('bar')) {
    checkBetX(750);
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(50);
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(50);
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(50);
  }
}

// pointAdd_twoPairExtraDiamond ----------------------------

function pointAdd_twoPairExtraDiamond() {
  if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('seven')) {
    checkBetX(2500);
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('bar')) {
    checkBetX(1000);
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(200);
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(200);
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(150);
  }
}

// pointAdd_twoPairExtraBar ---------------------------- 

function pointAdd_twoPairExtraBar() {
  if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('seven')) {
    checkBetX(2000);
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('diamond')) {
    checkBetX(1250);
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(100);
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(100);
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(100);
  }
}

//-------------------------------------------------------------------------------------------------
// point rates -------------------------------------------------------------------------

function pointRate(arg) {
  if(panels[2].img.src.includes('seven')) {
    total += 5000 * arg;
      winPoint.textContent = 5000 * arg;
    winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('diamond')) {
    setTimeout(() => { // BIG SPIN // // BIG SPIN // 
      panels.forEach(panel => {
        panel.spin();
      });
      bigSpin = true;
        activeLight = true; // 5x2x click disabled //
          applyCheckOut = true;
        spinStopBtnEvent = true; // spinStopBtn dblclick disabled // *set
      spinBtn.classList.add('js_inActive'); // *set 
        insertPoint.classList.add('js_blank'); 
          winPoint.classList.add('js_bigSpinRed');
          bigSpinX.classList.add('js_bigSpinX');
        winPoint.textContent = 'BIG SPIN'; 
      // console.log(insertPoint);
    }, 500); // BIG SPIN // 
  } else if(panels[2].img.src.includes('bar')) {
      total += 1500 * arg;
        winPoint.textContent = 1500 * arg;
      winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('watermelon')) {
      total += 200 * arg;
        winPoint.textContent = 200 * arg;
      winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('cherry')) {
      total += 200 * arg;
        winPoint.textContent = 200 * arg;
      winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('bell')) {
      total += 150 * arg;
        winPoint.textContent = 150 * arg;
      winRed_add_bigSpinRed_remove();
  }
  // if(insertPoint.classList.contains('js_blank')) { // BIG SPIN READ TEST //
  //   console.log('contain read in pointRate');
  // }
}

// check betX  -------------------------------------------------------------------------

function checkBetX(arg) { // for pair & extra //
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
  && bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { // X POINT //
        // console.log('contain read in checkBetAmount 5x2x');
        total += arg * 100; 
          winPoint.textContent = arg * 100;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
        total += arg * 10;
          winPoint.textContent = arg * 10;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 5x2x');
      return;
    }
  } else if(bet5x.classList.contains('js_bet5x-activeEffect')){
    if(insertPoint.classList.contains('js_blank')) { // X POINT //
        // console.log('contain read in checkBetAmount 5x');
        total += arg * 50;
          winPoint.textContent = arg * 50;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
        total += arg * 5;
          winPoint.textContent = arg * 5;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 5x');
      return;
    }
  }
  if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { // X POINT //
        // console.log('contain read in checkBetAmount 2x');
        total += arg * 20;
          winPoint.textContent = arg * 20;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else { 
        total += arg * 2;
          winPoint.textContent = arg * 2;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 2x');
      return; 
    }
  } else {
    if(insertPoint.classList.contains('js_blank')) { // X POINT //
        // console.log('contain read in checkBetAmount 1x');
        total += arg * 10;
          winPoint.textContent = arg * 10;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
      total += arg;
        winPoint.textContent = arg;
          totalPoint.textContent = total;
        winRed_add_bigSpinRed_remove();
      // console.log(' read in checkBetX 1x');
    }
  }
}

// WIN point BIG SPIN red ----------------------------------------------------

function winRed_add_bigSpinRed_remove() {
    winPoint.classList.add('js_winRed');
  winPoint.classList.remove('js_bigSpinRed');  
}

// players bet -------------------------------------------------------------------

function playerBet() {
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
    && bet2x.classList.contains('js_bet2x-activeEffect')) {
      total -= 500;
        totalPoint.textContent = total;
      // console.log('10xBet');
    return;
  } 
  else if(bet5x.classList.contains('js_bet5x-activeEffect')) {
    total -= 250;
      totalPoint.textContent = total;
      // console.log('5xBet');
    return;
  } 
  if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    total -= 100;
      totalPoint.textContent = total;
    // console.log('2xBet');
  } else {
    total -= 50;
      totalPoint.textContent = total;
    // console.log('1xBet');
  }
}

// bet counter -----------------------------------------------------------------------

function betCounter() {
  // console.log('bet counter read in function'); // console.log //
  if(betCount) return; // betCounter dblclick disabled reset // maybe don't need //
    if(bet5x.classList.contains('js_bet5x-activeEffect') 
        && bet2x.classList.contains('js_bet2x-activeEffect')) {
      betAmount(500);
    return;
  } 
  else if(bet5x.classList.contains
    ('js_bet5x-activeEffect')) {
      betAmount(250);
    return;
  }
  else if(bet2x.classList.contains
    ('js_bet2x-activeEffect')) {
      betAmount(100);
    return;
  }
  else {
    betAmount(50);
  }
}

function betAmount(arg) {
  betPoint.textContent ='';
  setTimeout(() => {
      betPoint.textContent = arg;
    // console.log('bet');
  }, 50);
}

// 5x2xBtn active effect turn off auto --------------------------------------------------

function btn5x2x_ActiveEffect_TurnOffAuto() {
  if(bet2x.classList.contains('js_bet2x-activeEffect') && total < 500) {
    reset5x_activeEffect();
  }
  if(total < 250) {
    reset5x_activeEffect();
  } if(total < 100) {
    reset2x_activeEffect();
  }                              
}

  function reset2x_activeEffect() {
      bet2x.classList.remove('js_bet2x-activeEffect'); 
    bet2x.classList.remove('js_bet2x-textColorBright'); 
  }

  function reset5x_activeEffect() {
      bet5x.classList.remove('js_bet5x-activeEffect'); 
    bet5x.classList.remove('js_bet5x-textColorBright'); 
  }

// event -----------------------------------------------------------------------------

    const insertPoint = document.querySelector('.btn-insert');
  insertPoint.addEventListener('click', function () {
    checkOutLock = true;
    checkOutDept = false; 
    if(total > 0) return;
    total += 10000; /////////////////////////////////////////////
    currentDept += 10000; //////////////////////////////////////
    winPoint.textContent = 0;
    betPoint.textContent = 0;
    totalPoint.textContent = total; 
      deptPoint.textContent = currentDept; 
        spinBtn.textContent = 'SPIN'; // rewrite textContent to SPIN //
          checkOut.textContent = 'CHECK OUT'; 
          checkOut.classList.remove('js_checkOut-lost');
            // console.log(total);  // console.log //
        insertPoint.classList.add('js_insertPoint-activeEffect'); // insert btn flash effect //
      insertPoint.classList.add('js_insertPoint-textColorBright');
    setTimeout(() => { 
        insertPoint.classList.remove('js_insertPoint-activeEffect');
      insertPoint.classList.remove('js_insertPoint-textColorBright');
    }, 300);
  });


const bet2x = document.querySelector('.btn-bet2x'); 
  bet2x.addEventListener('click', function () {
    if(checkOutDept) return; // (R1)
      if(total < 500 && bet5x.classList.contains('js_bet5x-activeEffect')) return; ////// new add !!!
        if(total < 100) return; // currentDept === 0 works fine /////// new add !!!
      checkOut.textContent = 'CHECK OUT';  // reset check out text //
    checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost'); // reset message //
      if(activeLight) return;
        if(total <= 0) return;
      bet2x.classList.toggle('js_bet2x-activeEffect'); // bets2x btn flash effect //
    bet2x.classList.toggle('js_bet2x-textColorBright');
  });


const bet5x = document.querySelector('.btn-bet5x');
  bet5x.addEventListener('click', function () {
    if(checkOutDept) return; 
      if(total < 500 && bet2x.classList.contains('js_bet2x-activeEffect')) return;  // disable click //
        if(total < 250) return;  // activeEffect disable click //
      checkOut.textContent = 'CHECK OUT';  // reset check out text //
    checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost'); // reset colored //
      if(activeLight) return;
        if(total <= 0) return;
      bet5x.classList.toggle('js_bet5x-activeEffect');; // bets5x btn flash effect //
    bet5x.classList.toggle('js_bet5x-textColorBright');
  });


    const checkOut = document.querySelector('.check-out');
  checkOut.addEventListener('click', function () {
    if(!checkOutLock) return;
    if(applyCheckOut) return;
    betPoint.textContent = 0;
      reset2x_activeEffect(); reset5x_activeEffect();
        if(total > currentDept) {
          checkOut.textContent = `WIN + ${total - currentDept}`;
        } else if(currentDept > total) { // bc 10000 //
          checkOut.textContent = `LOST - ${currentDept - total}`;
        }
          if(total > currentDept) { // colored when check out //
            checkOut.classList.add('js_checkOut-win');
          } else if(total < currentDept) { // colored when check out //
            checkOut.classList.add('js_checkOut-lost');
          }
        if(total < currentDept) return; 
      if(total > currentDept) {
        totalPoint.textContent = total - currentDept;
          total = total - currentDept;
            currentDept = 0;
        deptPoint.textContent = currentDept;
      }
      if(total > currentDept) return; 
    if(!checkOutDept) { // runs only (total even currentDept) //
      deptPoint.textContent = total - currentDept;
        totalPoint.textContent = total - currentDept;
          total = 0;
            currentDept = 0;
            checkOutDept = true;
          checkOut.textContent = `LOST - ${currentDept - total}`;
      if(total === 0) {  // reset message //
        spinBtn.textContent = 'INSERT POINT TO PLAY'
      }
    } 
  }); 


    const spinBtn = document.getElementById('spin');
  spinBtn.addEventListener('click', () => { 
    if(bigSpin) return;
      if(checkOutDept) return; 
        winPoint.textContent = 0;  // reset winPoint // 
        winPoint.classList.remove('js_winRed'); // reset winRed //
      checkOut.textContent = 'CHECK OUT';  // reset // check out text //
      checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost');
    if(total < 50) return; // when point 0 disable spinBtn click event //
      spinStopBtnEvent = true;
        activeLight = true;
      applyCheckOut = true;
    spinBtn.classList.add('js_spinBtnAnimation'); // trf animation add // 
    if(spinBtn.classList.contains('js_inActive')) return;  // ポイント // dbl click cancel //
      spinBtn.classList.add('js_inActive');
        insertPoint.classList.remove('js_blank') // BIG SPIN // 
          // console.log('classList removed -- js_blank'); // console.log //
          playerBet(); // bets point //
          betCounter(); 
        betCount = true; // betCounter dblclick disabled // 
      // console.log(total); // console.log //
    panels.forEach(panel => {
      panel.spin();
      btn5x2x_ActiveEffect_TurnOffAuto(); 
    });
  });

// console.log(total);

// resize randomMp4 -----------------------------------------------------------------------------

function randomMp4() {
  const video = document.querySelector('.video');
    const mp4s = ['img/World - 1992.mp4', 'img/Seoul - 21116.mp4', 'img/City - 12126.mp4'];
  video.src = mp4s[Math.floor(Math.random() * mp4s.length)];
}
window.addEventListener('resize', function () {
  randomMp4();
});

// -----------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------
// メモ ---

/* pointAdd_twoPairExtraSeven, pointAdd_twoPairExtraDiamond, pointAdd_twoPairExtraBarの中で
この記述を省くことでpointAdd_matchedAllでのポイント加算した後のポイント重複を解除している */
  // else if(panels[1].img.src.includes('seven') // sevenの場合の記述 //
  // && panels[2].img.src.includes('seven')) {
  //   この記載を省くことでmatchedAllの時の重複を解除
  // }

// ---------------------------------------------------------------------------------------------
// メモ ---

// if(total < 10000) {
//   lostPoint.textContent = Math.abs(total - 10000); 
// } 


// if(total < 500 && total > 250) {
//   reset5x_activeEffect();
// } 

// -----------------------------------------------------------------------------------------------------------------








