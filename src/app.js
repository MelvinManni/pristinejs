const defaultConfig = {
  // class of the parent element where the error/success class is added
  classTo: "form-group",
  errorClass: "has-danger",
  successClass: "has-success",
  // class of the parent element where error text element is appended
  errorTextParent: "form-group",
  // type of element to create for the error text
  errorTextTag: "div",
  // class of the error text element
  errorTextClass: "text-help",
};

const customConfig = {
  // class of the parent element where the error/success class is added
  classTo: "form-group",
  errorClass: "has-danger",
  successClass: "has-success",
  // class of the parent element where error text element is appended
  errorTextParent: "form-group",
  // type of element to create for the error text
  errorTextTag: "div",
  // class of the error text element
  errorTextClass: "text-help text-danger",
};

window.onload = function () {
  const form1 = el("form1");
  const form2 = el("form2");
  const form3 = el("form3");
  const form4 = el("form4");
  const form5 = el("form5");

  Pristine.addValidator(
    "name",
    function (value) {
      return value.length > 0 && value.length < 20;
    },
    "Name must be between 1 and 20 characters"
  );

  Pristine.addValidator(
    "message",
    function (value = "") {
      let valid = false;
      value.split(".").forEach((sentence) => {
        console.log(sentence);
        if (sentence.trim()[0] && sentence.trim()[0] === sentence.trim()[0].toUpperCase()) {
          valid = true;
        } else {
            valid = false;
        }
      });

      return valid;
    },
    "Each sentence in message must start with a capital letter", 2
  );

  Pristine.addValidator(
    "password",
    function (value) {
      const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return regEx.test(value);
    },
    "Password must be at least 8 characters, contain at least one letter, one number and one special character"
  );

  const pristine1 = new Pristine(form1);
  const pristine2 = new Pristine(form2);
  const pristine3 = new Pristine(form3);
  const pristine4 = new Pristine(form4);
  const pristine5 = new Pristine(form5, customConfig);

  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    const valid = pristine1.validate();

    if (valid) {
      alert("Form is valid");
    } else {
      alert("Form is invalid");
    }
  });

  form2.addEventListener("submit", function (e) {
    e.preventDefault();
    const valid = pristine2.validate();

    if (valid) {
      alert("Form is valid");
    } else {
      alert("Form is invalid");
    }
  });

  // Form 3

  pristine3.addValidator(
    el("form3-age"),
    (value) => {
      return value >= 18 && value <= 65;
    },
    "Age must be between 18 and 65"
  );

  el("form3-age-slot").innerText = el("form3-age").value;
  el("form3-age").addEventListener("change", function (e) {
    const age = e.target.value;
    el("form3-age-slot").innerText = age;
  });
  form3.addEventListener("submit", function (e) {
    e.preventDefault();
    const valid = pristine3.validate();

    if (valid) {
      alert("Form is valid");
    } else {
      alert("Form is invalid");
    }
  });

  // Form 4
  form4.addEventListener("submit", function (e) {
    e.preventDefault();
    pristine4.validate();
  });

  // Form 5
  form5.addEventListener("submit", function (e) {
    e.preventDefault();
    pristine5.validate();
  });
};

function el(id) {
  return document.getElementById(id);
}
