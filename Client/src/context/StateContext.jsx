import React, { createContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [counter, setCounter] = useState({
    amount: 1,
    price: 0,
    result: 0
  });

  const initializeCounter = (price) => {
    setCounter({ price, amount: 1, result: price });
  };

  const increment = () => {
    const newAmount = counter.amount + 1;
    const newResult = (newAmount * counter.price).toFixed(2);
    setCounter({ ...counter, amount: newAmount, result: newResult });
  };

  const decrement = () => {
    if (counter.amount > 1) {
      const newAmount = counter.amount - 1;
      const newResult = (newAmount * counter.price).toFixed(2);
      setCounter({ ...counter, amount: newAmount, result: newResult });
    }
  };


  return (
    <StateContext.Provider value={{ counter, increment, decrement,initializeCounter }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => React.useContext(StateContext);
