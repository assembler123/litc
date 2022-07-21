import logo from './logo.svg';

import './App.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import React from 'react';
import axios from "axios";
import { TailSpin,Puff,Oval,Grid  } from 'react-loader-spinner';
var Dropdown = require('rc-dropdown');

function App() {
  const [customtest,setCustom] = React.useState(null);
  const [code, setCode] = React.useState('#include<iostream>\n' +
  'using namespace std;\n' +
  'int main(){\n' +
  '\n' +
  '  int x = 02;\n' +
  '  cout<<x+20;\n' +
  '  return 0;\n' +
  '}');
  const [fontSizeC,setFontSize] = React.useState(12);
  const [language,setLanguage] = React.useState("C++");
  const [out,setOut] = React.useState({success:false,text:""});
  const [loading,setLoading] = React.useState(false);
  const [testCase,setTestCase] = React.useState("");
  
  console.log(languages)
  return (
    <div className="App">
      
      <div className="dflx">

      <div className="flxrt">
        
      </div>
      <div className="flxlft">
      <div className="optn"> 
        <button onClick={()=>{setFontSize(fontSizeC+1)}} style={{fontSize:fontSizeC + 1 }}> A+ </button>
        <button onClick={()=>{setFontSize(fontSizeC - 1)}} style={{fontSize:fontSizeC - 1 }} > A- </button>


        {/* <Dropdown
        trigger={['click']}
        overlay={""}
        animation="slide-up"><button style={{ width: 100 }}>open</button>
        </Dropdown> */}

        <button className="runbtn" onClick={()=>{
          setLoading(true);
          setOut({success:false,text:""})
          axios.post("http://localhost:3002/runcpp",{code:code,test:testCase}).then(r=>{
            setOut({text:r.data.out,success:r.data.success});
            setLoading(false);
          })
        }}>Run</button>
      </div>
        <div style={{height:"500px" , overflow:"auto",
        background:"#f3f3f3"}}>
      <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.cpp)}
      padding={12}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: fontSizeC,
        minHeight:"500px",
        overflow:"auto"

      }}
    />
    </div>

    {loading?<div style={{padding:"20px",width:"100%",textAlign:"center",margin:"auto"}}><Grid color="#00BFFF" height={30} width={30} /></div>:null}
    {out.text?<div className="console">

      <pre style={{textAlign:"left",color:out.success?"#fff":"#ff2121"}}>{out.text}</pre>
      </div>:null}
    
    <textarea rows={5} style={{textAlign:"left",width:"500px"}} placeholder="test case" onChange = {(e)=>{
      setTestCase(e.target.value);
    }}></textarea>
    </div>
    
    </div>
    </div>
  );
}

export default App;
