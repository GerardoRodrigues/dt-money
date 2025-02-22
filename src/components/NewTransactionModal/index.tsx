import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const transactionsSchema = z.object({
  description: z.string().min(3).max(50),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type TransactionType = z.infer<typeof transactionsSchema>;

export function NewTransactionModal() {
  const transactionContext = useContext(TransactionsContext);

  const form = useForm<TransactionType>({
    resolver: zodResolver(transactionsSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function submit(data: TransactionType) {
    const { category, description, price, type } = data;

    transactionContext.createNewTransaction({
      description,
      price,
      category,
      type,
    });

    form.reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={form.handleSubmit(submit)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...form.register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...form.register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...form.register("category")}
          />

          <Controller
            control={form.control}
            name="type"
            render={(props) => {
              return (
                <TransactionType
                  onValueChange={props.field.onChange}
                  value={props.field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
