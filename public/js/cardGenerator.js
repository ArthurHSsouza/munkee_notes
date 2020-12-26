
let options = [
    {color:'#98eb34', importanceName: 'Tranquilo'},
    {color:'#ebe534', importanceName: 'Importante'},
    {color:'#eb8634', importanceName: 'Muito Importante'}
];

 let cardGenerator = (username) => {
     
      let list = document.querySelector('#noteList');
      let card = document.createElement('form');
      card.setAttribute('class','card');
      card.setAttribute('method','POST')
      card.setAttribute('action',`/profileNotes/${username}/create`)
      let textarea = document.createElement('textarea');
      let select = document.createElement('select');
      textarea.setAttribute('name',"content");
      select.setAttribute('name','importance');
      let button = document.createElement('button');
     
      for(let i=0;i<options.length;i++){
        let opt = document.createElement('option');
        opt.setAttribute('value', options[i].color);
        opt.innerHTML = options[i].importanceName;
        select.appendChild(opt);
      }
      button.innerHTML = 'Salvar';

      card.appendChild(textarea);
      card.appendChild(select);
      card.appendChild(button);

      list.appendChild(card);
}
