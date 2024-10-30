import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ArrowCircleLeft } from "phosphor-react";
import { DefaulTheme } from "../styles/defaultheme";

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

const PopupContainer: React.FC<PropsContainer> = styled.span<PropsContainer>`
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

interface PropsPopupFixed {
  showPopupFixed: boolean;
  children: React.ReactNode;
}

const PopupContainerFixed: React.FC<PropsPopupFixed> = styled.span<PropsPopupFixed>`
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

interface PropsPopupInstallment {
  showPopupInstallment: boolean;
  children: React.ReactNode;
}

const PopupContainerInstallment: React.FC<PropsPopupInstallment> = styled.span<PropsPopupInstallment>`
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
  margin-bottom: 0.4rem;
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.colors.white};
`;

const Input = styled.input`
  border-radius: 4px;
  margin-left: 2.4rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
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
  margin-top: 1rem;
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

const H1Month: React.FC<H1MonthProps> = styled.h1<H1MonthProps>`
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
  handleSelectedYear,
}) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupFixed, setShowPopupFixed] = useState<boolean>(false);
  const [showPopupInstallment, setShowPopupInstallment] =
    useState<boolean>(false);
  const [expense, setExpense] = useState("");
  const [categories, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenseFixed, setExpenseFixed] = useState("");
  const [categoriesFixed, setCategoriesFixed] = useState("");
  const [dateFixed, setDateFixed] = useState("");
  const [installmentExpense, setInstallmentExpense] = useState<string>("");
  const [installmentCategories, setInstallmentCategories] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [installmentNum, setInstallmentNum] = useState<number>(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormValidFixed, setIsFormValidFixed] = useState(false);
  const [isFormValidInstallment, setisFormValidInstallment] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
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

  const handleFilterMonth = (month: number) => {
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
    onAddExpense({ expense, categories, date, type: "simple" });
    closePopup();
  };

  const handleAddExpenseFixed = () => {
    onAddExpenseFixed({
      expenseFixed,
      categoriesFixed,
      dateFixed,
      type: "fixed",
    });
    closePopup();
  };

  const handleAddInstallmentExpense = () => {
    const selectedDate = new Date(installmentDate).getMonth();
    const selectedDateYear = new Date(installmentDate).getFullYear();
    const installmentExpenseNumber = parseFloat(installmentExpense);
    const installmentAmount = installmentExpenseNumber / installmentNum;
    let month;
    let year;
    let someYear = 0;
    let numberInstallment = 0
    for (let i = 0; i < installmentNum; i++) {
      month = selectedDate + i;
      year = selectedDateYear;
      numberInstallment += 1
     for(month;month > 11;){
        month = month - 12;
        year = year +1;
      }
      const newInstallmentExpenses = {
        installmentExpense,
        installmentCategories,
        installmentNum,
        numberInstallment,
        installmentData: {
          year: year,
          month: month % 12,
          amount: installmentAmount,
        },
        type: "installment",
      };

      onAddInstallmentExpense(newInstallmentExpenses);
      setInstallmentExpenses((prevExpenses) => [
        ...prevExpenses,
        newInstallmentExpenses,
      ]);
      closePopup();
    }
  };

  useEffect(() => {
    const isValid =
      expense.trim() !== "" && categories.trim() !== "" && date.trim() !== "";
    setIsFormValid(isValid);
  }, [expense, categories, date]);

  useEffect(() => {
    const isValidFixed =
      expenseFixed.trim() !== "" &&
      categoriesFixed.trim() !== "" &&
      dateFixed.trim() !== "";
    setIsFormValidFixed(isValidFixed);
  }, [expenseFixed, categoriesFixed, dateFixed]);

  useEffect(() => {
    const isValidInstallment =
      installmentExpense.trim() !== "" &&
      installmentCategories.trim() !== "" &&
      installmentDate.trim() !== "" &&
      installmentNum > 0;
    setisFormValidInstallment(isValidInstallment);
  }, [
    installmentExpense,
    installmentCategories,
    installmentDate,
    installmentNum,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(parseInt(e.target.value, 10));
    handleYearChange(e.target.value); // Passa o valor do ano como argumento
  };
  const everyExpense = () => {
    onfilteredMonth(null);
    setSelectedMonth(null);
  };
  return (
    <DefaulTheme>
      <HeaderStyled>
        <InputYear
          value={handleSelectedYear}
          type="number"
          min="2024" // Defina o ano mínimo aceito
          max="2060" // Defina o ano máximo aceito
          placeholder="Year"
          onChange={handleYearChange}
        />
        <Title onClick={everyExpense}>Lista de Despesas</Title>
        <ButtonAddExpense onClick={togglePopup}>Adc Despesa</ButtonAddExpense>
        <ButtonAddExpense onClick={togglePopupFixed}>
          {" "}
          Despesa Fixa
        </ButtonAddExpense>
        <ButtonAddExpense onClick={togglePopupInstallment}>
          {" "}
          Despesa Parcelada
        </ButtonAddExpense>
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
        <Div>
          <H1>Adicionar Gasto</H1>
          <P>Valor:</P>
          <Input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
          <P>Categoria:</P>
          <Input
            value={categories}
            onChange={(e) => setCategory(e.target.value)}
          />
          <P>Data:</P>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <DivRow>
            <ButtonAddExpense
              onClick={handleAddExpense}
              disabled={!isFormValid}
            >
              Adicionar
            </ButtonAddExpense>
            <ArrowCircleLeftStyled onClick={closePopup} />
          </DivRow>
        </Div>
      </PopupContainer>

      <PopupContainerFixed showPopupFixed={showPopupFixed}>
        <Div>
          <H1>Adicionar Gasto Fixo</H1>
          <P>Valor:</P>
          <Input
            type="number"
            value={expenseFixed}
            onChange={(e) => setExpenseFixed(e.target.value)}
          />
          <P>Categoria:</P>
          <Input
            value={categoriesFixed}
            onChange={(e) => setCategoriesFixed(e.target.value)}
          />
          <P>Data:</P>
          <Input
            type="date"
            value={dateFixed}
            onChange={(e) => setDateFixed(e.target.value)}
          />
          <DivRow>
            <ButtonAddExpense
              onClick={handleAddExpenseFixed}
              disabled={!isFormValidFixed}
            >
              Adicionar
            </ButtonAddExpense>
            <ArrowCircleLeftStyled onClick={closePopup} />
          </DivRow>
        </Div>
      </PopupContainerFixed>

      <PopupContainerInstallment showPopupInstallment={showPopupInstallment}>
        <Div>
          <H1>Adicionar Gasto Parcelado</H1>
          <P>Valor:</P>
          <Input
            type="number"
            value={installmentExpense}
            onChange={(e) => setInstallmentExpense(e.target.value)}
          />
          <P>Categoria:</P>
          <Input
            value={installmentCategories}
            onChange={(e) => setInstallmentCategories(e.target.value)}
          />
          <P>Data:</P>
          <Input
            type="date"
            value={installmentDate}
            onChange={(e) => setInstallmentDate(e.target.value)}
          />
          <P>Número de Parcelas:</P>
          <Input
            type="number"
            value={installmentNum}
            onChange={(e) => setInstallmentNum(parseInt(e.target.value, 10))}
          />
          <DivRow>
            <ButtonAddExpense
              onClick={handleAddInstallmentExpense}
              disabled={!isFormValidInstallment}
            >
              Adicionar
            </ButtonAddExpense>
            <ArrowCircleLeftStyled onClick={closePopup} />
          </DivRow>
        </Div>
      </PopupContainerInstallment>
    </DefaulTheme>
  );
}
