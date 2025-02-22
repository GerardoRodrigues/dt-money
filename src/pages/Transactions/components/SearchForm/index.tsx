import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFomrSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFomrSchema>

export function SearchForm() {
    const loadTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.loadTransactions
    })

    const form = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFomrSchema)
    })

    function search(data: SearchFormInputs) {
        loadTransactions(data.query);
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