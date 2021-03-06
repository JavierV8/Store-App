import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Box from '../components/orders/box';
import OrderDetails from '../components/orders/OrderDetails';
import { api } from '../helpers/constants';

const Orders = () => {
    const [isvisible, setIsVisible] = useState(true);
    const [orderInfo, setOrderInfo] = useState({
        DeliveryAddress: false,
        OrderDate: false,
        DeliveryTime: false,
        SubTotal: false,
        DeliveryFee: false,
        Total: false,
        products: [],
    });
    const boxClose = () => setIsVisible(false);
    const userId = useSelector(state => state.auth.userId);
    const [orders, setOrders] = useState([]);

    const handleUserKeyPress = () => {
        const box = document.getElementById('prueba');
        const up = document.getElementById('prueba2');
        const down = document.getElementById('prueba3');
        const result = box && up && box.offsetHeight - up.offsetHeight;
        if (down) down.style.height = `${result - 20}px`;
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const token = Cookies.get('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                };
                const req = await Axios.post(
                    `${api}/orders`,
                    {
                        userId,
                    },
                    { headers }
                );
                setOrders([...req.data]);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        window.addEventListener('resize', handleUserKeyPress);
        handleUserKeyPress();
        return () => {
            window.removeEventListener('resize', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const boxOpen = id => {
        setIsVisible(true);
        const orderData = orders[id];
        setOrderInfo({
            ...orderInfo,
            DeliveryAddress: orderData.shippingData.address,
            OrderDate: orderData.dateOrder,
            DeliveryTime: false,
            SubTotal: orderData.price.pvp,
            DeliveryFee: false,
            Total: orderData.price.total,
            products: orderData.products.map(product => ({ ...product })),
        });
    };

    return (
        <div className="orders-container">
            <div className="orders-ordersList">
                <h4>My Orders</h4>
                {orders.map((order, i) => (
                    <Box
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        id={i}
                        price={order.price.total}
                        date={order.dateOrder}
                        viewOrder={id => boxOpen(id)}
                    />
                ))}
            </div>
            {isvisible && (
                <OrderDetails boxToggle={boxClose} orderInfo={orderInfo} />
            )}
        </div>
    );
};

export default Orders;
