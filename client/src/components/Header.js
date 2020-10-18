import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

import toggleMenu from '../store/actions/menuToggle';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({ search: '' });
    const [isVisivle, setIsVisible] = useState(false);

    const toggleMenuHandler = () => dispatch(toggleMenu());
    const redirectHandler = () => {
        history.push('/');
    };
    const inputHandler = e => {
        const { name, value } = e.target;
        setForm(oldForm => {
            return {
                ...oldForm,
                [name]: value,
            };
        });
        history.push({ pathname: `/search/${value}` });
    };
    const handleUserKeyPress = e => {
        if (e.target.className !== 'header-user-image') setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleUserKeyPress);

        return () => {
            window.removeEventListener('click', handleUserKeyPress);
        };
    }, []);

    const clickHandler = () => {
        setIsVisible(val => !val);
    };

    return (
        <div className="Header-container">
            <button
                className="Header-button"
                onClick={toggleMenuHandler}
                type="button"
            >
                <div className="Header-butto-linen" />
                <div className="Header-butto-linen" />
                <div className="Header-butto-linen" />
            </button>
            <div
                className="header-home"
                onClick={redirectHandler}
                role="button"
            >
                <h1 className="header-home-link">E</h1>
                <h1 className="header-home-link-2">commerce</h1>
            </div>
            <div className="header-search">
                <img
                    src={process.env.PUBLIC_URL + 'images/search.png'}
                    className="header-search-image"
                    alt="img"
                />
                <input
                    className="header-search-input"
                    placeholder="Search your product"
                    name="search"
                    value={form.search}
                    onChange={e => inputHandler(e)}
                />
            </div>
            <div className="header-login">
                <img
                    src={process.env.PUBLIC_URL + 'images/user.png'}
                    alt="img"
                    className="header-user-image"
                    onClick={clickHandler}
                    role="button"
                />
                {isVisivle && (
                    <div className="header-user-box">
                        <div className="header-triangle"></div>
                        <div>
                            <p>Welcome, User!</p>
                            <p>Enjoy your shopping</p>
                        </div>
                        <NavLink extact to="/settings">
                            <button type="button">Settings</button>
                        </NavLink>
                        <NavLink extact to="/orders">
                            <button type="button">My Purchases</button>
                        </NavLink>

                        <button type="button" className="header-logOut-button">
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
