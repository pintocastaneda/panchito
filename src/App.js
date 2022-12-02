import { wait } from "@testing-library/user-event/dist/utils";
import { collection, onSnapshot, where, query, deleteDoc,doc, } from "firebase/firestore";
import { useEffect, useState } from "react";
import AppForm from "./componente/AppForm";
import {db} from "./componente/firebase";
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  ///////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA A BD ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [docsBD, setDocsBD] = useState([]);
  //console.log(docsBD);

  const fnRead = () => {
    const xColeccionConQuery = query(collection(db, "persona"));
    //const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach( (doc) => {
        xDoc.push({id: doc.id, ...doc.data()});
      });

      setDocsBD(xDoc);
    });
  }

  fnRead();
/*
  useEffect( () => {
    
  }, [] );
  */
  ///////////////////////////////////////////////////////////////////////
  ////////// DELETE - fnDelete - Eliminar registros /////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");

  const fnDelete = async (xId) => {
    if(window.confirm("Confirme para eliminar..?")){
      await deleteDoc(doc(db,"persona", xId));
      toast("Eliminado con exito",{
        type:'error',
        autoClose: 2000
      })
    }
  };

  return (

    <div className="container text-center">
        <div className="card bs-secondary p-3 mt-3">

          <ToastContainer/>

      <div className="col-md 12 p-2">
        <div className="card mb-1">
          <h1>sitiocopia2 (App.js)</h1>
        </div>
      </div>

      <div className="col-md 12 p-2">
      <AppForm {...{idActual, setIdActual}} />
      </div>

      <div className="col-md 12 p-2">
        {
          docsBD.map((p) => 
            <div className="card mb-1" key={p.id}> 
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{p.nombre} </h4>
              <div> 
                <i className="material-icons text-danger"
                spam onClick={() => fnDelete(p.id)}>close</i>
                --
                <i className="material-icons text-danger"
                spam onClick={() =>  setIdActual(p.id)}>create</i>
                </div> 
              </div>
          </div>  
          </div>
        )
        }
      </div>
        
      </div>
    </div>
  );
  
}

export default App;