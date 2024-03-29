'use client';
import { useState } from 'react';
import styles from './searchBar.module.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import useOnclickOutside from 'react-cool-onclickoutside';

function SearchBar({
  placeholder,
  data,
  setSelectedData,
  selectedData,
  oneOption,
  overrideStyle,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    if (oneOption) {
      setSelectedData(e.target.value);
    }

    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(e.target.value.toLowerCase());
    });

    if (e.target.value === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectData = (element) => {
    if (!oneOption) {
      const copySelectedData = [...selectedData];
      if (copySelectedData.find((data) => data === element) !== element) {
        copySelectedData.push(element);
        setSelectedData(copySelectedData);
        setSearchValue('');
        setFilteredData([]);
      } else {
        setFilteredData([]);
      }
    } else {
      setSelectedData(element);
      setSearchValue(element);
      setFilteredData([]);
    }
  };

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    setFilteredData([]);
  });

  return (
    <div className={styles.container} ref={ref} style={overrideStyle}>
      <div className={styles.searchBarWrapper}>
        {searchValue !== '' ? (
          <AiOutlineClose
            size={20}
            onClick={() => {
              if (!oneOption) {
                setSearchValue('');
                setFilteredData([]);
              } else {
                setSearchValue('');
                setSelectedData('');
              }
            }}
            color='#9596A9'
          />
        ) : (
          <AiOutlineSearch size={22} color='#9596A9' />
        )}
        <input
          type='text'
          className={styles.searchBar}
          value={!oneOption ? searchValue : selectedData}
          onChange={handleFilter}
          placeholder={placeholder}
        />
      </div>

      {filteredData.length !== 0 && (
        <div className={styles.searchResultsWrapper}>
          {filteredData.slice(0, 10).map((element, index) => (
            <div
              key={index}
              className={styles.searchResult}
              onClick={() => handleSelectData(element)}
            >
              <p>{element}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
