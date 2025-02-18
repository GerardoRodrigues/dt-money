import { css, styled } from "styled-components";

export const SummaryContainer = styled.section`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    margin-top: -5rem;
`;

interface SummaryCardProps {
    variant ?: 'green';
}

export const SummaryCard = styled.div<SummaryCardProps>`
    background: ${prosps => prosps.theme['gray-600']};
    border-radius: 6px;
    padding: 2rem;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${prosps => prosps.theme['gray-300']};
    }

    strong {
        display: block;
        margin-top: 1rem;
        font-size: 2rem;
    }

    ${prosps => prosps.variant === 'green' && css`
        background: ${prosps.theme['green-700']};
    `}
`; 