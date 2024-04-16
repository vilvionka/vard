//catalog price

(() => {


  let graySection = document.querySelector('section.gray');
  if (graySection) {
    document.querySelector('footer').classList.add('noMargin');
  } else {
    document.querySelector('footer').classList.remove('noMargin');
  }
})();

window.onload = function () {
  //if (localStorage.getItem('presentVard') == 'present') {
  //  document.body.classList.add('loaded_hidden');
  //   return;
  // }

  const canvas = document.querySelector('#canvas1');
  if (canvas) {
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;



    class Particle {
      constructor(effect, x, y, color) {
        this.effect = effect
        this.x = 0;
        this.y = this.effect.h / 2;
        this.color = color;
        this.originX = x;
        this.originY = y;
        this.size = this.effect.gap;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
        this.friction = Math.random() * 0.6 + 0.15;
        this.ease = Math.random() * 0.1 + 0.02;
      }
      draw() {
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
      }
      update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.forse = -this.effect.mouse.radius / this.distance;
        if (this.distance < this.effect.mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.forse * Math.cos(this.angle);
          this.vy += this.forse * Math.sin(this.angle);
        }
        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }
    }

    class Effect {
      constructor(context, w, h) {
        this.context = context;
        this.w = w;
        this.h = h;
        this.textX = this.w / 2;
        this.textY = this.h / 2;
        this.fontSize = 100;
        this.maxTextWidth = this.w * 0.8;
        this.lineHeight = this.fontSize * 0.9;
        //particle text
        this.particles = [];
        this.gap = 3;
        this.mouse = {
          radius: 20000,
          x: 0,
          y: 0,
        }
        window.addEventListener('mousemove', (e) => {
          this.mouse.x = e.x;
          this.mouse.y = e.y;
        })

      }
      wrapText(text) {
        const gradient = this.context.createLinearGradient(0, 0, this.w, this.h)
        gradient.addColorStop(0.3, 'white');
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(0.7, 'yellow');
        this.context.fillStyle = gradient;
        this.context.textAlign = 'center';
        this.context.textBseLine = 'middle';
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'white';
        this.context.letterSpacing = '5px';
        this.context.font = this.fontSize + 'px Manrope';



        this.context.fillText('VÄRD', this.textX, this.textY);
        this.context.strokeText('VÄRD', this.textX, this.textY);

        this.convertToParticles();
      }
      convertToParticles() {
        this.particles = [];
        const pixels = this.context.getImageData(0, 0, this.w, this.h).data;
        this.context.clearRect(0, 0, this.w, this.h);
        for (let y = 0; y < this.h; y += this.gap) {
          for (let x = 0; x < this.w; x += this.gap) {
            const index = (y * this.w + x) * 4;
            // console.log(index);
            const alpha = pixels[index + 3];
            if (alpha > 0) {
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
              this.particles.push(new Particle(this, x, y, color));
            }
          }
        }
      }
      render() {
        this.particles.forEach((particle) => {
          particle.update();
          particle.draw();
        })
      }
      resize(w, h) {
        this.w = w;
        this.h = h;
        this.textX = this.w / 2;
        this.textY = this.h / 2;
        this.maxTextWidth = this.w * 0.8;
      }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText('VÄRD');
    effect.render();
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      effect.resize(canvas.width, canvas.height);
      effect.wrapText('VÄRD');
    })

    window.setTimeout(function () {
      document.body.classList.add('loaded_opacity');
    }, 5000);
    window.setTimeout(function () {
      document.body.classList.add('loaded_hidden');
      localStorage.setItem('presentVard', 'present');
    }, 5850);
  }

  if (sliderMin) {
    funcMin();
    funcMax();
  }
}


let sliderMin = document.querySelector('#range_min');
let sliderMax = document.querySelector('#range_max');
let displayMin = document.querySelector('#range1');
let displayMax = document.querySelector('#range2');
let sliderLine = document.querySelector('.product_flex_filter_slider_input_line');
let sliderMinValue = document.querySelector('#range_min');



let minGap = 0;

function funcMin() {
  if (parseInt(sliderMax.value) - parseInt(sliderMin.value) <= minGap) {
    sliderMin.value = parseInt(sliderMax.value) - minGap;
  }
  displayMin.value = sliderMin.value;
  fillColor();
}

function funcMax() {
  if (parseInt(sliderMax.value) - parseInt(sliderMin.value) <= minGap) {
    sliderMax.value = parseInt(sliderMin.value) + minGap;
  }
  displayMax.value = sliderMax.value;
  fillColor()
}

function fillColor() {
  percent1 = (sliderMin.value / sliderMinValue.max) * 100;
  percent2 = (sliderMax.value / sliderMinValue.max) * 100;

  sliderLine.style.background = `linear-gradient(to right, #D9DEE0 ${percent1}%, #C49A6C ${percent1}%, #C49A6C ${percent2}% , #D9DEE0 ${percent2}%)`;
}

if (displayMin) {
  displayMin.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      if (parseInt(displayMin.value) > parseInt(displayMax.value)) {
        displayMin.value = displayMax.value;
        sliderMin.value = displayMin.value;
      } else {
        sliderMin.value = displayMin.value;
      }
      fillColor()
    }
  });
}

if (displayMax) {
  displayMax.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      if ((parseInt(displayMax.value)) < (parseInt(displayMin.value))) {
        displayMax.value = displayMin.value;
        sliderMax.value = displayMax.value;
      } else {
        sliderMax.value = displayMax.value;
      }
      fillColor()
    }
  });
}



//trigger
(() => {
  let trigger = document.querySelectorAll('.header_catalog_box_content_trigger_item');
  for (let i = 0; i < trigger.length; i++) {
    trigger[i].addEventListener('click', function () {
      if (trigger[i].classList.contains('active')) {
        trigger[i].classList.remove('active');
      } else {
        trigger[i].classList.add('active');
      }
    });
  }
})();

//catalog header
(() => {
  let btnCatalog = document.querySelector('.header_top_catalog');
  let Cntcatalog = document.querySelector('.header_catalog');

  if (btnCatalog) {
    btnCatalog.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        Cntcatalog.classList.remove('active');
      } else {
        this.classList.add('active');
        Cntcatalog.classList.add('active');
      }
    })


    document.addEventListener('click', (e) => {
      const lkEl = e.composedPath().includes(btnCatalog);
      const gambLk = e.composedPath().includes(Cntcatalog);
      if (!lkEl && !gambLk) {
        Cntcatalog.classList.remove('active');
        btnCatalog.classList.remove('active');
      }

    })
  }

})();

// catalog menu
(() => {
  let catMenuItem = document.querySelectorAll('.header_catalog_box_menu div');
  let catMenuTab = document.querySelectorAll('.header_catalog_box_content_tab');
  for (let i = 0; i < catMenuItem.length; i++) {
    catMenuItem[i].addEventListener('click', function () {
      catMenuItem.forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');

      for (let j = 0; j < catMenuTab.length; j++) {
        catMenuTab[j].classList.remove('active');
      }
      catMenuTab[i].classList.add('active');
    })
  }
})();

// catalog menu hover
(() => {

  let item = document.querySelectorAll('.header_catalog_box_content_tab_item');
  let imgItemBox = document.querySelector('.header_catalog_box_content_img');
  let imgItem = document.querySelector('.header_catalog_box_content_img img');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('mouseover', function () {
      imgItemBox.classList.add('active');
      let src = item[i].getAttribute('data-src');
      imgItem.src = src;
    })
  }

  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('mouseout', function () {
      imgItemBox.classList.remove('active');
    })
  }

})();

// catalog menu mobil
(() => {

  let itemTab = document.querySelectorAll('.js_pop_catalog_mob_item');
  let boxTab = document.querySelectorAll('.pop_catalog_mob_tooLevel');

  for (let i = 0; i < itemTab.length; i++) {
    itemTab[i].addEventListener('click', function () {
      boxTab.forEach(el => {
        el.classList.remove('active');
      });
      boxTab[i].classList.add('active')
    })
  }

})();

// search header
(() => {
  let closeInput = document.querySelector('.header_top_search_box__clear');
  let inputHeader = document.querySelector('.header_top_search_box input');
  let inputBoxHead = document.querySelector('.header_top_search');
  let searchInput = document.querySelector('.header_top_search_box__search');
  let searchTranslat = document.querySelector('.js_header_search_translator');

  // if (inputHeader) {
  //   inputHeader.addEventListener('focus', function () {
  //     inputBoxHead.classList.add('active');
  //   });
  // }

  if (inputHeader) {
    inputHeader.addEventListener('input', function () {
      if (this.value == '') {
        closeInput.classList.remove('active');
        searchTranslat.classList.remove('active');
      } else {
        closeInput.classList.add('active');
        searchTranslat.classList.add('active');
      }
    });
  }

  if (closeInput) {
    closeInput.addEventListener('click', function () {
      inputHeader.value = '';
      this.classList.remove('active');
      inputBoxHead.classList.remove('active');
      searchTranslat.classList.remove('active');
    })
  }
  if (searchInput) {
    searchInput.addEventListener('click', function () {
      inputHeader.value = '';
      inputBoxHead.classList.remove('active');
      closeInput.classList.remove('active');
      searchTranslat.classList.remove('active');
    })
  }

})();

// search header
(() => {
  let filterComprasion = document.querySelectorAll('.comprasion_filter_box_item');
  for (let i = 0; i < filterComprasion.length; i++) {
    filterComprasion[i].addEventListener('click', function () {
      filterComprasion.forEach(el => {
        el.classList.remove('active');
        this.classList.add('active');
      });
    })
  }

})();




let prev = document.querySelector('.comprasion_nav_prev');
let next = document.querySelector('.comprasion_nav_next');
let wrap = document.querySelector('.comprasion_box_slider_box');
let slider = document.querySelector('.comprasion_box_slider');
let compCharacter = document.querySelectorAll('.comprasion_characteristics_body_slider_wrapper');
let shift = 0;
let diff = 0;
let flag = false;
let itemSlider = document.querySelector('.comprasion_box_slider_item');

if (next) {

  slider.addEventListener('touchstart', handleTouchStart, false);
  slider.addEventListener('touchmove', handleTouchMove, false);


  let x1 = null;
  let y1 = null;

  function handleTouchStart(e) {
    const firstTouch = e.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;

  }

  function handleTouchMove(e) {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = e.touches[0].clientX;
    let y2 = e.touches[0].clientY;
    let xDif = x2 - x1;
    let yDif = y2 - y1;

    if (Math.abs(xDif) > Math.abs(yDif)) {
      if (xDif > 0) {
        prevCompas();
      }
      else {
        nextCompas();
      }
    }
    x1 = null;
    y1 = null;
  }

  next.addEventListener('click', nextCompas);

  function nextCompas() {
    let dlItem = itemSlider.offsetWidth;
    let dlWrap = wrap.offsetWidth;
    let dlSlider = slider.offsetWidth;

    if ((dlWrap + (shift - dlItem)) > dlSlider) {
      shift = shift - dlItem;
      wrap.style.left = shift + 'px';
      compCharacter.forEach(el => {
        el.style.left = shift + 'px';
      });
      return;
    } else {
      if (flag) {
        return;
      }
      wrap.style.left = (dlSlider - dlWrap) + 'px';
      compCharacter.forEach(el => {
        el.style.left = (dlSlider - dlWrap) + 'px';
      });
      //  compCharacter.style.left = (dlSlider - dlWrap) + 'px';
      diff = (dlSlider - dlWrap) - shift;
      shift = (dlSlider - dlWrap);
      flag = true;
    }
  };
}
if (prev) {

  prev.addEventListener('click', prevCompas);

  function prevCompas() {
    let dlItem = itemSlider.offsetWidth;
    if (flag) {
      shift = shift - diff;
      wrap.style.left = shift + 'px';
      compCharacter.forEach(el => {
        el.style.left = shift + 'px';
      });
      //   compCharacter.style.left = shift + 'px';
      flag = false;
      return;
    }
    if (shift == 0) {
      return;
    }
    shift = shift + dlItem;
    wrap.style.left = shift + 'px';
    compCharacter.forEach(el => {
      el.style.left = shift + 'px';
    });
    // compCharacter.style.left = shift + 'px';
  };
};



