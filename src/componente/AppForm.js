import {collection, addDoc, getDoc, doc, updateDoc,} from "firebase/firestore";
import React,{ useEffect, useState} from 'react';
import { db } from './firebase';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppFrom = (props) => {

    const camposRegistro ={nombre:"", edad:"", genero:""}
    const [objeto, setObjeto] = useState(camposRegistro);

    

    const controlarEstadoCambio = (e) => {  
        const {name, value} = e.target;
        setObjeto({...objeto,[name]:value});   
    };
    
    const controlSubmit = async (e) => {
        try {
            e.preventDefault();
            if(props.idActual === ""){
                /////////////////////////REGISTAR///////////////////////
                if(validarForm()){
                    addDoc(collection(db, 'persona'),objeto);
                    toast('Se GUARDO  el REGISTRO....',{
                        type:'info',
                        autoClose: 2000
                    })
                }else{
                    toast('No se GUARDO el REGISTRO....',{
                        type:'info',
                        autoClose: 2000
                    })
                }

            }else{
                /////////////////////////ACTUALIZAR///////////////////////
                await updateDoc(doc(collection(db,"persona"),props.idActual),objeto);
                toast('Se ACTULIZAR  el REGISTRO....',{
                    type:'info',
                    autoClose: 2000
                })
                props.setIdActual();
            }
            setObjeto(camposRegistro);
        } catch (error) {
            console.error();
        }
        
    };

    const validarForm = () => {
        if(objeto.nombre==="" || /^\s+$/.test(objeto.nombre)){
            alert("Escriba nombres...");
            return false;
        }
        return true;
    };

    useEffect(() => {
        if(props.idActual ===""){
            setObjeto({...camposRegistro});
        }else{
            obtenerDatosPorId(props.idActual);
        }
    }, [props.idActual]);
    
    const obtenerDatosPorId =  async (xId) => {
          const objPorId = doc (db,"persona",xId);
          const docPorId = await getDoc(objPorId);
          if(docPorId.exists()){
            setObjeto(docPorId.data());
          }else{
            console.log("No hay Datos en BD...");
            }
          }
  

    return(
        <div>
        <form className="card card-body" onSubmit={controlSubmit}>
            <button className="btn btn-primary btn-block">
                Formulario (AppFrom.js)
            </button>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">group_add</i>
                </div>
                <input type="text" className="form-control" name="nombre" placeholder="Nombres..."
                    onChange={controlarEstadoCambio} value={objeto.nombre}/><br/>
            </div>

            <div className="form-group input-group clearfix">
                <div className="input-group-text bd-light">
                    <i className="material-icons">star_half</i>
                </div>
                <input type="text"  className="form-control" name="edad" placeholder="Edad..."
                    onChange={controlarEstadoCambio} value={objeto.edad}/><br/>
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" name="genero" placeholder="Genero..."
                    onChange={controlarEstadoCambio} value={objeto.genero}/><br/>
            </div>
            <button className="btn btn-primary btn-block">
                {props.idActual === ""? "Guardar" : "Actualizar"}
            </button>
        </form>
        </div>
    );
};
export default AppFrom;