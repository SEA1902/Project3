import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import * as cartService from '~/services/cartService';
// import ItemCart from '~/components/ItemCart/ItemCart';
import Button from '~/components/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    

    return (
        <div>cart</div>
    
    );
}

export default Cart;