// check checked p
(() => {
  let checkBox = document.querySelectorAll('.catalog_box_fl_item_body_el_checkbox input');

  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('click', function () {
      if (this.checked) {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
      checkBox.forEach(el => {
        if (el.classList.contains('active') && el.checked) {
          el.closest('.catalog_box_fl_item_body_el').classList.add('active');
        } else {
          el.closest('.catalog_box_fl_item_body_el').classList.remove('active');
        }
      });
    })
  }
})();

// clear button checked filter
(() => {
  let clearButton = document.querySelector('.js_catalog_box_fl_clear');
  let parent = document.querySelector('.catalog_box_fl');
  let signalCheked = document.querySelectorAll('.catalog_box_fl_item_head span')

  if (clearButton) {
    let inpCheckbox = parent.querySelectorAll('input');
    let textParent = parent.querySelectorAll('.catalog_box_fl_item_body_el');
    clearButton.addEventListener('click', function () {
      for (i = 0; i < inpCheckbox.length; i++) {
        inpCheckbox[i].checked = false;
      }
      for (y = 0; y < textParent.length; y++) {
        textParent[y].classList.remove('active');
      }
      for (z = 0; z < signalCheked.length; z++) {
        signalCheked[z].classList.remove('active');
      }
    })
  }
})();

// transform line
(() => {
  let cards = document.querySelectorAll('.catalog_box_cont_card');
  let btnLine = document.querySelector('.catalog_headling_head_btn_view_line');
  let btnTable = document.querySelector('.catalog_headling_head_btn_view_table');
  let boxHideCard = document.querySelector('.catalog_box_contHide');
  let numRowCard;

  if (btnLine) {
    btnLine.addEventListener('click', function () {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('line');
      }
      this.classList.add('active');
      btnTable.classList.remove('active');
      if (boxHideCard) {
        let el = boxHideCard.querySelectorAll('.catalog_box_cont_card').length;
        boxHideCard.style.height = (el * 235 + (el * 16)) + 'px';
      }
    })
  }

  if (btnTable) {
    btnTable.addEventListener('click', function () {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('line');
      }
      this.classList.add('active');
      btnLine.classList.remove('active');
      if (boxHideCard) {
        let el = boxHideCard.querySelectorAll('.catalog_box_cont_card').length;
        if (window.innerWidth > 1200) {
          numRowCard = 3;
        } else {
          numRowCard = 2;
        }
        boxHideCard.style.height = ((el / numRowCard * 465) + (el / numRowCard * 16)) + 'px';
      }
    })
  }

})();


// catalog card more

let btnMore = document.querySelector('.catalog_box_cont_btnMore');
let boxHideCard = document.querySelector('.catalog_box_contHide');

if (btnMore) {
  btnMore.addEventListener('click', function () {
    if (!boxHideCard.classList.contains('show')) {
      boxHideCard.classList.add('show');
      boxHideCard.style.height = 'auto';
      var height = boxHideCard.clientHeight + 'px';
      boxHideCard.style.height = '0px';

      setTimeout(function () {
        boxHideCard.style.height = height;
      }, 0);

    }
  });
}

// news and tips more

let btnMoreNews = document.querySelector('.js_news_and_tips_box_body_more');
let boxHideNews = document.querySelector('.js_news_and_tips_box_body_hidden');

if (btnMoreNews) {
  btnMoreNews.addEventListener('click', function () {
    if (!boxHideNews.classList.contains('show')) {
      boxHideNews.classList.add('show');
      boxHideNews.style.height = 'auto';
      var height = boxHideNews.clientHeight + 'px';
      boxHideNews.style.height = '0px';

      setTimeout(function () {
        boxHideNews.style.height = height;
      }, 0);

    }
  });
}

// news and tips more too

let btnMoreNewsToo = document.querySelector('.js_news_and_tips_box_body_more_too');
let boxHideNewsToo = document.querySelector('.js_news_and_tips_box_body_hidden_too');

if (btnMoreNewsToo) {
  btnMoreNewsToo.addEventListener('click', function () {
    if (!boxHideNewsToo.classList.contains('show')) {
      boxHideNewsToo.classList.add('show');
      boxHideNewsToo.style.height = 'auto';
      var height = boxHideNewsToo.clientHeight + 'px';
      boxHideNewsToo.style.height = '0px';

      setTimeout(function () {
        boxHideNewsToo.style.height = height;
      }, 0);

    }
  });
}

// news and tips tab
(() => {
  let tabNews = document.querySelectorAll('.news_and_tips_box_tab_item');
  let tabBox = document.querySelectorAll('.news_and_tips_box_body_wrap_tab');
  let hiddenBox = document.querySelectorAll('.news_and_tips_box_body_hidden')

  for (let i = 0; i < tabNews.length; i++) {
    tabNews[i].addEventListener('click', function () {
      hiddenBox.forEach(el => {
        el.classList.remove('show');
        el.style.height = '0px';
      });
      tabNews.forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');
      tabBox.forEach(el => {
        el.classList.remove('active');
      });
      tabBox[i].classList.add('active');
    })
  }

})();

// profile page subscription check
(() => {
  let check = document.querySelector('.js_profile_subscription_checkbox');
  let status = document.querySelectorAll('.js_profile_subscription');

  if (check) {
    check.addEventListener('change', function () {
      if (check.checked) {
        status.forEach(el => {
          el.classList.add('active');
          el.innerHTML = 'Активна';
        });
      } else {
        status.forEach(el => {
          el.classList.remove('active');
          el.innerHTML = 'Не активна';
        });
      }
    });
  }

})();

// comprasion close card
(() => {
  let closeCard = document.querySelectorAll('.comprasion_box_slider_item_top_btn_clear');
  let sliderChar = document.querySelectorAll('.comprasion_characteristics_body_slider_wrapper .comprasion_characteristics_body_item');
  let fullClose = document.querySelectorAll('.comprasion_box_first_clear');

  if (closeCard) {
    for (let i = 0; i < closeCard.length; i++) {
      closeCard[i].addEventListener('click', function () {
        this.closest('.comprasion_box_slider_item').remove();
        sliderChar[i].remove();
      })
    }
  }
  if (fullClose) {
    for (let i = 0; i < fullClose.length; i++) {
      fullClose[i].addEventListener('click', function () {
        for (let i = 0; i < closeCard.length; i++) {
          closeCard[i].closest('.comprasion_box_slider_item').remove();
        }
        for (let z = 0; z < sliderChar.length; z++) {
          sliderChar[z].remove();
        }
      })
    }
  }
})();


// cookies
(() => {
  let btnCatalogTab = document.querySelector('.js_footer_mobile_item_catalog');
  let catalogTab = document.querySelector('.js_pop_catalog_mob');
  let menuBurger = document.querySelector('.burger');
  let burger = document.querySelector('.header_top_burger');
  let boxTab = document.querySelectorAll('.pop_catalog_mob_tooLevel');

  if (catalogTab) {
    btnCatalogTab.addEventListener('click', function () {
      boxTab.forEach(el => {
        el.classList.remove('active');
      });
      catalogTab.classList.toggle('active');
      if (catalogTab.classList.contains('active')) {
        menuBurger.classList.remove('active');
        burger.classList.remove('active')
        document.body.classList.remove('noScroll');
      }
    })

  }

})();

// cookies
(() => {

  let cook = document.querySelector('.js_cookies');
  let btnCook = document.querySelector('.js_cookies_box_btn');

  if (btnCook) {
    btnCook.addEventListener('click', function () {
      cook.classList.add('remove');
    })
  }

})();


// sort menu
(() => {

  let box = document.querySelector('.catalog_headling_head_btn_sort_box');
  let menuItem = document.querySelectorAll('.catalog_headling_head_btn_sort_box_choice span');

  if (box) {
    box.addEventListener('click', function () {
      this.classList.toggle('active');
    })

    for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].addEventListener('click', function () {
        let inp = box.querySelector('input').value = this.innerText;
      })
    }

  }
})();

//touchmove comprasion_filter
(() => {
  let box = document.querySelector('.comprasion_filter');
  let item = document.querySelector('.comprasion_filter_box');
  let elem = document.querySelectorAll('.comprasion_filter_box_item');
  let numElem = null;
  let leftNum = 0;
  let num = 0;
  let arr = [];
  if (box) {

    function difElemWidtch() {
      for (let i = 0; i < elem.length; i++) {
        arr.push(elem[i].offsetWidth);
      }
      numElem = elem.length - 1;
      let boxW = box.offsetWidth;
      let itemW = item.offsetWidth;
      if (boxW == itemW || window.innerWidth < 700) {
        startMove();
      }
    }
    difElemWidtch();
    window.addEventListener('resize', difElemWidtch);

    function goLeft() {
      if (num < numElem) {
        item.style.left = leftNum - arr[num] - 5 + 'px';
        leftNum = leftNum - arr[num];
        num = num + 1;
      }
    }

    function goRight() {
      if (num > 0) {
        item.style.left = leftNum + arr[num - 1] + 5 + 'px';
        leftNum = leftNum + arr[num - 1];
        num = num - 1;
      }
    }

    function startMove() {
      box.addEventListener('touchstart', handleTouchStart, false);
      box.addEventListener('touchmove', handleTouchMove, false);
    }
    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
      const firstTouch = e.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;

    }

    function handleTouchMove(e) {
      if (!x1 || !y1) {
        return false;
      }
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDif = x2 - x1;
      let yDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(yDif)) {
        if (xDif > 0) {
          goRight();
        }
        else {
          goLeft();
        }
      }
      x1 = null;
      y1 = null;
    }


  }

})();


//touchmove profile tab
(() => {
  let box = document.querySelector('.js_profile_box_bar');
  let item = document.querySelector('.js_news_and_tips_box_tab_wrap');
  let elem = document.querySelectorAll('.js_news_and_tips_box_tab_item');
  let numElem = null;
  let leftNum = 0;
  let num = 0;
  let arr = [];
  if (box) {

    function difElemWidtch() {
      for (let i = 0; i < elem.length; i++) {
        arr.push(elem[i].offsetWidth);
      }
      numElem = elem.length - 1;
      let boxW = box.offsetWidth;
      let itemW = item.offsetWidth;
      if (boxW == itemW || window.innerWidth < 700) {
        startMove();
      }
    }
    difElemWidtch();
    window.addEventListener('resize', difElemWidtch);

    function goLeft() {
      if (num < numElem) {
        item.style.left = leftNum - arr[num] + 'px';
        leftNum = leftNum - arr[num];
        num = num + 1;
      }
    }

    function goRight() {
      if (num > 0) {
        item.style.left = leftNum + arr[num - 1] + 'px';
        leftNum = leftNum + arr[num - 1];
        num = num - 1;
      }
    }

    function startMove() {
      box.addEventListener('touchstart', handleTouchStart, false);
      box.addEventListener('touchmove', handleTouchMove, false);
    }
    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
      const firstTouch = e.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;

    }

    function handleTouchMove(e) {
      if (!x1 || !y1) {
        return false;
      }
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDif = x2 - x1;
      let yDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(yDif)) {
        if (xDif > 0) {
          goRight();
        }
        else {
          goLeft();
        }
      }
      x1 = null;
      y1 = null;
    }
  }

})();

