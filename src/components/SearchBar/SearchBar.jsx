import { Component } from 'react';
import css from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  handleChangeSearch = e => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') {
      return;
    }
    this.props.handleSearchQuery(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSearch}>
          <button type="submit" className={css.searchFormButton}>
            <FaMagnifyingGlass />
          </button>

          <input
            onChange={this.handleChangeSearch}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
