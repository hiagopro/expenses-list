import { useState } from 'react';
import { Header } from './assets/components/header';
import { DefaulTheme } from './assets/styles/defaultheme';
import { GlobalStyles } from './assets/styles/globalstyles';
import { Body } from './assets/components/body';
import { Footer } from './assets/components/footer';


function App() {
  const [expenses, setExpenses] =useState([
    {expense:700,
     categories: 'Comida',
     data:'30/03/2024',
     },
     {expense:300,
      categories: 'Futebol',
      data:'30/03/2024',
      }

])
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };
  const calcularTotalDespesas = () => {
    let total = 0;
    expenses.forEach(expense => {
      total += parseFloat(expense.expense) ;
    });
    return total;
  };

  return (
   <div>
    <GlobalStyles/>
      <DefaulTheme>
       
          <Header onAddExpense={handleAddExpense}/>
          <Body expenses={expenses} setExpenses={setExpenses}/>
          <Footer expenses={expenses} expenseCalculating={calcularTotalDespesas}/>
      </DefaulTheme>
  </div> 
  )
}

export default App