//touchmove card
(() => {
  let box = document.querySelector('.js_card_nav_link_box1');
  let arr = [];

  if (box) {
    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);


    function difElemWidtch(paren) {
      arr = [];
      let elem = paren.querySelectorAll('.card_nav_link_item');
      for (let i = 0; i < elem.length; i++) {
        arr.push(elem[i].offsetWidth);
      }
      arr = arr.map(el => {
        return Number(el) + 24;
      });
    }

    function convertNum(num) {
      return num.replace(/[^+\d]/g, '');
    }

    let arrLeft = [];
    function comprasionNum(el) {
      let num = convertNum(el);
      arrLeft = [];
      let sum = 0;
      arr.map(el => {
        sum += el;
        arrLeft.push(sum);
      });
      for (let i = 0; i < arrLeft.length; i++) {
        if (arrLeft[i] == num) {
          return arrLeft[i + 1]
        }
      }
    }


    function goLeft(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.card_nav_link_box_ab');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }

      if (box.offsetWidth < q) {
        if (item.style.left == false || item.style.left == '0px') {
          item.style.left = - arr[0] + 'px';
        } else {
          item.style.left = - comprasionNum(item.style.left) + 'px';
        }
        if (q - paren.offsetWidth - convertNum(item.style.left) < 0) {
          item.style.left = -(q - paren.offsetWidth - 10) + 'px';
        }

      }
    }

    function goRight(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.card_nav_link_box_ab');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }
      console.log(box.offsetWidth)
      console.log(q)
      if (box.offsetWidth < q) {
        console.log('5')
        if (item.style.left != false || item.style.left != '0px') {
          item.style.left = - receivingNum(item.style.left) + 'px';
          console.log('6')
        }
        if (convertNum(item.style.left) < 0) {
          item.style.left = 0 + 'px';
          console.log('7')
        }

      }
    }

    function receivingNum(el) {
      let num = convertNum(el)
      for (var i = arrLeft.length - 1; i >= 0; i--) {
        if (arrLeft[i] < num) {
          return arrLeft[i];
        }
      }
      if (arrLeft[0] == num || arrLeft[0] > num) {
        return 0;
      }
    }



    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
      const firstTouch = e.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;
    }
    let paren;
    function handleTouchMove(e) {
      paren = e.target.closest('.js_buy_click_add')
      console.log('2')
      if (!x1 || !y1) {
        return false;
      }
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDif = x2 - x1;
      let yDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(yDif)) {
        if (xDif > 0) {
          goRight(paren);
          console.log('3')
        }
        else {
          goLeft(paren);
        }
      }
      x1 = null;
      y1 = null;
    }
  }

})();

//touchmove backet sevices
(() => {
  let box = document.querySelectorAll('.js_backet_body_box_add_body_slide_wrap');
  let arr = [];

  if (box) {
    for (let i = 0; i < box.length; i++) {
      box[i].addEventListener('touchstart', handleTouchStart, false);
    }
    for (let i = 0; i < box.length; i++) {
      box[i].addEventListener('touchmove', handleTouchMove, false);
    }

    function difElemWidtch(paren) {
      arr = [];
      let elem = paren.querySelectorAll('.js_backet_cost_paren');
      for (let i = 0; i < elem.length; i++) {
        arr.push(elem[i].offsetWidth);
      }
      arr = arr.map(el => {
        return Number(el) + 10;
      });

    }

    function convertNum(num) {
      return num.replace(/[^+\d]/g, '');
    }

    let arrLeft = [];
    function comprasionNum(el) {
      let num = convertNum(el);
      arrLeft = [];
      let sum = 0;
      arr.map(el => {
        sum += el;
        arrLeft.push(sum);
      });
      for (let i = 0; i < arrLeft.length; i++) {
        if (arrLeft[i] == num) {
          return arrLeft[i + 1]
        }
      }
    }


    function goLeft(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.backet_body_box_add_body_slide');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }

      if (paren.offsetWidth < q) {
        if (item.style.left == false || item.style.left == '0px') {
          item.style.left = - arr[0] + 'px';
        } else {
          item.style.left = - comprasionNum(item.style.left) + 'px';
        }
        if (q - paren.offsetWidth - convertNum(item.style.left) < 0) {
          item.style.left = -(q - paren.offsetWidth - 10) + 'px';
        }

      }
    }

    function goRight(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.backet_body_box_add_body_slide');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }
      if (paren.offsetWidth < q) {
        if (item.style.left != false || item.style.left != '0px') {
          item.style.left = - receivingNum(item.style.left) + 'px';
        }
        if (convertNum(item.style.left) < 0) {
          item.style.left = 0 + 'px';
        }

      }
    }

    function receivingNum(el) {
      let num = convertNum(el)
      for (var i = arrLeft.length - 1; i >= 0; i--) {
        if (arrLeft[i] < num) {
          return arrLeft[i];
        }
      }
      if (arrLeft[0] == num || arrLeft[0] > num) {
        return 0;
      }
    }



    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
      const firstTouch = e.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;

    }
    let paren;
    function handleTouchMove(e) {
      paren = e.target.closest('.js_backet_body_box_add_body_slide_wrap')

      if (!x1 || !y1) {
        return false;
      }
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDif = x2 - x1;
      let yDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(yDif)) {
        if (xDif > 0) {
          goRight(paren);
        }
        else {
          goLeft(paren);
        }
      }
      x1 = null;
      y1 = null;
    }
  }

})();

//pop up backet acc
(() => {
  let item = document.querySelectorAll('.js_backet_body_box_add_body_accessories_tag_item');
  let popAcc = document.querySelector('.js_pop_acc');
  let close = document.querySelector('.js_pop_acc_close');
  let btn = document.querySelectorAll('.catalog_box_cont_card_discrib_btn_box_backet.acc');

  if (item) {
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('click', function (e) {
        if (window.innerWidth > 900) {
          e.preventDefault();
          e.stopPropagation();
          popAcc.classList.add('active');
        } else {
        }
      })
    }
  }
  if (close) {
    close.addEventListener('click', function () {
      popAcc.classList.remove('active');
    })
  }
  window.addEventListener('resize', buttonReplace);

  function buttonReplace() {
    if (window.innerWidth < 550) {
      btn.forEach(el => {
        el.innerHTML = '';
      });
    }
  }

  buttonReplace();

})();


//touchmove backet acc
(() => {
  let box = document.querySelectorAll('.js_backet_body_box_add_body_accessories_tag_wrap');
  let head = document.querySelectorAll('.js_backet_body_box_add_head')
  let arr = [];

  if (head) {
    for (let i = 0; i < head.length; i++) {
      head[i].addEventListener('click', function () {
        let paren = head[i].closest('.backet_body_box_add');
        let body = paren.querySelector('.backet_body_box_add_body');
        paren.classList.toggle('open');
        body.classList.toggle('active');
      })
    }
  }

  if (box) {

    for (let i = 0; i < box.length; i++) {
      box[i].addEventListener('touchstart', handleTouchStart, false);
    }

    for (let i = 0; i < box.length; i++) {
      box[i].addEventListener('touchmove', handleTouchMove, false);
    }

    function difElemWidtch(paren) {
      arr = [];
      let elem = paren.querySelectorAll('.js_backet_body_box_add_body_accessories_tag_item');
      for (let i = 0; i < elem.length; i++) {
        arr.push(elem[i].offsetWidth);
      }
      arr = arr.map(el => {
        return Number(el) + 8;
      });

    }

    function convertNum(num) {
      return num.replace(/[^+\d]/g, '');
    }

    let arrLeft = [];
    function comprasionNum(el) {
      let num = convertNum(el);
      arrLeft = [];
      let sum = 0;
      arr.map(el => {
        sum += el;
        arrLeft.push(sum);
      });
      for (let i = 0; i < arrLeft.length; i++) {
        if (arrLeft[i] == num) {
          return arrLeft[i + 1]
        }
      }
    }


    function goLeft(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.js_backet_body_box_add_body_accessories_tag');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }

      if (paren.offsetWidth < q) {
        if (item.style.left == false || item.style.left == '0px') {
          item.style.left = - arr[0] + 'px';
        } else {
          item.style.left = - comprasionNum(item.style.left) + 'px';
        }
        if (q - paren.offsetWidth - convertNum(item.style.left) < 0) {
          item.style.left = -(q - paren.offsetWidth - 8) + 'px';
        }

      }
    }

    function goRight(paren) {
      difElemWidtch(paren);
      let item = paren.querySelector('.js_backet_body_box_add_body_accessories_tag');
      let q = 0;
      for (let i = 0; i < arr.length; i++) {
        q = q + arr[i];
      }
      if (paren.offsetWidth < q) {
        if (item.style.left != false || item.style.left != '0px') {
          item.style.left = - receivingNum(item.style.left) + 'px';
        }
        if (convertNum(item.style.left) < 0) {
          item.style.left = 0 + 'px';
        }

      }
    }

    function receivingNum(el) {
      let num = convertNum(el)
      for (var i = arrLeft.length - 1; i >= 0; i--) {
        if (arrLeft[i] < num) {
          return arrLeft[i];
        }
      }
      if (arrLeft[0] == num || arrLeft[0] > num) {
        return 0;
      }
    }



    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
      const firstTouch = e.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;

    }
    let paren;
    function handleTouchMove(e) {
      paren = e.target.closest('.js_backet_body_box_add_body_accessories_tag_wrap')

      if (!x1 || !y1) {
        return false;
      }
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDif = x2 - x1;
      let yDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(yDif)) {
        if (xDif > 0) {
          goRight(paren);
        }
        else {
          goLeft(paren);
        }
      }
      x1 = null;
      y1 = null;
    }
  }

})();

// burger active
(() => {

  let burger = document.querySelector('.header_top_burger');
  let catalogTab = document.querySelector('.js_pop_catalog_mob');
  let menuBurger = document.querySelector('.burger');
  let searchHeader = document.querySelector('.header_top_search');
  let searhHeaderMobile = document.querySelector('.js_header_top_search_mobile');

  if (burger) {
    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      searchHeader.classList.toggle('fixed');
      menuBurger.classList.toggle('active');
      searhHeaderMobile.classList.toggle('remove');
      if (this.classList.contains('active')) {
        catalogTab.classList.remove('active');
        document.body.classList.add('noScroll');
      } else {
        document.body.classList.remove('noScroll');
      }
    })
  }

  let box = document.querySelector('div.burger_box_right_item');
  let item = document.querySelector('.burger_box_right_item_hidden');

  if (box) {
    box.addEventListener('click', function () {
      this.classList.toggle('active');
      item.classList.toggle('active');
    })
  }

})();

