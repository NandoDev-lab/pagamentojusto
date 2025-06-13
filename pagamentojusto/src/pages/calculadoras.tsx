
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
                    <ul >
                        <li>Valor/Hora</li>
                        <li> Valor Adicional Noturno</li>
                        <li>Proporcional Ferias</li>
                        <li>Adicional de Insalubridade</li>
                        <li>Adicional de Periculosidade</li>
                        <li>Proporcional 13º Salário</li>
                        <li>Calculo de Recisão</li>
                    </ul>                    
                </section>
                <div className={styles.formulario}>
                        <Valor_hora/>
                </div>
            </div>
        </>
    )
}