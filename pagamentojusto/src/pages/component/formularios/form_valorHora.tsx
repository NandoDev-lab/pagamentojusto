import styles from '../../../styles/formulario.module.css'
export default function Valor_hora() {
    var valor_Hora = 0
    var total_horas_mensais;
    var valor_salario
    var escala_trabalho
    return (
        <div className={styles.formulario}>
            <form action="" method="post">
                Cálculo de valor por hora trabalhada
                <label htmlFor="">Valor do Salário Atual</label>
                <input type="number" />
                <label htmlFor="">Total de Horas Mensais</label>
                <input type="number" />
                <label htmlFor="">Tipo de Escala</label>
                <select name="escala" id="escala">
                    <option value="220">44h/ 6x1semanais</option>
                    <option value="220">12x36 diurna</option>
                    <option value="220">12x36 noturna</option>
                </select>
                <p className={styles.aviso}>ao selecionar o tipo de escala o total de horas mensais será preenchido automaticamente</p>

                    <button>Calcular</button>
                <p>Valor por hora: R$ {valor_Hora}/hora</p>

                <p>Resultado</p>
                O calculo corresponde a divisão do valor do Salário informado {valor_salario} total de horas mensais {total_horas_mensais}, calculada a partir da escala de trabalho informada {escala_trabalho}

            </form>

        </div>

    )
}