// fixed menu active
(() => {

  let userFix = document.querySelector('.footer_mobile_item.user');
  let menuFix = document.querySelector('.fixed_menu_mobail');
  let closeFix = document.querySelector('.fixed_menu_mobail_header_close');
  let notific = document.querySelector('div.fixed_menu_mobail_box_item');
  let notificBack = document.querySelector('.fixed_menu_mobail_notification_back');
  let notificBox = document.querySelector('.container.level_too');

  if (userFix) {
    userFix.addEventListener('click', function () {
      menuFix.classList.add('active');
      document.body.classList.add('noScroll');
    });
  }
  if (closeFix) {
    closeFix.addEventListener('click', function () {
      menuFix.classList.remove('active');
      document.body.classList.remove('noScroll');
    })
  }
  if (notific) {
    notific.addEventListener('click', function () {
      notificBox.classList.add('active');
    })
  }
  if (notificBack) {
    notificBack.addEventListener('click', function () {
      notificBox.classList.remove('active');
    })
  }

})();

// button contact
(() => {

  let but = document.querySelectorAll('.js_header_bottom_button');
  let popContact = document.querySelector('.js_pop_contact');
  let closeContact = document.querySelector('.js_pop_close');

  if (but) {
    for (let i = 0; i < but.length; i++) {
      but[i].addEventListener('click', function () {
        popContact.classList.add('active');
        document.body.classList.add('noScroll');
      })
    }
  }
  if (closeContact) {
    closeContact.addEventListener('click', function () {
      popContact.classList.remove('active');
      document.body.classList.remove('noScroll');
    })
  }

})();


// button search mobile pop
(() => {

  let searchPop = document.querySelector('.js_pop_search');
  let searchButton = document.querySelector('.js_header_top_search_mobile');
  let searchBack = document.querySelector('.js_pop_search_header_back');

  if (searchButton) {
    searchButton.addEventListener('click', function () {
      searchPop.classList.add('active');
      document.body.classList.add('noScroll');
    })


    searchBack.addEventListener('click', function () {
      searchPop.classList.remove('active');
      document.body.classList.remove('noScroll');
    })
  }
})();

// button contact
(() => {

  let but = document.querySelector('.js_support_repair_box_link');
  let popSupport = document.querySelector('.js_support');
  let closeSupport = document.querySelector('.js_pop_support_close');

  if (but) {
    but.addEventListener('click', function () {
      popSupport.classList.add('active');
      document.body.classList.add('noScroll');
    })
  }

  if (closeSupport) {
    closeSupport.addEventListener('click', function () {
      popSupport.classList.remove('active');
      document.body.classList.remove('noScroll');
    })
  }
})();

// repair one

let textareaUser = document.querySelector('#repair_textarea_too');
let serialNumberUser = document.querySelector('#repair_too_Serialnumber');
let dataBuyUser = document.querySelector('#datepicker');
let fielUser = document.querySelector('.js_repair_file_transfer_box');
let fielInputUser = document.querySelector('#repair_too_file');
let numberProduct = document.querySelector('#repair_one_number');


let textareaUserValue = null;
let serialNumberUserValue = null;
let dataBuyUserValue = null;
let fielUserValue = null;
let fielInputUserValue = null;
let numberProductValue = null;
(() => {

  let btnOne = document.querySelector('.js_repair_one_btn');
  let repairOne = document.querySelector('.js_repair_one');
  let repairToo = document.querySelector('.js_repair_too');
  let repairThree = document.querySelector('.js_repair_three');
  let btnToo = document.querySelector('.js_repair_too_btn');



  if (btnOne) {
    btnOne.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      numberProductValue = numberProduct.value;
      if (numberProductValue !== '') {
        repairOne.classList.remove('active');
        repairToo.classList.add('active');
      }
    })
  }
  if (btnToo) {
    btnToo.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      textareaUserValue = textareaUser.value;
      serialNumberUserValue = serialNumberUser.value;
      dataBuyUserValue = dataBuyUser.value;
      fielInputUserValue = fielInputUser.cloneNode(true);


      if (fielUser.innerHTML !== 'Просто перенесите файл в эту область или нажмите сюда, чтобы добавить фото или видео') {
        fielUserValue = fielUser.innerHTML;
      } else {
        fielUserValue = null;
      }

      if (serialNumberUserValue !== '' && dataBuyUserValue !== '') {
        repairToo.classList.remove('active');
        repairThree.classList.add('active');
      }
    })
  }


})();

// repair too drop files
(() => {

  let boxDrop = document.querySelector('.js_repair_file_transfer');
  let fileLabelText = document.querySelector('.js_repair_file_transfer_box');
  let inpAddFile = document.querySelector('#repair_too_file');
  let droppedFiles;

  if (boxDrop) {
    boxDrop.addEventListener('dragover', fileHover);
    boxDrop.addEventListener('dragenter', fileHover);
    boxDrop.addEventListener('dragleave', fileHoverEnd);
    boxDrop.addEventListener('drop', addFiles);
    inpAddFile.addEventListener('change', addClasicFiles);

    function overrideDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function fileHover(e) {
      overrideDefault(e);
      boxDrop.classList.add('active');
    }

    function fileHoverEnd(e) {
      overrideDefault(e);
      boxDrop.classList.remove('active');
    }
    function addClasicFiles(e) {
      droppedFiles = e.target.files;
      showFiles(droppedFiles);
    }

    function addFiles(e) {
      fileHoverEnd(e);
      droppedFiles = e.dataTransfer.files;
      showFiles(droppedFiles);
    }

    function showFiles(files) {
      if (files.length > 1) {
        fileLabelText.innerText = files.length + ' ' + 'файла загружено';
      } else {
        fileLabelText.innerText = files[0].name;
      }
    }
  }

})();

// support too drop files2
(() => {

  let boxDrop = document.querySelector('.js_support_cooperation_box_fiel2');
  let fileLabelText = document.querySelector('.js_support_complaint_box_fiel2');
  let inpAddFile = document.querySelector('#support_complaint_box_fiel');
  let droppedFiles;

  if (boxDrop) {
    boxDrop.addEventListener('dragover', fileHover);
    boxDrop.addEventListener('dragenter', fileHover);
    boxDrop.addEventListener('dragleave', fileHoverEnd);
    boxDrop.addEventListener('drop', addFiles);
    inpAddFile.addEventListener('change', addClasicFiles);

    function overrideDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function fileHover(e) {
      overrideDefault(e);
      boxDrop.classList.add('active');
    }

    function fileHoverEnd(e) {
      overrideDefault(e);
      boxDrop.classList.remove('active');
    }
    function addClasicFiles(e) {
      droppedFiles = e.target.files;
      showFiles(droppedFiles);
    }

    function addFiles(e) {
      fileHoverEnd(e);
      droppedFiles = e.dataTransfer.files;
      showFiles(droppedFiles);
    }

    function showFiles(files) {
      if (files.length > 1) {
        fileLabelText.innerText = files.length + ' ' + 'файла загружено';
      } else {
        fileLabelText.innerText = files[0].name;
      }
    }
  }

})();

// support too drop files1
(() => {

  let boxDrop = document.querySelector('.js_support_cooperation_box_fiel1');
  let fileLabelText = document.querySelector('.js_support_complaint_box_fiel1');
  let inpAddFile = document.querySelector('#support_cooperation_box_fiel');
  let droppedFiles;

  if (boxDrop) {
    boxDrop.addEventListener('dragover', fileHover);
    boxDrop.addEventListener('dragenter', fileHover);
    boxDrop.addEventListener('dragleave', fileHoverEnd);
    boxDrop.addEventListener('drop', addFiles);
    inpAddFile.addEventListener('change', addClasicFiles);

    function overrideDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function fileHover(e) {
      overrideDefault(e);
      boxDrop.classList.add('active');
    }

    function fileHoverEnd(e) {
      overrideDefault(e);
      boxDrop.classList.remove('active');
    }
    function addClasicFiles(e) {
      droppedFiles = e.target.files;
      showFiles(droppedFiles);
    }

    function addFiles(e) {
      fileHoverEnd(e);
      droppedFiles = e.dataTransfer.files;
      showFiles(droppedFiles);
    }

    function showFiles(files) {
      if (files.length > 1) {
        fileLabelText.innerText = files.length + ' ' + 'файла загружено';
      } else {
        fileLabelText.innerText = files[0].name;
      }
    }
  }

})();





// profile edit block my data
(() => {
  let btn = document.querySelector('.js_profile_head_body_tittle_edit');
  let blockEdit = document.querySelector('.js_profile_block_edit');
  let blockStart = document.querySelector('.js_profile_block');
  let btnBack = document.querySelector('.js_profile_block_edit_head_left_back');

  if (btn) {
    btn.addEventListener('click', function () {
      blockEdit.classList.add('active');
      blockStart.classList.add('remove');
    })
  }

  if (btnBack) {
    btnBack.addEventListener('click', function () {
      blockEdit.classList.remove('active');
      blockStart.classList.remove('remove');
    })
  }


})();


// ordering delivery active note
(() => {
  let radioAddress = document.querySelectorAll('.ordering_body_box_item_elem_address input');

  if (radioAddress) {
    for (let i = 0; i < radioAddress.length; i++) {
      radioAddress[i].addEventListener('click', function () {
        document.querySelectorAll('.ordering_body_box_item_elem_address').forEach(el => {
          el.classList.remove('active');
        });
        this.closest('.ordering_body_box_item_elem_address').classList.add('active');

      })
    }
  }

})();

// ordering checckbox active note
(() => {
  let checkes = document.querySelectorAll('.ordering_body_box_item_elem_checkbox input');

  if (checkes) {
    for (let i = 0; i < checkes.length; i++) {
      checkes[i].addEventListener('click', function () {
        if (this.checked) {
          this.closest('.ordering_body_box_item_elem_checkbox').classList.add('active');
        } else {
          this.closest('.ordering_body_box_item_elem_checkbox').classList.remove('active');
        }

      })
    }
  }

})();

// profile add new address
(() => {
  let btn = document.querySelector('.js_profile_address_head_edit');
  let popAddAddress = document.querySelector('.js_pop_add_address');
  let close = document.querySelector('.js_pop_add_address_close');

  if (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth > 744) {
        e.preventDefault();
        e.stopPropagation();
        popAddAddress.classList.add('active');
      } else {
        return;
      }
    })
  }

  if (close) {
    close.addEventListener('click', function () {
      popAddAddress.classList.remove('active');
    })
  }


})();

// profile edit address
(() => {
  let btn = document.querySelectorAll('.js_profile_address_body_box_edit');
  let popEditAddress = document.querySelector('.js_pop_edit_address');
  let close = document.querySelector('.js_pop_edit_address_close');

  if (btn) {
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function (e) {
        if (window.innerWidth > 744) {
          e.preventDefault();
          e.stopPropagation();
          popEditAddress.classList.add('active');
        }
      })
    }
  }

  if (close) {
    close.addEventListener('click', function () {
      popEditAddress.classList.remove('active');
    })
  }

})();

// profile delete address
(() => {
  let btn = document.querySelectorAll('.js_profile_address_body_box_delete');


  if (btn) {
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function () {
        this.closest('.profile_address_body').remove();
      })
    }
  }



})();

// select service center
(() => {
  let selectInp = document.querySelector('.js_service_center_form');
  let selectInpIcon = document.querySelector('.js_service_center_search_btn');
  let select = document.querySelector('.js_service_center_select');
  let selectSpan = document.querySelectorAll('.js_service_center_select span');

  if (selectInp) {
    selectInp.addEventListener('click', function () {
      console.log('1');
      select.classList.toggle('active');
      selectInpIcon.classList.toggle('active');
    })
  }

  if (selectSpan) {
    for (let i = 0; i < selectSpan.length; i++) {
      selectSpan[i].addEventListener('click', function () {
        console.log('2');
        selectInp.querySelector('input').value = this.innerHTML;
        select.classList.remove('active');
        selectInpIcon.classList.remove('active');
      })
    }
  }

})();

