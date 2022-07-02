// //-------------自己加来取消redirect的------------------------
var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "OK. Thanks!";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          form.reset();
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form.";
          form.reset();
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
    form.reset();
  });
}
form.addEventListener("submit", handleSubmit)