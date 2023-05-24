import { useState, useEffect } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
// import Avatar  from '@mui/material/Avatar';
import { Avatar } from '@mui/material';
import UserPhoto from '../assets/user.jpeg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchTodo } from '../stores/slices/todoSlice';

// Function Component
export function Header() {
    // React HOOK
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    // Debouncing
    useEffect(() => {
        const id = setTimeout(() => {
            // console.log('useEffect')
            dispatch(searchTodo({ searchValue: searchValue }));
        }, 2000);

        return () => {
            console.log('Cleanup');
            clearTimeout(id);
        };
    }, [searchValue]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        // dispatch(searchTodo({ searchValue: e.target.value }));
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
