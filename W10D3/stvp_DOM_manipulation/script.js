document.addEventListener("DOMContentLoaded", () => {
  // toggling restaurants

  const toggleLi = (e) => {
    const li = e.target;
    if (li.className === "visited") {
      li.className = "";
    } else {
      li.className = "visited";
    }
  };

  document.querySelectorAll("#restaurants li").forEach((li) => {
    li.addEventListener("click", toggleLi);
  });



  // adding SF places as list items

  // --- your code here!

  //put form data to the list
const submitFav = (e) =>{
  e.preventDefault();
  let formData = document.querySelector('.favorite-input').value;
  if(formData !== ''){
  let li = document.createElement("li");
  li.append(formData);
  document.querySelector("#sf-places").append(li); //finish add the new item to the list
  // clear form
  document.querySelector('.favorite-input').value = '';
  }

}

  const favoriteSubmit = document.querySelector(".favorite-submit");
favoriteSubmit.addEventListener('click',submitFav);

  // adding new photos

  // --- your code here!
// toggle to hide and unhide the form
const toggleForm = (e)=>{
  e.preventDefault();
  let photoForm = document.querySelector(".photo-form-container");
  if(photoForm.classList.contains('hidden')){
    photoForm.classList.remove('hidden')
  }else{
    photoForm.classList.add('hidden');
  }
}
  document.querySelector(".photo-show-button")
  .addEventListener('click',toggleForm);

//get the url and put it in the list

  const submitPic = (e) => {
    e.preventDefault();
    let formData = document.querySelector('.photo-url-input').value;
    if (formData !== '') {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = formData;
      li.append(img);
      document.querySelector(".dog-photos").append(li); //finish add the new item to the list
      // clear form
      document.querySelector('.photo-url-input').value = '';
    }

    console.log('work!');
  }
  document.querySelector(".photo-url-submit")
    .addEventListener('click', submitPic);

});
