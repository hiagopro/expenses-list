//aqui irei implementar a lista de despezas, com despezas pré-feitas com possibilidade exclui-las
import { useState } from "react";
import styled from "styled-components";
import { Header } from "./header";
import {XCircle} from 'phosphor-react'
const TrStyled = styled.tr`
 

`
const TableStyled = styled.table`
 width:100%;
 background-color: ${props => props.theme.colors.third};

`
const ThExpense = styled.th`
    font-weight: normal;

`
const XCircleStyled = styled(XCircle)`
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.1);
    }
`

export function Body({expenses,setExpenses}){
    
    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
      };
   
  
    return(
        
       
       <TableStyled>
        
            <thead>
                <TrStyled>
                    <th>Expense</th>
                    <th>Categories</th>
                    <th>Data</th>
                    
                </TrStyled>
            </thead>
        
            {expenses.map((expenses, index) =>{
                return(
                    <thead>
                        <TrStyled key={index}>
                            <ThExpense>{expenses.expense}</ThExpense>
                            <ThExpense>{expenses.categories}</ThExpense>
                            <ThExpense>{expenses.data}</ThExpense>
                            <XCircleStyled size={28} onClick={() => handleDeleteExpense(index)} />
                                
                            
                    
                        </TrStyled>
                
                
                </thead>)
        })}

        </TableStyled>            
    )
}