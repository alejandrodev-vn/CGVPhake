
/* header on scroll */ 
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").classList.add("navbarFixed");
  } else {
    document.getElementById("navbar").classList.remove("navbarFixed");


  }
}
/* header on scroll */
function addchk(data) {
  // if (this.model.Numseats == undefined) {
  //   alert('Enter Username and number of seats');
  //   this.uncheck = data;
  //   return;
  // }
  // if (this.seats.length.toString() == this.model.Numseats) {
  //   alert('You can only select ' + this.model.Numseats + ' seats');
  //   let za = document.getElementById(`${data}`);
  //   za.setAttribute('checked', 'false');
  //   return;
  // }
  // this.seats.push(data);
  // this.amount = (Number(this.amount)) + (Number(20));
  // this.model.seats = this.seats.toString();
  // var a = document.getElementById(`${data}`);
  // console.log(a)
  // a.style.setProperty('border', '3px solid #ff9438'); 
}

