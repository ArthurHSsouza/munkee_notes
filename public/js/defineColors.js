let defineColor = (formArray) => {
  formArray.forEach(form =>{
      color = form.querySelector('#color').value;
      let textarea = form.querySelector('textarea');
      textarea.setAttribute('style',`background-color: ${color}`)
  });
}
defineColor(document.querySelectorAll('.card'));
