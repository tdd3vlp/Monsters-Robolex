import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [searchField, setSeachField] = useState('');
  const [monsters, setMosters] = useState([]);
  const [filteredMonsters, setFilterMosters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMosters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });
    setFilterMosters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSeachField(value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Robolox</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
