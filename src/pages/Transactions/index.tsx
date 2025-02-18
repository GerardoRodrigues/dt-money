import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transaction () {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <TransactionsTable>
                    <tr>
                        <td width="50%">Desenvolvimento</td>
                        <td>
                            <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
                        </td>
                        <td>Venda</td>
                        <td>18/02/2025</td>
                    </tr>
                    <tr>
                        <td width="50%">Hambuguer</td>
                        <td>
                            <PriceHighlight variant="outcome">-R$ 80.00,00</PriceHighlight>
                        </td>
                        <td>Alimentação</td>
                        <td>16/02/2025</td>
                    </tr>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}