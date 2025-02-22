import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFomrSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFomrSchema>

export function SearchForm() {
    const transactionContext = useContext(TransactionsContext)

    const form = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFomrSchema)
    })

    function search(data: SearchFormInputs) {
        transactionContext.loadTransactions(data.query);
        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={form.handleSubmit(search)}>
            <input type="text" placeholder="Busque por transações" { ...form.register('query') }/>

            <button type="submit" disabled={form.formState.isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}