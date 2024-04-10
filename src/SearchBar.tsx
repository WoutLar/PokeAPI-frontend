import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
        onSearch(inputValue.trim());
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Search Pokemon..."
                value={query}
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchBar;
