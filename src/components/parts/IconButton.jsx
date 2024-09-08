import React from 'react';
import styled from 'styled-components';

const StyledIconButton = styled.button`
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &.primary {
        background-color: #37B7C3;
        border: 1px solid #37B7C3;
        color: white;
    }

    &.default {
        background-color: #EBF4F6;
        border: 1px solid #EBF4F6;
        color: #37B7C3;
    }

    &:hover {
        filter: brightness(90%);
    }

    & + button {
        margin-left: 8px;
    }
`;

const IconButton = ({ className, onClick, children }) => (
    <StyledIconButton className={className} onClick={onClick}>
        {children}
    </StyledIconButton>
);

export default IconButton;