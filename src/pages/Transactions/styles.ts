import styled from "styled-components";

export const TransactionsContainer = styled.main `
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background: ${prosps => prosps.theme['gray-700']};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`;

interface PriceHighlightProps {
    variant: 'income' | 'outcome';	
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${prosps => prosps.variant === 'income' ? prosps.theme['green-300'] : prosps.theme['red-300']};
`;