// select installation
(() => {
  let selectInp = document.querySelectorAll('.js_installation_box_left_select_inp');
  let elemSpan = document.querySelectorAll('.js_installation_box_left_select_hidden span')

  if (selectInp) {
    for (let i = 0; i < selectInp.length; i++) {
      selectInp[i].addEventListener('click', function () {
        let el = this.nextElementSibling;
        el.classList.toggle('active');
        this.classList.toggle('active');
      })
    }
  }

  if (elemSpan) {
    for (let i = 0; i < elemSpan.length; i++) {
      elemSpan[i].addEventListener('click', function () {
        let par = this.closest('.js_installation_box_left_select_hidden');
        let progen = par.previousElementSibling;
        par.classList.remove('active');
        progen.classList.remove('active');
        progen.querySelector('input').value = this.innerHTML;
      })
    }
  }



})();


// buy one click 
(() => {

  let buyClick = document.querySelectorAll('.js_buy_click');
  let popBuy = document.querySelector('.js_pop_buy');
  let closeBuy = document.querySelector('.js_pop_buy_close');
  let dataName = document.querySelector('.pop_buy_product_subscription span');
  let dataPrice = document.querySelector('.pop_buy_product_subscription p');
  let dataId = document.querySelector('.pop_buy_product_subscription i');
  let dataSrc = document.querySelector('.pop_buy_product_img img');

  if (buyClick) {
    for (let i = 0; i < buyClick.length; i++) {
      buyClick[i].addEventListener('click', function () {
        dataName.innerText = this.dataset.name;
        dataPrice.innerText = this.dataset.price;
        dataId.innerText = this.dataset.id;
        dataSrc.src = this.dataset.src;
        popBuy.classList.add('active');
        document.body.classList.add('noScroll');
      })
    }
  }
  if (closeBuy) {
    closeBuy.addEventListener('click', function () {
      popBuy.classList.remove('active');
      document.body.classList.remove('noScroll');
    })
  }

})();

// backet click
(() => {

  let backetClick = document.querySelectorAll('.js_backet_click');
  let popBacket = document.querySelector('.js_pop_backet');
  let closeBacket = document.querySelector('.js_pop_backet_close');
  let dataName = document.querySelector('.pop_backet_box_subscription p');
  let dataPrice = document.querySelector('.pop_backet_box_subscription_price_num');
  let dataId = document.querySelector('.pop_backet_box_subscription_price i');
  let dataSrc = document.querySelector('.pop_backet_box_img img');
  let parent = document.querySelector('.header_bottom_basket');
  let calcNum = document.querySelector('.js_num');
  let calcPlus = document.querySelector('.js_plus');
  let calcMinus = document.querySelector('.js_minus');
  let calcSum = document.querySelector('.js_pop_backet_box_subscription_price_num');
  let parentCompl;
  let num = null;
  let flag = false;

  if (backetClick) {
    for (let i = 0; i < backetClick.length; i++) {
      backetClick[i].addEventListener('click', function () {
        calcNum.innerHTML = '1';
        dataName.innerText = this.dataset.name;
        dataPrice.innerText = this.dataset.price;
        num = this.dataset.price;
        dataId.innerText = this.dataset.id;
        let leftP = parent.getBoundingClientRect().left;
        let widthP = parent.offsetWidth;
        dataSrc.src = this.dataset.src;
        document.querySelector('.pop_backet_box').style.left = leftP - widthP + 'px';
        if (document.querySelector('.js_fixed_header').classList.contains('fixed')) {
          popBacket.classList.add('mobile');

        } else {
          popBacket.classList.remove('mobile');
        }
        popBacket.classList.add('active');
        if (document.querySelector('.js_buy_click_add')) {
          document.querySelector('.js_buy_click_add').classList.add('complited');

        }
        this.closest('.js_backet_parent').classList.add('complited');
        parentCompl = this.closest('.js_backet_parent');
        this.nextElementSibling.classList.add('active');
        document.body.classList.add('noScroll');
        setTimeout(timePopBacket, 2500);
      })
    }
  }
  if (closeBacket) {
    closeBacket.addEventListener('click', function () {
      popBacket.classList.remove('mobile');
      popBacket.classList.remove('active');
      document.body.classList.remove('noScroll');
      flag = false;
    })
  }
  function timePopBacket() {
    if (flag == false) {
      popBacket.classList.remove('active');
      document.body.classList.remove('noScroll');
    }
  }

  if (calcNum) {
    calcPlus.addEventListener('click', function () {
      flag = true;
      calcNum.innerHTML = Number(calcNum.innerHTML) + 1;
      parentCompl.querySelector('.js_complited_num').innerHTML = calcNum.innerHTML;
      let arr = [];
      arr.push(num);
      let nospace_arr = [];
      nospace_arr = arr.map(function (item) {
        return item.replace(/\s+/g, '');
      })
      let str = nospace_arr[0].slice(0, -1);
      str = Number(str) * Number(calcNum.innerHTML);
      //console.log(str);
      str = new Intl.NumberFormat('ru-RU').format(str);
      str = str + ' ' + '₽';
      calcSum.innerHTML = str;
      str = null;
    });
    calcMinus.addEventListener('click', function () {
      flag = true;
      calcNum.innerHTML = Number(calcNum.innerHTML) - 1;
      parentCompl.querySelector('.js_complited_num').innerHTML = calcNum.innerHTML;
      if (Number(calcNum.innerHTML) < 1) {
        calcNum.innerHTML = 1;
      }
      let arr = [];
      arr.push(num);
      let nospace_arr = [];
      nospace_arr = arr.map(function (item) {
        return item.replace(/\s+/g, '');
      })
      let str = nospace_arr[0].slice(0, -1);
      str = Number(str) * Number(calcNum.innerHTML);
      //console.log(str);
      str = new Intl.NumberFormat('ru-RU').format(str);
      str = str + ' ' + '₽';
      calcSum.innerHTML = str;
      str = null;
    })


  }

})();


//calc complited
(() => {
  let cmplitedMinus = document.querySelectorAll('.js_complited_minus');
  let cmplitedPlus = document.querySelectorAll('.js_complited_plus');
  let cmplitedNum = document.querySelectorAll('.js_complited_num');

  for (let i = 0; i < cmplitedMinus.length; i++) {
    cmplitedMinus[i].addEventListener('click', function () {
      cmplitedNum[i].innerHTML = Number(cmplitedNum[i].innerHTML) - 1;
      if (Number(cmplitedNum[i].innerHTML) < 1) {
        cmplitedNum[i].innerHTML = 1;
      }
    })
  }

  for (let i = 0; i < cmplitedPlus.length; i++) {
    cmplitedPlus[i].addEventListener('click', function () {
      cmplitedNum[i].innerHTML = Number(cmplitedNum[i].innerHTML) + 1;
    })
  }

})();


// subscription 
(() => {
  let inpSubmit = document.querySelector('.subscription_input_submit');
  let inpCheck = document.querySelector('#check_subscription_input');
  let inpError = document.querySelector('#error_subscription');

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
      //  email
      let inpEmail = this.previousElementSibling.querySelector('input');
      let em = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
      let valEmail = inpEmail.value;
      let validE = em.test(valEmail);
      let paren = this.previousElementSibling;

      if (validE && inpCheck.checked) {
        e.preventDefault();
        e.stopPropagation();
        paren.classList.remove('error');
        inpError.classList.remove('active');
        inpError.innerText = '';
        document.querySelector('.js_pop_subscription').classList.add('active');
        setTimeout(closePopSubscription, 2500);
        inpCheck.checked = false;
        inpEmail.value = '';
        document.querySelector('.subscription_input_box span').classList.remove('remove');
        // сюда пишем функцию запуска ajax  пример functionAjax();
      } else {
        e.preventDefault();
        e.stopPropagation();
        paren.classList.add('error');
        inpError.classList.add('active');
        inpError.innerText = 'Заполните поле email и поставьте согласие на обработку персональных данных!'
        return;
      }

    })
  }

  let closeSubPop = document.querySelector('.js_pop_close_subscription');

  if (closeSubPop) {
    closeSubPop.addEventListener('click', closePopSubscription);
  }

  function closePopSubscription() {
    document.querySelector('.js_pop_subscription').classList.remove('active');
  }

})();

// subscription 
(() => {
  let inp = document.querySelector('.subscription_input_box input')

  if (inp) {
    inp.addEventListener('blur', function () {
      if (inp.value == '') {
        inp.closest('.subscription_input_box').querySelector('span').classList.remove('remove');
      } else {
        inp.closest('.subscription_input_box').querySelector('span').classList.add('remove');
      }
    })
  }


})();


(() => {
  let inpName = document.querySelector('.js_pop_contact_name');
  let inpPhone = document.querySelector('.js_pop_contact_tel');
  let inpSubmit = document.querySelector('.js_pop_contact_submit');
  let inpError = document.querySelector('.js_pop_contact_error');
  let inpCheck = document.querySelector('#check_subscription_input_pop');

  let outputName = '';
  let outputPhone = '';
  let outputCheck = '';
  let flagPhone = false;
  let flagName = false;
  let flagCheck = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
      if (inpName.value.length > 3) {
        flagName = true;
      }
      else {
        outputName = 'Недостаточное кол-во символов в поле имя!';
        flagName = false;
      }

      let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
      let valPhone = inpPhone.value;
      let valid = re.test(valPhone);
      if (valid) {
        flagPhone = true;
      }
      else {
        outputPhone = 'Номер телефона введен неправильно!';
        flagPhone = false;
      }
      if (inpCheck.checked) {
        flagCheck = true;
      } else {
        outputCheck = 'Необходимо согласие на обработку персональных данных!';
        flagCheck = false;
      }

      inpError.innerHTML = outputName + ' ' + outputPhone + ' ' + outputCheck;
      inpError.classList.add('active');

      if (flagName && flagPhone && flagCheck) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.js_pop_contact').classList.remove('active');
        // сюда пишем функцию запуска ajax  пример functionAjax();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return;
      }


    })
  }
})();

(() => {
  let inpName = document.querySelector('.js_complaint_name');
  let inpPhone = document.querySelector('.js_complaint_tel');
  let inpSubmit = document.querySelector('.js_complaint_submit');
  let inpSurname = document.querySelector('.js_complaint_surname')
  let inpError = document.querySelector('.js_complaint_error')
  let inpEmail = document.querySelector('.js_complaint_email')

  let outputName = '';
  let outputPhone = '';
  let outputSurname = '';
  let outputEmail = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagEmail = false;
  let flagName = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function () {
      if (inpName) {
        //  name 
        if (inpName.value.length > 3) {
          flagName = true;
          outputName = '';
        }
        else {
          outputName = 'Недостаточное кол-во символов в поле Имя!';
          flagName = false;
        }
        //  surname
        if (inpSurname.value.length > 3) {
          flagName = true;
          outputSurname = '';
        }
        else {
          outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
          flagName = false;
        }
        //  email
        let em = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
        let valEmail = inpEmail.value;
        let validE = em.test(valEmail);
        if (validE) {
          flageMAIL = true;
          outputEmail = '';
        }
        else {
          outputEmail = 'E-mail введен неправильно!';
          flagEmail = false;
        }
        //  tel
        let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        let valPhone = inpPhone.value;
        let valid = re.test(valPhone);
        if (valid) {
          flagPhone = true;
          outputPhone = '';
        }
        else {
          outputPhone = 'Номер телефона введен неправильно!';
          flagPhone = false;
        }

        inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputEmail + ' ' + outputPhone;
        inpError.classList.add('active');

        if (flagName && flagSurname && flagEmail && flagPhone) {
          // сюда пишем функцию запуска ajax  пример functionAjax();
        }

      }
    })
  }
})();

