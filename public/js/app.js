// How to grab form from index.hbs
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Gathering data...';
  messageTwo.textContent = '';
  // messageThree.textContent = 'Test';
  // fetch data from the api 'then' run a function
  fetch("/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.err) {
        messageOne.textContent = data.err;
      } else {
        messageOne.textContent = data.locationName;
        messageTwo.textContent = data.forecast;
        messageThree.textContent = messageThree.textContent;
        // if (data.forecast === "Partly") {
        //   messageThree.textContent
        // }
      }
    });
  });
});
