function submitForm(e) {
  e.preventDefault();
  let name = document.forms["home_form"]["name"].value;

  sessionStorage.setItem("name", name);

  location.href = "quiz.html";
}