(() => {
  let inpCity = document.querySelector('#js_pop_add_address_box_flex_index');
  let inpHome = document.querySelector('#js_pop_add_address_box_flex_home');
  let inpSubmit = document.querySelector('.js_pop_add_address_box_submit');
  let inpIndex = document.querySelector('#js_pop_add_address_box_flex_index');
  let inpStreet = document.querySelector('#js_pop_add_address_box_flex_street')
  let inpError = document.querySelector('#js_pop_add_address_box_flex_error');

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {

      let outputCity = '';
      let outputHome = '';
      let outputIndex = '';
      let outputStreet = '';
      let flagHome = false;
      let flagCity = false;
      let flagIndex = false;
      let flagStreet = false;

      if (inpCity.value.length > 3) {
        flagCity = true;
      }
      else {
        outputCity = 'Недостаточное кол-во символов в поле город!';
        flagCity = false;
      }

      if (inpHome.value.length > 3) {
        flagHome = true;
      }
      else {
        outputHome = 'Недостаточное кол-во символов в поле Дом, корпус, строение!';
        flagHome = false;
      }

      if (inpStreet.value.length > 3) {
        flagStreet = true;
      }
      else {
        outputStreet = 'Недостаточное кол-во символов в поле Дом, корпус, строение!';
        flagStreet = false;
      }

      if (inpIndex.value.length == 6) {
        flagIndex = true;
      }
      else {
        outputIndex = 'Кол-во цифр в поле Индекс должно быть 6-ть!';
        flagIndex = false;
      }




      inpError.innerHTML = outputHome + ' ' + outputStreet + ' ' + outputCity + ' ' + outputIndex;
      //inpError.classList.add('active');

      if (flagHome && flagCity && flagIndex && flagStreet) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.js_pop_add_address').classList.remove('active');
        // сюда пишем функцию запуска ajax  пример functionAjax();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return;
      }


    })
  }
})();


// ordering form
(() => {
  let inpName = document.querySelector('#ordering_name');
  let inpPhone = document.querySelector('#ordering_phone');
  let inpSubmit = document.querySelector('#ordering_submit');
  let inpSurname = document.querySelector('#ordering_surname')
  let inpError = document.querySelector('#ordering_error');
  let inpCheck = document.querySelector('#ordering_check_perso')


  let outputName = '';
  let outputPhone = '';
  let outputSurname = '';
  let outputCheck = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagCheck = false;
  let flagName = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
      if (inpName) {
        //  name 
        if (inpName.value.length > 3) {
          flagName = true;
          outputName = '';
        }
        else {
          outputName = 'Недостаточное кол-во символов в поле Имя!';
          flagName = false;
        }
        //  surname
        if (inpSurname.value.length > 3) {
          flagName = true;
          outputSurname = '';
        }
        else {
          outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
          flagName = false;
        }
        //  tel
        let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        let valPhone = inpPhone.value;
        let valid = re.test(valPhone);
        if (valid) {
          flagPhone = true;
          outputPhone = '';
        }
        else {
          outputPhone = 'Номер телефона введен неправильно!';
          flagPhone = false;
        }

        //  check
        if (inpCheck.checked) {
          flagCheck = true;
          outputCheck = '';
        }
        else {
          outputCheck = 'Необходимо согласие на обработку пер. данных!';
          flagCheck = false;
        }

        inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputCheck + ' ' + outputPhone;
        inpError.classList.add('active');

        if (flagName && flagSurname && flagPhone && flagCheck) {
          e.preventDefault();
          e.stopPropagation();
          // сюда пишем функцию запуска ajax  пример functionAjax();
        } else {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

      }
    })
  }
})();

(() => {
  let inpName = document.querySelector('.js_cooperation_name');
  let inpPhone = document.querySelector('.js_cooperation_tel');
  let inpSubmit = document.querySelector('.js_cooperation_submit');
  let inpSurname = document.querySelector('.js_cooperation_surname')
  let inpError = document.querySelector('.js_cooperation_error')
  let inpEmail = document.querySelector('.js_cooperation_email')

  let outputName = '';
  let outputPhone = '';
  let outputSurname = '';
  let outputEmail = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagEmail = false;
  let flagName = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function () {
      if (inpName) {
        //  name 
        if (inpName.value.length > 3) {
          flagName = true;
          outputName = '';
        }
        else {
          outputName = 'Недостаточное кол-во символов в поле Имя!';
          flagName = false;
        }
        //  surname
        if (inpSurname.value.length > 3) {
          flagName = true;
          outputSurname = '';
        }
        else {
          outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
          flagName = false;
        }
        //  email
        let em = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
        let valEmail = inpEmail.value;
        let validE = em.test(valEmail);
        if (validE) {
          flageMAIL = true;
          outputEmail = '';
        }
        else {
          outputEmail = 'E-mail введен неправильно!';
          flagEmail = false;
        }
        //  tel
        let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        let valPhone = inpPhone.value;
        let valid = re.test(valPhone);
        if (valid) {
          flagPhone = true;
          outputPhone = '';
        }
        else {
          outputPhone = 'Номер телефона введен неправильно!';
          flagPhone = false;
        }

        inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputEmail + ' ' + outputPhone;
        inpError.classList.add('active');

        if (flagName && flagSurname && flagEmail && flagPhone) {
          // сюда пишем функцию запуска ajax  пример functionAjax();
        }

      }
    })
  }
})();

(() => {
  let inpName = document.querySelector('.js_consultation_name');
  let inpPhone = document.querySelector('.js_consultation_tel');
  let inpSubmit = document.querySelector('.js_consultation_submit');
  let inpSurname = document.querySelector('.js_consultation_surname')
  let inpError = document.querySelector('.js_consultation_error')
  let inpEmail = document.querySelector('.js_consultation_email')

  let outputName = '';
  let outputPhone = '';
  let outputSurname = '';
  let outputEmail = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagEmail = false;
  let flagName = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function () {
      if (inpName) {
        //  name 
        if (inpName.value.length > 3) {
          flagName = true;
          outputName = '';
        }
        else {
          outputName = 'Недостаточное кол-во символов в поле Имя!';
          flagName = false;
        }
        //  surname
        if (inpSurname.value.length > 3) {
          flagName = true;
          outputSurname = '';
        }
        else {
          outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
          flagName = false;
        }
        //  email
        let em = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
        let valEmail = inpEmail.value;
        let validE = em.test(valEmail);
        if (validE) {
          flageMAIL = true;
          outputEmail = '';
        }
        else {
          outputEmail = 'E-mail введен неправильно!';
          flagEmail = false;
        }
        //  tel
        let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        let valPhone = inpPhone.value;
        let valid = re.test(valPhone);
        if (valid) {
          flagPhone = true;
          outputPhone = '';
        }
        else {
          outputPhone = 'Номер телефона введен неправильно!';
          flagPhone = false;
        }

        inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputEmail + ' ' + outputPhone;
        inpError.classList.add('active');

        if (flagName && flagSurname && flagEmail && flagPhone) {
          // сюда пишем функцию запуска ajax  пример functionAjax();
        }

      }
    })
  }
})();


(() => {
  let inpName = document.querySelector('.js_pop_buy_name');
  let inpPhone = document.querySelector('.js_pop_buy_tel');
  let inpSubmit = document.querySelector('.js_pop_buy_submit');
  let inpError = document.querySelector('.js_pop_buy_error')

  let outputName = '';
  let outputPhone = '';
  let flagPhone = false;
  let flagName = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function () {
      if (inpName) {
        if (inpName.value.length > 3) {
          flagName = true;
        }
        else {
          outputName = 'Недостаточное кол-во символов в поле имя!';
          flagName = false;
        }

        let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        let valPhone = inpPhone.value;
        let valid = re.test(valPhone);
        if (valid) {
          flagPhone = true;
        }
        else {
          outputPhone = 'Номер телефона введен неправильно!';
          flagPhone = false;
        }

        inpError.innerHTML = outputName + ' ' + outputPhone;
        inpError.classList.add('active');

        if (flagName && flagPhone) {
          // сюда пишем функцию запуска ajax  пример functionAjax();
        }

      }
    })
  }
})();


//checked form repair three
(() => {
  let inpName = document.querySelector('#repair_three_name');
  let inpPhone = document.querySelector('#repair_three_tel');
  let inpSubmit = document.querySelector('.js_repair_three_btn');
  let inpSurname = document.querySelector('#repair_three_surname');
  let inpError = document.querySelector('#repair_three_error');
  let inpEmail = document.querySelector('#repair_three_email');
  let inpAddress = document.querySelector('#repair_three_address');
  let repairFoo = document.querySelector('.js_repair_foo');
  let repairThree = document.querySelector('.js_repair_three');

  let outputName = '';
  let outputPhone = '';
  let outputSurname = '';
  let outputEmail = '';
  let outputAddress = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagEmail = false;
  let flagName = false;
  let flagAddress = false;

  let serialUserDefault = document.querySelector('#repair_end_serialNumber');
  let dataBuyDefault = document.querySelector('#repair_end_datalBuy');
  let textareaUserDefault = document.querySelector('#repair_end');
  let fielDefault = document.querySelector('#repair_end_file_name_default');
  let addressDefault = document.querySelector('#repair_end_address');
  let dataApplicationDefault = document.querySelector('#repair_end_data_application');

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
      //  name 
      if (inpName.value.length > 3) {
        flagName = true;
        outputName = '';
      }
      else {
        outputName = 'Недостаточное кол-во символов в поле Имя!';
        flagName = false;
      }
      //  address 
      if (inpAddress.value.length > 3) {
        flagAddress = true;
        outputAddress = '';
      }
      else {
        outputAddress = 'Недостаточное кол-во символов в поле Адрес!';
        flagAddress = false;
      }
      //  surname
      if (inpSurname.value.length > 3) {
        flagSurname = true;
        outputSurname = '';
      }
      else {
        outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
        flagSurname = false;
      }
      //  email
      let em = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
      let valEmail = inpEmail.value;
      let validE = em.test(valEmail);
      if (validE) {
        flagEmail = true;
        outputEmail = '';
      }
      else {
        outputEmail = 'E-mail введен неправильно!';
        flagEmail = false;
      }
      //  tel
      let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
      let valPhone = inpPhone.value;
      let valid = re.test(valPhone);
      if (valid) {
        flagPhone = true;
        outputPhone = '';
      }
      else {
        outputPhone = 'Номер телефона введен неправильно!';
        flagPhone = false;
      }

      inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputEmail + ' ' + outputPhone + outputAddress;
      inpError.classList.add('active');

      if (flagName && flagSurname && flagEmail && flagPhone && flagAddress) {
        e.preventDefault();
        e.stopPropagation();

        document.querySelector('.repair_end_box_name input').value = numberProductValue;
        document.querySelector('#repair_end_box_model').value = numberProductValue;
        serialUserDefault.value = serialNumberUserValue;
        dataBuyDefault.value = dataBuyUserValue;
        textareaUserDefault.value = textareaUserValue;
        if (fielUserValue !== null) {
          document.querySelector('.js_repair_end_box_discription_item_fiele').style.display = 'flex';
          fielDefault.innerHTML = fielUserValue;
          document.querySelector('#repair_end_fiel').prepend(fielInputUserValue);
        } else {
          document.querySelector('.js_repair_end_box_discription_item_fiele').style.display = 'none';
        }
        addressDefault.value = inpAddress.value;
        Data = new Date();
        Year = Data.getFullYear();
        Month = Data.getMonth();
        Day = Data.getDate();
        switch (Month) {
          case 0: fMonth = "января"; break;
          case 1: fMonth = "февраля"; break;
          case 2: fMonth = "марта"; break;
          case 3: fMonth = "апреля"; break;
          case 4: fMonth = "мае"; break;
          case 5: fMonth = "июня"; break;
          case 6: fMonth = "июля"; break;
          case 7: fMonth = "августа"; break;
          case 8: fMonth = "сентября"; break;
          case 9: fMonth = "октября"; break;
          case 10: fMonth = "ноября"; break;
          case 11: fMonth = "декабря"; break;
        }
        let dataApp = + Day + " " + fMonth + " " + Year;

        dataApplicationDefault.value = dataApp;

        repairThree.classList.remove('active');
        repairFoo.classList.add('active');
        // сюда пишем функцию запуска ajax  пример functionAjax();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

    })
  }
})();

