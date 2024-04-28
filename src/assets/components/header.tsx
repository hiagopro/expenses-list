import { ButtonStyled } from "./styled-components/button";
import { DefaulTheme } from "../styles/defaultheme";
import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import { ArrowCircleLeft } from "phosphor-react";
const HeaderStyled = styled.header`
  margin: 0;
  width: 100%;
  padding: 0;
  height: 5rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.white};
`;
interface PropsContainer {
  showPopup: boolean;
  children: React.ReactNode;
}
const PopupContainer: React.FC<PropsContainer> = styled.span`
  top: 30%;
  left: 41%;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 22rem;
  position: fixed;
  background-color: ${(props) => props.theme.colors.third};
  display: ${(props) => (props.showPopup ? "block" : "none")};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.fifith};
  z-index: 1000;
`;
interface PorpsPopupFixed {
  showPopupFixed: boolean;
  children: React.ReactNode;
}
const PopupContainerFixed: React.FC<PorpsPopupFixed> = styled.span`
  top: 28%;
  left: 41%;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 22rem;
  position: fixed;
  background-color: ${(props) => props.theme.colors.third};
  display: ${(props) => (props.showPopupFixed ? "block" : "none")};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.fifith};
  z-index: 1000;
`;
interface PropsPopupinstallment {
  showPopupInstallment: boolean;
  children: React.ReactNode;
}
const PopupContainerInstallment: React.FC<PropsPopupinstallment> = styled.span`
  top: 15%;
  left: 41%;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 27rem;
  position: fixed;
  background-color: ${(props) => props.theme.colors.third};
  display: ${(props) => (props.showPopupInstallment ? "block" : "none")};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.fifith};
  z-index: 1000;
`;
interface H1Props {
  children: string;
}
const H1: React.FC<H1Props> = styled.h1`
  font-size: 1.5rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.colors.white};
`;
const Input = styled.input`
  border-radius: 4px;
  margin-left: 2.4rem;
  margin-top: 1.4rem;
  border: 0;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.third};
  outline: none;
  &:focus {
    border: 2px solid;
    border-color: ${(props) => props.theme.colors.secondary};
    outline: none;
  }
`;

const P = styled.p`
  color: ${(props) => props.theme.colors.white};
`;
const Div = styled.div`
  flex-direction: row;
  margin-left: 1rem;
  gap: 2rem;
  margin-top: 1rem;
`;
const ButtonAddExpense = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 2.3rem;
  width: 6.8rem;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.white};
  border: 0;
  transition: transform 0.2s ease;
  &:hover:enabled {
    transform: scale(1.1);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.secondarydark};
  }
`;
const ArrowCircleLeftStyled = styled(ArrowCircleLeft)`
  color: ${(props) => props.theme.colors.white};
  font-size: 2.5rem;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
`;
interface H1MonthProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
}
const H1Month: React.FC<H1MonthProps> = styled.h1`
  font-size: 1.34rem;

  color: ${(props) =>
    props.isSelected ? props.theme.colors.secondary : props.theme.colors.white};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
const DivMonth = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 1rem;
`;
const InputYear = styled.input`
  flex-direction: end;
  display: flex;
  border-radius: 4px;
  margin-left: 2.4rem;

  border: 0;
  align-items: center;
  height: 1.3rem;
  background: ${(props) => props.theme.colors.third};
  outline: none;
  &:focus {
    border: 2px solid;
    border-color: ${(props) => props.theme.colors.secondary};
    outline: none;
  }
