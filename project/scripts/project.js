$(function () {
  insertData()
});

function insertData() {
  $.ajax({
    url: '../project/scripts/pagedata.json',
    dataType: "json",
    success: function (data) {
      console.log(data)
      var title = data.Color.Heading;
      $("#Heading").text(title);
      var defin = data.Color.Definition;
      $("#Definition").text(defin);
      $("#Summary").text(data.Color.Summary);
      $("#Quote").text(data.Color.Quote);
      var head = data.Home.Heading;
      $("#Title").text(head);
      $("#Sum").text(data.Home.Summary);
      $("#Defin").text(data.Home.Definition);
      $("#quote1").text(data.Home.Quote);
      $("#tips").text(data.Color.Tips);
      $("#add1").text(data.Color.Bullet1);
      $("#add2").text(data.Color.Bullet2);
      $("#add3").text(data.Color.Bullet3);
      $("#add4").text(data.Color.Bullet4);
    }
  })
}


//function that will
