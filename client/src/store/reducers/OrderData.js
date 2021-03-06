import {
    CONFIRM_ORDER_PRODUCTS,
    CONFIRM_SHIPPING_DATA,
    CONFIRM_PAYMENT_DATA,
    CLEAN_ORDER_DATA,
} from '../actionTypes';

const initialState = {
    shippingData: {},
    paymentData: {},
    price: {},
    user: '',
    products: [],
};

const orderData = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_ORDER_PRODUCTS:
            return {
                ...state,
                price: { ...action.payload.price },
                user: action.payload.userId,
                products: [...action.payload.products],
            };
        case CONFIRM_SHIPPING_DATA:
            return {
                ...state,
                shippingData: { ...action.payload },
            };
        case CONFIRM_PAYMENT_DATA:
            return {
                ...state,
                paymentData: { ...action.payload },
            };
        case CLEAN_ORDER_DATA:
            return {
                ...state,
                shippingData: {},
                paymentData: {},
                price: {},
                user: '',
                products: [],
            };
        default:
            return state;
    }
};

export default orderData;
