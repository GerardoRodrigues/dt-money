import * as Dialog from '@radix-ui/react-dialog'
import { CloseButotn, Content, Overlay } from './styles'
import { X } from 'phosphor-react'

export function NewTransactionModal() {
    return(
        <Dialog.Portal>
            <Overlay />

            <Content>
               <Dialog.Title>Nova transação</Dialog.Title>
                
                <CloseButotn>
                    <X size={24} />
                </CloseButotn>

                <form action="">
                    <input type="text" placeholder='Descrição' required />
                    <input type="number" placeholder='Preço' required />
                    <input type="text" placeholder='Categoria' required />

                    <button type='submit'>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}