//checked form instalation page
(() => {
  let inpName = document.querySelector('#instalation_name');
  let inpPhone = document.querySelector('#instalation_tel');
  let inpSubmit = document.querySelector('.installation_box_left_submit');
  let inpError = document.querySelector('#instalation_error');
  let inpAddress = document.querySelector('#instalation_address');
  let inpCity = document.querySelector('#instalation_city');
  let inpCheck = document.querySelector('#installation_checkbox');

  let outputName = '';
  let outputPhone = '';
  let outputAddress = '';
  let outputCity = '';
  let outputCheck = '';
  let flagPhone = false;
  let flagName = false;
  let flagAddress = false;
  let flagCity = false;
  let flagCheck = false;

  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
      //  name 
      if (inpName.value.length > 3) {
        flagName = true;
        outputName = '';
      }
      else {
        outputName = 'Недостаточное кол-во символов в поле Имя!';
        flagName = false;
      }
      //  address 
      if (inpAddress.value.length > 3) {
        flagAddress = true;
        outputAddress = '';
      }
      else {
        outputAddress = 'Недостаточное кол-во символов в поле Адрес!';
        flagAddress = false;
      }
      //  city
      if (inpCity.value.length > 3) {
        flagCity = true;
        outputCity = '';
      }
      else {
        outputCity = 'Выберите город!';
        flagCity = false;
      }
      //  tel
      let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
      let valPhone = inpPhone.value;
      let valid = re.test(valPhone);
      if (valid) {
        flagPhone = true;
        outputPhone = '';
      }
      else {
        outputPhone = 'Номер телефона введен неправильно!';
        flagPhone = false;
      }
      //  check
      if (inpCheck.checked) {
        flagCheck = true;
        outputCheck = '';
      }
      else {
        outputCheck = 'Необходимо согласие на обработку пер. данных!';
        flagCheck = false;
      }


      inpError.innerHTML = outputName + ' ' + outputCity + ' ' + outputAddress + ' ' + outputPhone + outputCheck;
      inpError.classList.add('active');

      if (flagName && flagCity && flagCheck && flagPhone && flagAddress) {
        e.preventDefault();
        e.stopPropagation();
        // сюда пишем функцию запуска ajax  пример functionAjax();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

    })
  }
})();




// signal checked 
(() => {
  let parentCheck = document.querySelectorAll('.catalog_box_fl_item_body');
  let checkedAll = document.querySelectorAll('.catalog_box_fl input');

  if (checkedAll) {
    for (let i = 0; i < checkedAll.length; i++) {
      checkedAll[i].addEventListener('change', function () {
        for (let y = 0; y < parentCheck.length; y++) {
          let flag = false;
          let checkItem = parentCheck[y].querySelectorAll('input');
          checkItem.forEach(el => {
            if (el.checked) {
              flag = true;
            }
          });
          if (flag) {
            var parentB = checkItem[0].closest('.catalog_box_fl_item');
            parentB.querySelector('.catalog_box_fl_item_head span').classList.add('active');
          } else {
            var parentB = checkItem[0].closest('.catalog_box_fl_item');
            parentB.querySelector('.catalog_box_fl_item_head span').classList.remove('active');
          }
        }
      })
    }
  }

})();


// signal checked mob
(() => {
  let parentCheck = document.querySelectorAll('.catalog_box_fl_item_body');
  let checkedAll = document.querySelectorAll('.fl_mob_cont input');

  if (checkedAll) {
    for (let i = 0; i < checkedAll.length; i++) {
      checkedAll[i].addEventListener('change', function () {
        for (let y = 0; y < parentCheck.length; y++) {
          let flag = false;
          let checkItem = parentCheck[y].querySelectorAll('input');
          checkItem.forEach(el => {
            if (el.checked) {
              flag = true;
            }
          });
          if (flag) {
            var parentB = checkItem[0].closest('.catalog_box_fl_item');
            parentB.querySelector('.catalog_box_fl_item_head span').classList.add('active');
          } else {
            var parentB = checkItem[0].closest('.catalog_box_fl_item');
            parentB.querySelector('.catalog_box_fl_item_head span').classList.remove('active');
          }
        }
      })
    }
  }

})();

// delete accessory backet page
(() => {






})();

//  backet page calc
(() => {
  let plus = document.querySelectorAll('.backet_plus');
  let minus = document.querySelectorAll('.backet_minus');
  let choiseProduct = document.querySelectorAll('.js_backet_product_checked input');
  let costProduct = document.querySelector('.js_backet_bar_box_item_product_cost span');
  let checkAdd = document.querySelectorAll('.js_backet_add');
  let costTotal = document.querySelector('.backet_bar_box_total span');
  let btnDelete = document.querySelectorAll('.js_backet_delete');
  let promoChecked = document.querySelector('.js_backet_checked_promocode input');
  let promoCode = document.querySelector('.js_backet_bar_box_promocode');
  let costPromo = document.querySelector('.js_backet_bar_box_item_product_sale');


  for (let i = 0; i < checkAdd.length; i++) {
    checkAdd[i].addEventListener('click', detectAcc);
  }
  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener('click', numPlus);
  }
  for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener('click', numMinus);
  }
  for (let i = 0; i < choiseProduct.length; i++) {
    choiseProduct[i].addEventListener('click', calcBacket);
  }
  for (let i = 0; i < choiseProduct.length; i++) {
    choiseProduct[i].addEventListener('change', visibleBox);
  }
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener('click', deleteProduct);
  }
  if (promoChecked) {
    promoChecked.addEventListener('click', function () {
      if (promoChecked.checked) {
        promoCode.classList.add('active');
        costPromo.classList.remove('remove');
        totalBcket();
      } else {
        promoCode.classList.remove('active');
        costPromo.classList.add('remove');
        totalBcket();
      }
    })
  }

  function deleteProduct(e) {
    let el = e.target.closest('.backet_body_box_add_body_accessories_product');
    if (el) {
      let head = e.target.closest('.backet_body_box')
      let detect = head.querySelector('.js_backet_body_box_add_head');
      el.remove();
      calcBacket();
      noteAcc(head, detect);
    } else {
      let paren = e.target.closest('.backet_body_box');
      paren.remove();
      let product = document.querySelector('.backet_body_box');
      calcBacket();
      popDeleteProduct(paren);
      if (!product) {
        document.querySelector('.backet').remove();
        document.querySelector('.backet_empty').classList.add('active');
        document.querySelector('body').classList.add('noScroll');
      }
    }
  }

  let pop = document.querySelector('.js_pop_delete');
  let popHide = document.querySelector('.js_pop_delete_hide');

  function popDeleteProduct(paren) {
    pop.classList.add('active');
    let imgSrc = paren.querySelector('.backet_body_box_product_one_img img').getAttribute('src');
    pop.querySelector('.js_pop_delete_img img').src = imgSrc;
    pop.querySelector('.js_pop_delete_discription_tittle').innerHTML = paren.querySelector('.backet_body_box_product_one_discription span').innerHTML;
    pop.querySelector('.js_pop_delete_discription_price p').innerHTML = paren.querySelector('.backet_body_box_product_too_total span').innerHTML;
    if (paren.querySelector('.js_backet_body_box_add_head p').innerHTML == '') {
      pop.querySelector('.js_pop_delete_discription_price span').innerHTML = '';
    } else {
      pop.querySelector('.js_pop_delete_discription_price span').innerHTML = ' + ' + paren.querySelector('.js_backet_body_box_add_head p').innerHTML;
    }
    setTimeout(popDeleteProductHide, 3000);
  }

  if (popHide) {
    popHide.addEventListener('click', popDeleteProductHide);
  }

  function popDeleteProductHide() {
    pop.classList.remove('active');
  }

  function totalBcket() {
    let a = costProduct.innerText.replace(/[^+\d]/g, '');
    if (costPromo.classList.contains('remove')) {
      costTotal.innerHTML = Number(a) + " " + '₽';
    } else {
      let b = costPromo.innerText.replace(/[^+\d]/g, '');
      costTotal.innerHTML = Number(a) + (- Number(b)) + " " + '₽';
    }
    mobPriceBacket();

  }

  function detectAcc(e) {
    let head = e.target.closest('.backet_body_box')
    let detect = head.querySelector('.js_backet_body_box_add_head');
    let checkAdd = document.querySelectorAll('.js_backet_add');
    const arr = Array.from(checkAdd);
    let a = arr.some(function (el) {
      if (el.checked) {
        return true;
      } else {
        return false;
      }
    })
    if (a) {
      detect.classList.add('active');
    } else {
      detect.classList.remove('active');
    }
    noteAcc(head, detect);
  }

  function noteAcc(head, detect) {
    let elemAll = head.querySelectorAll('.js_backet_add');
    let globalSum = 0;
    let serv = 0;
    let acc = 0;
    let num;

    for (let i = 0; i < elemAll.length; i++) {
      if (elemAll[i].checked) {
        let paren = elemAll[i].closest('.js_backet_cost_paren');
        if (elemAll[i].classList.contains('js_backet_add_acc')) {
          serv = serv + 1;
        } else {
          let quantity = paren.querySelector('.backet_num').innerHTML;
          acc = acc + Number(quantity);
          num = paren.querySelector('.js_backet_cost_elem span').innerText.replace(/[^+\d]/g, '');
          globalSum = globalSum + Number(num);
        }

      }
      if (serv == 0 && acc == 0) {
        detect.querySelector('p').innerText = globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv == 1 && acc == 1) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуга' + ' + ' + acc + ' аксессуар' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv == 1 && acc == 0) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуга' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv == 0 && acc == 1) {
        detect.querySelector('p').innerText = acc + ' аксессуар' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv > 1 && acc == 0) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуги' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv == 0 && acc > 1) {
        detect.querySelector('p').innerText = acc + ' аксессуара' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv == 1 && acc > 1) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуга' + ' + ' + acc + ' аксессуара' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv > 1 && acc == 1) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуги' + ' + ' + acc + ' аксессуар' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }
      if (serv > 1 && acc > 1) {
        detect.querySelector('p').innerText = serv + ' ' + 'услуги' + ' + ' + acc + ' аксессуара' + ' | ' + globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      }

    }
    mobPriceBacket();
  }
  let mobPrice = document.querySelector('.js_mob_price_backet_price p');
  let mobData = document.querySelector('.js_mob_price_backet_price span');
  let popPriceBacket = document.querySelector('.js_mob_price_backet');

  function mobPriceBacket() {
    let choiseProduct = document.querySelectorAll('.js_backet_product_checked input');
    let choiseServices = document.querySelectorAll('.js_backet_add_acc');
    const arr = Array.from(choiseProduct);
    let a = arr.some(function (el) {
      if (el.checked) {
        return true;
      } else {
        return false;
      }
    })
    let num = 0;
    let serv = 0;
    choiseProduct.forEach(el => {
      if (el.checked) {
        num++
      }
    });
    choiseServices.forEach(el => {
      if (el.checked) {
        serv++
      }
    });
    if (a) {
      mobPrice.innerHTML = costTotal.innerHTML;
      mobData.innerHTML = num + " товар(а)" + ' | ' + serv + " услуга(и)";
      popPriceBacket.classList.add('active');
    } else {
      mobPrice.innerHTML = '';
      popPriceBacket.classList.remove('active');
      mobData.innerHTML = ''
    }
  }

  function calcBacket() {
    let choiseProduct = document.querySelectorAll('.js_backet_product_checked input');
    let productNum = document.querySelector('.js_backet_bar_box_item_product_num span');
    let globalSum = 0;
    let totalNum = 0;

    for (let i = 0; i < choiseProduct.length; i++) {
      if (choiseProduct[i].checked && choiseProduct[i].closest('.backet_body_box_product')) {
        let paren = choiseProduct[i].closest('.backet_body_box_product');
        let num = paren.querySelector('.backet_body_box_product_too_total span').innerText.replace(/[^+\d]/g, '');
        globalSum = globalSum + Number(num);
        let quantity = paren.querySelector('.backet_num').innerHTML;
        totalNum = totalNum + Number(quantity);
      }
      if (choiseProduct[i].checked == false && choiseProduct[i].closest('.backet_body_box_product')) {
        let paren = choiseProduct[i].closest('.backet_body_box');
        let item = paren.querySelector('.backet_body_box_add_body');
        paren.querySelector('.js_backet_body_box_add_head').classList.remove('active');
        paren.querySelector('.js_backet_body_box_add_head p').innerHTML = ''
        let lines = paren.querySelectorAll('.backet_body_box_add_body_slide_item_discription');
        lines.forEach(el => {
          el.classList.remove('active');
        });
        let checkeds = item.querySelectorAll('input[type="checkbox"]');
        checkeds.forEach(el => {
          el.checked = false
        });
        item.classList.remove('active');

      }
      if (choiseProduct[i].checked && choiseProduct[i].closest('.js_backet_cost_paren')) {
        let paren = choiseProduct[i].closest('.js_backet_cost_paren');
        let num = paren.querySelector('.js_backet_cost_elem span').innerText.replace(/[^+\d]/g, '');
        globalSum = globalSum + Number(num);
        let quantity = paren.querySelector('.backet_num').innerHTML;
        totalNum = totalNum + Number(quantity);
      }

      costProduct.innerText = globalSum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
      productNum.innerHTML = totalNum + ' ' + 'шт';
    }
    totalBcket();
  }

  function visibleBox() {
    let box = this.closest('.backet_body_box');
    const arr = Array.from(choiseProduct);
    let a = arr.some(function (el) {
      if (el.checked) {
        return true;
      } else {
        return false;
      }
    })
    if (a) {
      box.classList.add('active')
    } else {
      box.classList.remove('active');
    }
  }

  function numPlus(e) {
    let head = e.target.closest('.backet_body_box')
    let detect = head.querySelector('.js_backet_body_box_add_head');
    let paren = e.target.closest('.backet_body_box_product_too_quantity');
    let num = paren.querySelector('.backet_num');
    let numDiff = Number(num.innerHTML) + 1;
    num.innerHTML = numDiff;
    diffTotal(paren, numDiff);
    calcBacket();
    totalBcket();
    noteAcc(head, detect);
  }

  function diffTotal(paren, numDiff) {
    let price = paren.previousElementSibling.querySelector('span').innerText.replace(/[^+\d]/g, '');
    let priceCost = Number(price) * numDiff;
    let priceCostSpace = priceCost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + '₽';
    paren.nextElementSibling.querySelector('span').innerHTML = priceCostSpace;
  }


  function numMinus(e) {
    let head = e.target.closest('.backet_body_box')
    let detect = head.querySelector('.js_backet_body_box_add_head');
    let paren = e.target.closest('.backet_body_box_product_too_quantity');
    let num = paren.querySelector('.backet_num');
    let numDiff = Number(num.innerHTML) - 1;
    if (numDiff < 1) {
      numDiff = 1;
      num.innerHTML = numDiff;
    } else {
      num.innerHTML = numDiff;
    }
    diffTotal(paren, numDiff);
    calcBacket();
    totalBcket();
    noteAcc(head, detect);
  }

})();

