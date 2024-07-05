import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [cards, setCards] = useState([]);
  const [filterYear, setFilterYear] = useState('');

  const handleAdd = () => {
    const newCard = { title, amount: parseFloat(amount), date };
    setCards([...cards, newCard]);
    setTitle(''); setAmount(''); setDate('');
  };

  const handleDiscard = () => {
    setTitle(''); setAmount(''); setDate('');
  };

  const handleDelete = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleFilterChange = (e) => {
    setFilterYear(e.target.value);
  };

  const groupedData = cards.reduce((acc, card) => {
    const date = new Date(card.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (!acc[monthYear]) {
      acc[monthYear] = { title: monthYear, amount: 0 };
    }
    acc[monthYear].amount += card.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.values(groupedData).map(data => data.title),
    datasets: [{
      label: 'Amount',
      data: Object.values(groupedData).map(data => data.amount),
      backgroundColor: ["red", "green", "blue", "orange", "brown", "skyblue", "yellow", "violet", "purple", "darkesgreen"],
    }]
  };

  const filteredCards = cards.filter(card => {
    return filterYear ? new Date(card.date).getFullYear().toString() === filterYear : true;
  });

  return (
    <>
      <div className="App">
        <header>
          <button className="home-btn">Home</button>
        </header>
        <div className="container">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <button className="btn1" onClick={handleAdd}>Add</button>
          <button className="btn2" onClick={handleDiscard}>Discard</button>
          <br />
          <input
            type="text"
            placeholder="Enter year to filter"
            value={filterYear}
            onChange={handleFilterChange}
          />
        </div>
        <div className="chart">
          <Bar data={chartData} key={Object.keys(groupedData).length} />
        </div>
      </div>
      <div className="card-container">
        {filteredCards.map((card, index) => (
          <div className="card" key={index}>
            <h3>{card.title}</h3>
            <p>Amount: {card.amount}</p>
            <p>Date: {card.date}</p>
            <button onClick={() => handleDelete(index)}>Del</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
