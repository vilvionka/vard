$('.main_slider').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.main_nav_prev'),
  nextArrow: $('.main_nav_next'),
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: false,
  autoplay: true,
});


$('.popular_goods_slider').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.popular_goods_nav_prev'),
  nextArrow: $('.popular_goods_nav_next'),
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        prevArrow: $('.popular_goods_nav_prev'),
        nextArrow: $('.popular_goods_nav_next'),
      }
    }
  ]
});


$('.news_slider').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.news_nav_prev'),
  nextArrow: $('.news_nav_next'),
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        prevArrow: $('.news_nav_prev'),
        nextArrow: $('.news_nav_next'),
        variableWidth: true,
      }
    }
  ]
});


$('.action_slider').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.action_nav_prev'),
  nextArrow: $('.action_nav_next'),
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
})

$('.header_catalog_box_content_slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
})
$(document).ready(function() {
   
  $('.menu-link').click(function(event) {
      event.preventDefault(); // Отменяем стандартное действие ссылки (переход по URL)
      var dataId = $(this).data('id'); // Получаем значение data-id

      // Отправляем AJAX-запрос
      $.ajax({
          url: '/local/ajax/menu.php', // Замените на URL вашего серверного обработчика
          method: 'POST', // Используйте GET или POST в зависимости от ваших требований
          data: { dataId: dataId }, // Передаем параметр data-id
          success: function(response) {
              // Обработка успешного ответа от сервера
              console.log(response);

              // Вывод данных в элемент с классом header_catalog_box_content
              $('.header_catalog_box_content').html(response);
              $('.header_catalog_box_content_slider').slick('unslick');
              $('.header_catalog_box_content_slider').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
              })

          },
          error: function(error) {
              // Обработка ошибки
              console.error(error);
          }
      });
  });
});



$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.comprasion_characteristics_headling');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.comprasion_characteristics_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.comprasion_characteristics'), false);
});

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.catalog_box_fl_item_head');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.catalog_box_fl_item_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.js_catalog_box_fl_item1'), false);
});

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.catalog_box_fl_item_head');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.catalog_box_fl_item_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.js_catalog_box_fl_item2'), false);
});

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.catalog_box_fl_item_head');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.catalog_box_fl_item_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.js_catalog_box_fl_item3'), false);
});

$('.js_card_Accessories_slider_one').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.js_card_Accessories_nav_prev1'),
  nextArrow: $('.js_card_Accessories_nav_next1'),
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
});

$('.js_card_Accessories_slider_two').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.js_card_Accessories_nav_prev2'),
  nextArrow: $('.js_card_Accessories_nav_next2'),
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
});

$('.js_card_Accessories_slider_free').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.js_card_Accessories_nav_prev3'),
  nextArrow: $('.js_card_Accessories_nav_next3'),
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
});


/* scroll */


$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.card_characteristic_box_table_hidden_head');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.card_characteristic_box_table_hidden_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.card_characteristic_box_table_hidden'), false);
});



$('.card_gallery_slider').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.card_gallery_nav_prev'),
  nextArrow: $('.card_gallery_nav_next'),
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
});

$('.card_review_box').slick({
  dots: false,
  infinite: true,
  prevArrow: $('.popular_goods_nav_prev'),
  nextArrow: $('.popular_goods_nav_next'),
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots:true,
        prevArrow: $('.popular_goods_nav_prev'),
        nextArrow: $('.popular_goods_nav_next'),
        variableWidth: true,
        appendDots: $('.popular_goods_pager')
      }
    }
  ]
});





var $page = $('html, body');
$('a[href*="#"]').click(function () {
  $page.animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 200 + 'px'
  }, 400);
  return false;
});


$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.guarantee_accordion_header');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.guarantee_accordion_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.guarantee_accordion'), false);
});


$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var accordionHeader = this.el.find('.support_wrap_accordion_header');
    accordionHeader.on('click', {
      el: this.el,
      multiple: this.multiple
    },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.support_wrap_accordion_body').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.support_wrap_accordion'), false);
});