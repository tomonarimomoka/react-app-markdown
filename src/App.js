import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [mkdata , setMkdata] = useState([]);
  const [title , setTitle] = useState("");
  const [source , setSource]= useState('');
  const [mode , setMode]= useState('新規作成');
  const [editId , setEditId]= useState(0);
  const [accountId , setAccountId] = useState('');
  
  function getAccount(){
    fetch('/api/check')
    .then(resp => resp.json())
    .then(res => {
        if(res.result != false){
            accountId = res.result;
            getAllData();
            refresh();
        }else{
            window.location.href="/login.html";
        }
    });
  }
}

function getAllData(){
  fetch('/api/all').then(resp => resp.json()).then(res => {
      mkdata = res;
      refreshData();
  })
}

function getById(e){
  fetch('/api/mark/' + e.target.name)
      .then(resp => resp.json())
      .then(res => {
          title = res.title;
          source = res.content;
          editId = res.id;
          getRender(res.content);
      mode="更新";
  });
}

function getRender(src){
  const source = {source: src};
  fetch('/api/mark/render',{
      method:'post',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(source),
  }).then(data => data.json()).then(res => {
      content = res.render;
      refresh();
  })
}

function sendData(){
  title  = document.querySelector("#title").value;
  source = document.querySelector("#source").value;

  if(mode == '新規作成'){
      create();
  }else{
      update();
  }
}

function create(){
  const data = {
      title:title,
      content:source,
      accountId:accountId
  }
  fetch('/api/add',{
      method:'post',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
  }).then(data => {
      getAllData();
  });
}

function update(){
  const data = {
      title:title,
      content:source,
      id:editId
  }
  fetch('/api/mark/edit',{
      method:'post',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
  }).then(data => {
      getAllData();
  });
}

const changeTitle = (e) =>{
  setTitle(e.target.value);
}

const changeSource = (e) => {
  setSource(e.target.value);
}

useEffect(() => {
  getAccount();
  getAllData();
} , []);

return(
  <div className="app">
    <header>
      <h1 className='display-4 text-primary'>Markdown data</h1>
    </header>
    <div role='main'>
      
    </div>
  </div>
);
  
export default App;
