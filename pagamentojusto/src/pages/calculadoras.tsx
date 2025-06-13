
import Navbar from "./component/navbar";
import styles from '../styles/calculadoras.module.css'
import Valor_hora from "./component/formularios/form_valorHora";



export default function Calculadora() {
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.painel}>
                <section className={styles.menu}>
                    <h2>Calculadoras</h2>
                 <button>Valor da Hora</button>   
                 <button>Valor Adicional norturno</button>   
                 <button>Proporcional de Férias</button>   
                 <button>Adicional de Insalubridade</button>   
                 <button>Adicional de Periculosidade</button> 
                 <button>Proporcional 13º Salário</button>  
                 <button>Calculo de Recisão</button>  
                 
                </section>
                <div className={styles.formulario}>
                        <Valor_hora/>
                </div>
            </div>
            
        </>
    )
}