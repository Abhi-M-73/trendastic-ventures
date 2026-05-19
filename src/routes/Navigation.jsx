// import React, { useEffect } from 'react'
// import ScrollToTop from '../components/ui/ScrollToTop';
// import Auth from './Auth';
// import Authenticate from './Authenticate';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// const Navigation = () => {
//     const { token, user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!user && token) {
//             dispatch(logout());
//         }
//     }, [user, token, dispatch]);

//     return (
//         <>
//             <ScrollToTop />
//             {token === null || user === null || token === "" || token === undefined ? (
//                 <Auth />
//             ) : (
//                 <Authenticate />
//             )}
//         </>
//     )
// }

// export default Navigation



import React, { useEffect } from 'react';
import ScrollToTop from '../components/ui/ScrollToTop';
import Auth from './Auth';
import Authenticate from './Authenticate';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const { token, user } = useSelector((state) => state.auth);
    console.log(token, user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && (user === null || user === undefined)) {
            dispatch(logout());
        }
    }, [user, token, dispatch]);

    return (
        <>
            <ScrollToTop />

            {!user || !token ? (
                <Auth />
            ) : (
                <Authenticate />
            )}
        </>
    );
};

export default Navigation;