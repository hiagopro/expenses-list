import { ButtonStyled } from "../components/styled-components/button"
import { DefaulTheme } from "../styles/defaultheme"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { ArrowCircleLeft } from "phosphor-react"
const HeaderStyled=styled.header`
    
    margin:0;
    width:100%;
    padding:0;
    height:5rem;
    display:flex;
    justify-content:center;
    gap:5rem;
    align-items: center;
    
    

`
  
const Title = styled.h1`
    color: ${props => props.theme.colors.white};
    
    
`;
const PopupContainer = styled.span`
  top:30%;
  left:41%;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height:22rem;
  position:fixed;
  background-color:${props => props.theme.colors.third}; 
  display: ${props => props.showPopup ? "block" : "none"};
  border-radius:8px;
  background:${props => props.theme.colors.fifith}; 
  z-index:1000;
`;
const H1=styled.h1`
    font-size:1.5rem;
    margin-top:1rem;
    align-items:center;
    justify-content: center;
    display:flex;
    color:${props => props.theme.colors.white}; 

`
const Input=styled.input`
    border-radius:4px;
    margin-left: 2.4rem;
    margin-top:1.4rem;
    border:0;
    height:1.3rem;  
    display:flex;
    justify-content: center;
    align-items:center;
    background:${props => props.theme.colors.third}; 
    outline:none;
    &:focus {
        border: 2px solid;
        border-color:${props => props.theme.colors.secondary} ; 
        outline: none; 
      }
`
const P =styled.p`
    color:${props => props.theme.colors.white};
    
`
const Div = styled.div`
    
    flex-direction:row;
    margin-left:1rem;
    gap:2rem;
    margin-top:1rem;
    
`
const ButtonAddExpense = styled.button`
    background-color: ${props => props.theme.colors.secondary};
    height: 2.3rem;
    width: 6.8rem;
    border-radius: 8px;
    color: ${props => props.theme.colors.white};
    border:0;
    transition: transform 0.2s ease;
    &:hover:enabled {
        transform: scale(1.1);
      }
      &:disabled{
        cursor:not-allowed;
        background-color: ${props => props.theme.colors.secondarydark};

      }
    ;
   
    
    
    
`
const ArrowCircleLeftStyled = styled(ArrowCircleLeft)`
    color:${props => props.theme.colors.white};
    font-size: 2.5rem;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.1);
      }

`
const DivRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap:2rem;
    margin-top:1rem;
`


export function Header({onAddExpense}){
    const [showPopup, setShowPopup] = useState(false);
    const [expense, setExpense] = useState("");
    const [categories, setCategory] = useState("");
    const [data, setDate] = useState("");

    const togglePopup = () => {
        setShowPopup(!showPopup);
        console.log('click')
    };
    const closePopup = () =>{
        setShowPopup(false)
    }
    const handleAddExpense = () => {
        onAddExpense({ expense, categories, data });
        closePopup();
      };
      const [isFormValid, setIsFormValid] = useState(false);
      const validateForm = () => {
        setIsFormValid(expense.trim() !== '' && categories.trim() !== '' && data.trim() !== '');
        
    };
        useEffect(() => {
            validateForm();
        }, [expense, categories, data]);;

    return(
   <DefaulTheme>
        <HeaderStyled>
           <Title>Expenses List</Title> 
            <ButtonStyled onClick={togglePopup}>Add Expenses</ButtonStyled>
            
        </HeaderStyled>
        
        <PopupContainer showPopup={showPopup}>
            <H1>
                New Expense
            </H1>
           <Div>
            <P>Expense</P>
            <Input type="number"  value={expense}
            onChange={(e) => {setExpense(e.target.value);validateForm()}} />
           </Div>
           <Div>
            <P>Categorie</P>
            <Input type="text" value={categories}
            onChange={(e) => {setCategory(e.target.value);validateForm()}}/>
           </Div>
           <Div>
            <P>Data</P>
            <Input type="date"  value={data}
            onChange={(e) => {setDate(e.target.value);validateForm()}}/>
           </Div>
           <DivRow>
            <ArrowCircleLeftStyled onClick={closePopup}/>
            <ButtonAddExpense onClick={handleAddExpense} disabled={!isFormValid}>Add Expense</ButtonAddExpense>
           </DivRow>
        </PopupContainer>
   </DefaulTheme>
        
    
        )
}
    