// target click document
//window.addEventListener('click', function (e) {
//  console.log(e.target);
//})

//checked services backet page
(() => {
  let checkSer = document.querySelectorAll('.backet_body_box_add_body_slide_item_checked');

  if (checkSer) {
    for (let i = 0; i < checkSer.length; i++) {
      checkSer[i].addEventListener('click', checkFunc)
    }
  }

  function checkFunc(e) {
    if (e.target.checked) {
      e.target.closest('.backet_body_box_add_body_slide_item').querySelector('.backet_body_box_add_body_slide_item_discription').classList.add('active');
    } else {
      e.target.closest('.backet_body_box_add_body_slide_item').querySelector('.backet_body_box_add_body_slide_item_discription').classList.remove('active');
    }
  }

})();



// fixed header
var fixHeader = document.querySelector('.js_fixed_header');
let elTopFixed = document.querySelector('.js_ordering_body_box_item_elem_top');
let elBottomFixed = document.querySelector('.js_ordering_body_box_item_elem');
let sizeElTopFixed
if (elTopFixed) {
  sizeElTopFixed = elTopFixed.clientHeight + 370;
}

window.addEventListener('scroll', scrollHeader)


function scrollHeader() {
  if (elBottomFixed) {
    if (window.pageYOffset > sizeElTopFixed) {
      elBottomFixed.classList.add('fixeder');
    } else {
      elBottomFixed.classList.remove('fixeder');
    }
  }
  if (fixHeader) {
    if (window.innerWidth > 1060) {
      if (window.pageYOffset > 87) {
        fixHeader.classList.add('fixed');
      } else {
        fixHeader.classList.remove('fixed');
      }
    } else {
      fixHeader.classList.remove('fixed');
    }
  }
  if (document.querySelector('.js_card_nav')) {
    if (window.pageYOffset > 1000) {
      document.querySelector('.js_card_nav').classList.add('fixed');
    } else {
      document.querySelector('.js_card_nav').classList.remove('fixed');
    }
  }
}

scrollHeader();

window.addEventListener('resize', scrollHeader);


// fixed header mobile
var fixHeaderMob = document.querySelector('header');

if (fixHeaderMob) {
  window.addEventListener('scroll', scrollHeaderMob)


  function scrollHeaderMob() {

    if (window.pageYOffset > 117) {
      fixHeaderMob.classList.add('fixed');
      document.querySelector('body').classList.add('fixed');
    } else {
      fixHeaderMob.classList.remove('fixed');
      document.querySelector('body').classList.remove('fixed');
    }
  };
  scrollHeader();
  window.addEventListener('resize', scrollHeader);
}







// lk
let lk = document.querySelector('.header_top_profile');
let lkHidden = document.querySelector('.header_top_profile_hidden');


if (lk) {
  lk.addEventListener('click', function () {
    lkHidden.classList.toggle('active');
    this.classList.toggle('active');
  })


  document.addEventListener('click', (e) => {
    const lkEl = e.composedPath().includes(lk);
    const gambLk = e.composedPath().includes(lkHidden);
    if (!lkEl && !gambLk) {
      lkHidden.classList.remove('active');
    }

  })

}


//footer_mobile_icon

let footerItem = document.querySelectorAll('.footer_mobile_item');

if (footerItem) {
  for (let i = 0; i < footerItem.length; i++) {
    footerItem[i].addEventListener('mouseover', function () {
      this.classList.add('active');
    })
    footerItem[i].addEventListener('mouseout', function () {
      this.classList.remove('active');
    })
  }
}



// bayers


let bayers = document.querySelector('.header_bottom_buyers');
let bayersHidden = document.querySelector('.header_bottom_buyers_hidden');


if (bayers) {
  bayers.addEventListener('click', function () {
    bayersHidden.classList.toggle('active');
    this.classList.toggle('active');
  })


  document.addEventListener('click', (e) => {
    const bayersEl = e.composedPath().includes(bayers);
    const gamb = e.composedPath().includes(bayersHidden);
    if (!bayersEl && !gamb) {
      bayersHidden.classList.remove('active');
    }

  })
}

//fl mobile

let btnFlMob = document.querySelector('.catalog_mobile_filtr_fl_btn');
let flMobBox = document.querySelector('.fl_mob');
let flBack = document.querySelector('.fl_mob_head_back')
if (btnFlMob) {
  btnFlMob.addEventListener('click', function () {
    flMobBox.classList.add('active');
    document.querySelector('body').classList.add('noScroll')
  });
}
if (flBack) {
  flBack.addEventListener('click', function () {
    flMobBox.classList.remove('active');
    document.querySelector('body').classList.remove('noScroll')
  })
}



// clear button checked filter mob

let clearButton = document.querySelector('.fl_mob_head_clear');
let parent = document.querySelector('.fl_mob_cont');
let signalCheked = document.querySelectorAll('.catalog_box_fl_item_head span')

if (clearButton) {
  let inpCheckbox = parent.querySelectorAll('input');
  let textParent = parent.querySelectorAll('.catalog_box_fl_item_body_el');
  clearButton.addEventListener('click', function () {
    for (i = 0; i < inpCheckbox.length; i++) {
      inpCheckbox[i].checked = false;
    }
    for (y = 0; y < textParent.length; y++) {
      textParent[y].classList.remove('active');
    }
    for (z = 0; z < signalCheked.length; z++) {
      signalCheked[z].classList.remove('active');
    }
  })
}


let flMobNeu = document.querySelector('.catalog_mobile_filtr_sort');

if (flMobNeu) {
  flMobNeu.addEventListener('click', function () {
    this.classList.toggle('active');
  })
}


function slideCardLink() {
  let linkElem = document.querySelectorAll('.card_nav_link_item');
  let boxElem = document.querySelector('.card_nav_link_box_ab');
  let arrowElem = document.querySelector('.card_nav_link_hidden_arrow');
  let arr = [];
  let slidNum = 0;
  let leftNum = 0;
  let flag = true;
  for (let i = 0; i < linkElem.length; i++) {
    arr.push(linkElem[i].offsetWidth);
  }

  if (arrowElem) {
    arrowElem.addEventListener('click', function () {
      if (flag) {
        boxElem.style.left = leftNum - arr[slidNum] - 24 + 'px';
        leftNum = leftNum - arr[slidNum] - 24;
        slidNum = slidNum + 1;
        if (slidNum >= 3) {
          flag = false;
          slidNum = 2;
        }
      } else {
        boxElem.style.left = leftNum + arr[slidNum] + 24 + 'px';
        leftNum = leftNum + arr[slidNum] + 24;
        slidNum = slidNum - 1;
        if (slidNum <= -1) {
          flag = true;
          slidNum = 0;
        }
      }
    })
  }
}
slideCardLink();





