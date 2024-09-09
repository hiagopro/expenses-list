import { useState, useEffect } from "react";

import { Header } from "./assets/components/header";
import { DefaulTheme } from "./assets/styles/defaultheme";
import { GlobalStyles } from "./assets/styles/globalstyles";
import { Body } from "./assets/components/body";
import { Footer } from "./assets/components/footer";
import React from "react";
import { LoginPage } from "./assets/components/login";
import axios from "axios";
function App() {
  interface PropsOfExpense {
    expense: string;
    categories: string;
    date: string;
    id: number;
    type: string;
  }
  interface FixedExpense {
    expense: string;
    categories: string;
    date: string;
    type: string; // Adicionado para corresponder ao tipo de despesa
  }

  interface InstallmentExpense {
    installmentExpense: number;
    installmentNum: number;
    installmentCategories: string;
    installmentData: { month: number; year: number; amount: number }[];
    type: string; // Adicionado para corresponder ao tipo de despesa
  }
  interface FooterProps {
    expense: PropsOfExpense;
    filteredExpenses: PropsOfExpense[];
    expenseCalculating: (expenses: PropsOfExpense[]) => void;
  }

  const [expenses, setExpenses] = useState<PropsOfExpense[]>([]);

  const [expensesFixed, setExpensesFixed] = useState<FixedExpense[]>([]);
  const [installmentExpenses, setInstallmentExpenses] = useState<
    InstallmentExpense[]
  >([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const savedSignin = sessionStorage.getItem("signin");
    const savedId = sessionStorage.getItem("userId");
    console.log(savedId);
    if (savedSignin === "true") {
      setSignin(true);
    }
    if (savedId) {
      console.log(savedId);
      axios
        .get(`http://localhost:5000/expenses/${savedId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const simpleExpenses = response.data.filter(
            (expense) => expense.type === "simple"
          );
          const fixedExpenses = response.data.filter(
            (expense) => expense.type === "fixed"
          );
          const installmentExpenses = response.data.filter(
            (expense) => expense.type === "installment"
          );

          setExpenses(simpleExpenses);

          setInstallmentExpenses(installmentExpenses);

          setExpensesFixed(fixedExpenses);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("Do login again");
            sessionStorage.setItem("signin", "false");
            setSignin(false);
          }
        });
    }
  }, []);

  const [filteredMonth, setFilteredMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const handleAddExpense = async (newExpense) => {
    const savedId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/expenses/",
      {
        expense: newExpense.expense,
        categories: newExpense.categories,
        date: newExpense.date,
        type: newExpense.type,
        idclient: savedId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    location.reload();
  };
  const handleAddExpenseFixed = (newExpenseFixed) => {
    const savedId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    axios.post(
      "http://localhost:5000/expenses/",
      {
        expenseFixed: newExpenseFixed.expenseFixed,
        categoriesFixed: newExpenseFixed.categoriesFixed,
        dateFixed: newExpenseFixed.dateFixed,
        type: newExpenseFixed.type,
        idclient: savedId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).catch((err) => {
      if (err.response.status === 401) {
        alert("Do login again");
        sessionStorage.setItem("signin", "false");
        setSignin(false);
      }
    });
    location.reload();
  };
  const handleAddInsttalmentExpense = async (newInstallmentExpenses) => {
    const savedId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    const {
      installmentNum,
      installmentExpense,
      numberInstallment,
      installmentCategories,
      installmentData,
      type,
    } = newInstallmentExpenses;

    await axios.post(
      "http://localhost:5000/expenses/",
      {
        installmentExpense,
        installmentData: installmentData,
        installmentCategories,
        installmentNum,
        numberInstallment,
        type,
        idclient: savedId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).catch((err) => {
      if (err.response.status === 401) {
        alert("Do login again");
        sessionStorage.setItem("signin", "false");
        setSignin(false);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    location.reload();
  };
  const calcularTotalDespesas = (expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.expense);
    });
    let totalFixed = 0;
    expensesFixed.forEach((expenseFixed) => {
      totalFixed += parseFloat(expenseFixed.expense);
    });

    let totalInstallment = 0;

    if (filteredMonth != null) {
      installmentExpenses.forEach((installmentExpense) => {
        if (
          filteredMonth === installmentExpense.installmentData.month &&
          selectedYear === installmentExpense.installmentData.year
        ) {
          totalInstallment += installmentExpense.installmentData.amount;
        }
      });
    }

    return total + totalFixed + totalInstallment;
  };
  const handleFilteredMonth = () => {
    setFilteredMonth(null);
  };

  const handleFilterMonth = (month) => {
    setFilteredMonth(month); // Atualiza o mês filtrado
  };
  const filterExpensesByMonth = (month) => {
    if (month === null) return expenses;
    return expenses.filter(
      (expense) => new Date(expense.date).getMonth() === month
    );
  };
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };
  const filterExpensesByYear = (year) => {
    if (year === null) return expenses;
    let monthNow = filterExpensesByMonth(filteredMonth);
    return monthNow.filter(
      (expense) => new Date(expense.date).getFullYear() === selectedYear
    );
  };

  const [signin, setSignin] = useState(false);
  console.log(signin);
  return (
    <div>
      <GlobalStyles />
      {signin == true ? (
        <DefaulTheme>
          <Header
            onAddExpense={handleAddExpense}
            onFilterMonth={handleFilterMonth}
            onfilteredMonth={handleFilteredMonth}
            onAddExpenseFixed={handleAddExpenseFixed}
            onAddInstallmentExpense={handleAddInsttalmentExpense}
            setInstallmentExpenses={setInstallmentExpenses}
            installmentExpenses={installmentExpenses}
            handleYearChange={handleYearChange}
            handleSelectedYear={selectedYear}
          />
          <Body
            expenses={
              filteredMonth !== null
                ? filterExpensesByYear(selectedYear)
                : expenses // Filtra as despesas se houver um mês selecionado, caso contrário, mostra todas as despesas
            }
            setExpenses={setExpenses}
            expensesFixed={expensesFixed}
            setExpensesFixed={setExpensesFixed}
            installmentExpenses={installmentExpenses}
            setInstallmentExpenses={setInstallmentExpenses}
            filteredMonth={filteredMonth}
            selectedYear={selectedYear}
          />
          <Footer
            expenses={expenses}
            filteredExpenses={
              filteredMonth !== null
                ? filterExpensesByYear(selectedYear)
                : expenses // Passa as despesas filtradas se houver um mês selecionado, caso contrário, passa todas as despesas
            }
            expenseCalculating={calcularTotalDespesas}
          />
        </DefaulTheme>
      ) : (
        <LoginPage setSignin={setSignin} />
      )}
    </div>
  );
}

export default App;
