import { useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
// import Avatar  from '@mui/material/Avatar';
import { Avatar } from '@mui/material';
import UserPhoto from '../assets/user.jpeg';
import { useTodo } from '../hooks/useTodo';
import { Link } from 'react-router-dom';

// Function Component
export function Header() {
    // React HOOK
    // const { searchTodo } = useTodo(); // *3
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        // searchTodo(e.target.value); // *edit
    };
    return (
        <header className='header'>
            {/* Icon */}
            <span className='header__icon'>
                <FaHome size={25} color='white' />
            </span>

            {/* App Name */}
            <h1>Todoist-Pavit</h1>

            {/* Search bar */}
            <div className='header__search__container'>
                <span className='header__search__icon'>
                    <FaSearch />
                </span>
                <input
                    type='text'
                    className='header__search__input'
                    placeholder='search'
                    onChange={handleChange}
                    value={searchValue}
                />
            </div>
            {/* Avatar */}
            <div>
                <Link to='/profile'>
                    <Avatar
                        src={UserPhoto}
                        alt='user-profile'
                        sx={{ width: 40, height: 40, cursor: 'pointer' }}
                    />
                </Link>
            </div>
        </header>
    );
}
