(() => {
  let btnPassword = document.querySelector('.js_pop_entrance_box_password i');
  let inpPassword = document.querySelector('.js_pop_entrance_box_inp_password');

  if (btnPassword) {
    btnPassword.addEventListener('click', function () {
      btnPassword.classList.toggle('active');
      if (btnPassword.classList.contains('active')) {
        inpPassword.setAttribute('type', 'text');
      } else {
        inpPassword.setAttribute('type', 'password');
      }
    })
  }

})();

//active b2b refister1
(() => {
  let btnRdio = document.querySelectorAll('.pop_entrance_box_radio_inp input');

  if (btnRdio) {
    for (let i = 0; i < btnRdio.length; i++) {
      btnRdio[i].addEventListener('click', function () {
        document.querySelectorAll('.pop_entrance_box_radio').forEach(el => {
          el.classList.remove('active');
        });
        if (this.checked) {
          this.closest('.pop_entrance_box_radio').classList.add('active');
        } else {
          this.closest('.pop_entrance_box_radio').classList.remove('active');
        }
      })
    }
  }

})();

// active checked note register basic
(() => {
  let btnCheck = document.querySelector('.pop_entrance_box_basic_agreement_inp input');

  if (btnCheck) {
    btnCheck.addEventListener('click', function () {
      if (this.checked) {
        this.closest('.pop_entrance_box_basic_agreement').classList.add('active');
      } else {
        this.closest('.pop_entrance_box_basic_agreement').classList.remove('active');
      }
    })

  }

})();

//checked form register2 b2b
(() => {
  let inpName = document.querySelector('#b2b_register2_name');
  let inpPhone = document.querySelector('#b2b_register2_phone');
  let inpSubmit = document.querySelector('#b2b_register2_submit');
  let inpError = document.querySelector('#b2b_register2_error');
  let inpEmail = document.querySelector('#b2b_register2_email');


  let outputName = '';
  let outputPhone = '';
  let outputEmail = '';
  let flagPhone = false;
  let flagEmail = false;
  let flagName = false;

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

      inpError.innerHTML = outputName + ' ' + outputEmail + ' ' + outputPhone;
      inpError.classList.add('active');

      if (flagName && flagEmail && flagPhone) {
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


//checked form register basic
(() => {
  let inpName = document.querySelector('#register_name');
  let inpPhone = document.querySelector('#register_phone');
  let inpSubmit = document.querySelector('#register_submit');
  let inpError = document.querySelector('#register_error');
  let inpSurname = document.querySelector('#register_surname');
  let inpCheck = document.querySelector('#basic_register_agreement');


  let outputName = '';
  let outputSurname = '';
  let outputPhone = '';
  let outputCheck = '';
  let flagPhone = false;
  let flagSurname = false;
  let flagName = false;
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
      //  surname 
      if (inpSurname.value.length > 3) {
        flagName = true;
        outputSurname = '';
      }
      else {
        outputSurname = 'Недостаточное кол-во символов в поле Фамилия!';
        flagSurname = false;
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

      inpError.innerHTML = outputName + ' ' + outputSurname + ' ' + outputPhone + ' ' + outputCheck;
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

    })
  }
})();

//entrance register code
(() => {

  let pinContainer = document.querySelector(".pop_entrance_box_code");
  if (pinContainer) {
    pinContainer.addEventListener('keyup', function (event) {
      var target = event.srcElement;

      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;

      if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
          if (next == null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }

      if (myLength === 0) {
        var next = target;
        while (next = next.previousElementSibling) {
          if (next == null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }
    }, false);

    pinContainer.addEventListener('keydown', function (event) {
      var target = event.srcElement;
      target.value = "";
    }, false);

  }

})();

//checked form entrance basic
(() => {

  let inpPhone = document.querySelector('#entrance_phone');
  let inpSubmit = document.querySelector('#entrance_submit');
  let inpError = document.querySelector('#entrance_error');



  let outputPhone = '';
  let flagPhone = false;


  if (inpSubmit) {
    inpSubmit.addEventListener('click', function (e) {
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

      inpError.innerHTML = outputPhone;
      inpError.classList.add('active');

      if (flagPhone) {
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