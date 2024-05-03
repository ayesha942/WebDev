// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {gapi} from 'gapi-script'
import { useEffect } from 'react';
import Register from './components/Register';
const clientid= "1072306097003-4ni1r4egjla5p5aaanah2liu1aid31tj.apps.googleusercontent.com";


function App() {
  useEffect(() => {
function start()
{
  gapi.client.init({
    clientid: clientid,
    scope: " "
  })
};
gapi.load('client:auth2',start);
  });
  return (
    <>
       <Register/>
        
       
       
    </>
  );
}

export default App;
