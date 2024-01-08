import { useState } from 'react';
import css from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const SearchBar = ({ handleSearchQuery }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearch = e => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return;
    }
    handleSearchQuery(searchValue);
    setSearchValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <button type="submit" className={css.searchFormButton}>
          <FaMagnifyingGlass />
        </button>

        <input
          onChange={handleChangeSearch}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