`;
export function Header({
  onAddExpense,
  onFilterMonth,
  onfilteredMonth,
  onAddExpenseFixed,
  onAddInstallmentExpense,
  setInstallmentExpenses,
  installmentExpenses,
  handleYearChange,
}) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupFixed, setShowPopupFixed] = useState<boolean>(false);
  const [showPopupInstallment, setShowPopupInstallment] =
    useState<boolean>(false);
  const [expense, setExpense] = useState("");
  const [categories, setCategory] = useState("");
  const [data, setDate] = useState("");
  const [expenseFixed, setExpenseFixed] = useState("");
  const [categoriesFixed, setCategoriesFixed] = useState("");
  const [dataFixed, setDateFixed] = useState("");
  const [installmentExpense, setInstallmentExpense] = useState<string>("");
  const [installmentCategories, setInstallmentCategories] = useState("");
  const [installmentData, setInstallmentData] = useState("");
  const [installmentNum, setInstallmentNum] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormValidFixed, setIsFormValidFixed] = useState(false);
  const [isFormValidInstallment, setisFormValidInstallment] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const togglePopup = () => {
    setShowPopup(!showPopup);
    console.log("click");
  };
  const togglePopupFixed = () => {
    setShowPopupFixed(!showPopupFixed);
    console.log("click");
  };
  const togglePopupInstallment = () => {
    setShowPopupInstallment(!showPopupInstallment);
    console.log("click");
  };
  const handleFilterMonth = (month) => {
    onFilterMonth(month); // Chama a função de filtro passando o mês como argumento
    setSelectedMonth(month);
    console.log("Selecionado mês:", month);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowPopupFixed(false);
    setShowPopupInstallment(false);
  };
  const handleAddExpense = () => {
    onAddExpense({ expense, categories, data });
    closePopup();
  };
  const handleAddExpenseFixed = () => {
    onAddExpenseFixed({ expenseFixed, categoriesFixed, dataFixed });
    closePopup();
  };

  const selectedDate = new Date(installmentData).getMonth();
  const selectedDateYear = new Date(installmentData).getFullYear();
  const handleAddInstallmentExpense = (newInstallmentExpense) => {
    const { installmentCategories, installmentNum } = newInstallmentExpense;
    const installmentExpenseNumber = parseFloat(installmentExpense);

    const installmentAmount = (installmentExpenseNumber /
      installmentNum) as number;
    interface InstallmentData {
      year: number;
      month: number;
      amount: number;
    }
    const installmentData: InstallmentData[] = [];
    console.log(installmentData);
    console.log(installmentNum);
    for (let i = 0; i < installmentNum; i++) {
      const month = selectedDate + i;
      const year = selectedDateYear;
      if (month >= 12) {
        installmentData.push({
          year: year + 1,
          month: month - 12,
          amount: installmentAmount,
        });
      } else {
        installmentData.push({
          year: year,
          month: month,
          amount: installmentAmount,
        });
      }

      console.log(installmentData);
    }
    closePopup();

    setInstallmentExpenses([
      ...installmentExpenses,
      { installmentCategories, installmentNum, installmentData },
    ]);
  };
  const everyExpense = () => {
    onfilteredMonth(null);
    setSelectedMonth(null);
  };
  const validateForm = () => {
    setIsFormValid(
      expense.trim() !== "" && categories.trim() !== "" && data.trim() !== ""
    );
  };
  const validateFormFixed = () => {
    setIsFormValidFixed(
      expenseFixed.trim() !== "" &&
        categoriesFixed.trim() !== "" &&
        dataFixed.trim() !== ""
    );
  };
  const validateFormInstallment = () => {
    setisFormValidInstallment(
      installmentExpense.trim() !== "" &&
        installmentCategories.trim() !== "" &&
        installmentData.trim() !== ""
    );
  };
  useEffect(() => {
    validateForm();
  }, [expense, categories, data]);

  useEffect(() => {
    validateFormInstallment();
  }, [installmentExpense, installmentCategories, installmentData]);

  return (
    <DefaulTheme>
      <HeaderStyled>
        <InputYear
          type="number"
          min="2024" // Defina o ano mínimo aceito
          max="2030" // Defina o ano máximo aceito
          placeholder="Year"
          onChange={handleYearChange}
        />
        <Title onClick={everyExpense}>Expenses List</Title>
        <ButtonStyled onClick={togglePopup}>Add Expenses</ButtonStyled>
        <ButtonStyled onClick={togglePopupFixed}> Fixed Expenses</ButtonStyled>
        <ButtonStyled onClick={togglePopupInstallment}>
          Installment Expense
        </ButtonStyled>
      </HeaderStyled>

      <DivMonth>
        <H1Month
          onClick={() => handleFilterMonth(0)}
          isSelected={selectedMonth === 0}
        >
          Janeiro
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(1)}
          isSelected={1 === selectedMonth}
        >
          Fevereiro
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(2)}
          isSelected={2 === selectedMonth}
        >
          Março
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(3)}
          isSelected={3 === selectedMonth}
        >
          Abril
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(4)}
          isSelected={4 === selectedMonth}
        >
          Maio
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(5)}
          isSelected={5 === selectedMonth}
        >
          Junho
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(6)}
          isSelected={6 === selectedMonth}
        >
          Julho
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(7)}
          isSelected={7 === selectedMonth}
        >
          Agosto
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(8)}
          isSelected={8 === selectedMonth}
        >
          Setembro
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(9)}
          isSelected={9 === selectedMonth}
        >
          Outubro
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(10)}
          isSelected={10 === selectedMonth}
        >
          Novembro
        </H1Month>

        <H1Month
          onClick={() => handleFilterMonth(11)}
          isSelected={11 === selectedMonth}
        >
          Dezembro
        </H1Month>
      </DivMonth>
      <PopupContainer showPopup={showPopup}>
        <H1>New Expense</H1>
        <Div>
          <P>Expense</P>
          <Input
            type="number"
            value={expense}
            onChange={(e) => {
              setExpense(e.target.value);
              validateForm();
            }}
          />
        </Div>
        <Div>
          <P>Categorie</P>
          <Input
            type="text"
            value={categories}
            onChange={(e) => {
              setCategory(e.target.value);
              validateForm();
            }}
          />
        </Div>
        <Div>
          <P>Data</P>
          <Input
            type="date"
            value={data}
            onChange={(e) => {
              setDate(e.target.value);
              validateForm();
            }}
          />
        </Div>
        <DivRow>
          <ArrowCircleLeftStyled onClick={closePopup} />
          <ButtonAddExpense onClick={handleAddExpense} disabled={!isFormValid}>
            Add Expense
          </ButtonAddExpense>
        </DivRow>
      </PopupContainer>
      <PopupContainerFixed showPopupFixed={showPopupFixed}>
        <H1>New Expense</H1>
        <Div>
          <P>Expense</P>
          <Input
            type="number"
            value={expenseFixed}
            onChange={(e) => {
              setExpenseFixed(e.target.value);
              validateFormFixed();
            }}
          />
        </Div>
        <Div>
          <P>Categorie</P>
          <Input
            type="text"
            value={categoriesFixed}
            onChange={(e) => {
              setCategoriesFixed(e.target.value);
              validateFormFixed();
            }}
          />
        </Div>
        <Div>
          <P>Data</P>
          <Input
            type="date"
            value={dataFixed}
            onChange={(e) => {
              setDateFixed(e.target.value);
              validateFormFixed();
            }}
          />
        </Div>
        <DivRow>
          <ArrowCircleLeftStyled onClick={closePopup} />
          <ButtonAddExpense
            onClick={handleAddExpenseFixed}
            disabled={!isFormValidFixed}
          >
            Add Expense
          </ButtonAddExpense>
        </DivRow>
      </PopupContainerFixed>
      <PopupContainerInstallment showPopupInstallment={showPopupInstallment}>
        <H1>New Expense</H1>
        <Div>
          <P>Expense</P>
          <Input
            type="number"
            value={installmentExpense}
            onChange={(e) => {
              setInstallmentExpense(e.target.value);
              validateFormInstallment();
            }}
          />
        </Div>
        <Div>
          <P>Installments</P>
          <Input
            type="number"
            value={installmentNum}
            max={12}
            onChange={(e) => {
              setInstallmentNum(e.target.value);
              validateFormInstallment();
            }}
          />
        </Div>
        <Div>
          <P>Categorie</P>
          <Input
            type="text"
            value={installmentCategories}
            onChange={(e) => {
              setInstallmentCategories(e.target.value);
              validateFormInstallment();
            }}
          />
        </Div>
        <Div>
          <P>Dataa</P>
          <Input
            type="date"
            value={installmentData}
            onChange={(e) => {
              setInstallmentData(e.target.value);
              validateFormInstallment();
            }}
          />
        </Div>
        <DivRow>
          <ArrowCircleLeftStyled onClick={closePopup} />
          <ButtonAddExpense
            onClick={() =>
              handleAddInstallmentExpense({
                installmentExpense,
                installmentNum,
                installmentCategories,
                installmentData,
              })
            }
            disabled={!isFormValidInstallment}
          >
            Add Expense
          </ButtonAddExpense>
        </DivRow>
      </PopupContainerInstallment>
    </DefaulTheme>
  );
}
