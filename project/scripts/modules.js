// Include modules into the html file
// Pathes may need altered depending on site structure
$(function () {
  $("#page-header").load("../project/modules/header.html");
  $("nav").load("../project/modules/nav.html");
  $("footer").load("/project/modules/footer.html");
});
