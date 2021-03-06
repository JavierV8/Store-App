import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { shippingData } from '../../store/actions/OrderData';

const Shipping = props => {
    const { submit, backHandler } = props;
    const [validForm, setValidForm] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        country: 'Spain',
        address: '',
        zipCode: '',
        phone: '',
    });

    const submitHandler = e => {
        if (validForm) {
            e.preventDefault();
            dispatch(shippingData(form));
            submit();
        }
    };

    useEffect(() => {
        const validator = () => {
            const isValidName = form.name.length >= 3;
            const isValidAdress = form.address.length >= 1;
            const isValidZipCode = form.zipCode.length >= 5;
            const isValidPhone = form.phone > 0;

            if (isValidName && isValidAdress && isValidZipCode && isValidPhone)
                setValidForm(true);
        };

        validator();
    }, [form]);

    const handlerForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Form className="shipping-container">
            <FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Full Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="examplePassword"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handlerForm}
                        minLength="3"
                        required
                    />
                </FormGroup>
                <Label for="exampleSelect">country</Label>
                <Input type="select" name="country">
                    <option>Spain</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Italy</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Address</Label>
                <Input
                    type="text"
                    name="address"
                    id="examplePassword"
                    placeholder="Current address..."
                    value={form.address}
                    onChange={handlerForm}
                    minLength="1"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">ZIP Code</Label>
                <Input
                    type="text"
                    name="zipCode"
                    id="examplePassword"
                    placeholder="Enter full name"
                    value={form.zipCode}
                    onChange={handlerForm}
                    minLength="5"
                    // maxLength="8"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Phone Number</Label>
                <Input
                    type="number"
                    name="phone"
                    id="examplePassword"
                    placeholder="Current address..."
                    value={form.phone}
                    onChange={handlerForm}
                    pattern="/^[0-9]+$/"
                    required
                />
            </FormGroup>
            <div className="checkout-nextBack-buttons">
                <button
                    type="submit"
                    id="checkout-backButton-id"
                    className="checkout-nextButton"
                    onClick={e => backHandler(e)}
                >
                    Back
                </button>
                <button
                    type="submit"
                    id="checkout-nextButton-id"
                    className="checkout-nextButton"
                    onClick={e => submitHandler(e)}
                >
                    Next
                </button>
            </div>
        </Form>
    );
};

Shipping.propTypes = {
    submit: PropTypes.func.isRequired,
    backHandler: PropTypes.func.isRequired,
};

export default Shipping;
