import React from 'react';
import './App.css';
import { Block } from './Block';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates,setRates] = React.useState({});

  React.useEffect(() => {
     fetch('./rates.json')
     .then((res) => res.json())
     .then((json) => {
       setRates(json.rates);
       console.log(json.rates);
     })
     .catch((err) => {
      //  console.warn(err);
      //  alert('Не удалось получить информацию')
     });
   }, []);

  

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    
    setFromPrice(result);
    setToPrice(value);
  }

  

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency}  onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;


