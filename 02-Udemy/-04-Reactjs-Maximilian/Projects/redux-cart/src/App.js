import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { uiAction } from './store/ui-slice';

let isInitial = true;
function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiAction.showNotification({
                    status: 'pending',
                    title: 'Sending...',
                    message: 'Sending cart data.',
                })
            );
            const res = await fetch(
                'https://react-http-746b0-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!res.ok) {
                throw new Error('Sending cart data failed.');
            }
            dispatch(
                uiAction.showNotification({
                    status: 'Succss',
                    title: 'Success!',
                    message: 'Send cart data Successfully.',
                })
            );

            // const resData = await res.json();
        };

        if (isInitial) {
            isInitial = false;
            return;
        }
        sendCartData().catch((error) => {
            dispatch(
                uiAction.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Sending cart data failed',
                })
            );
        });
    }, [cart, dispatch]);
    return (
        <Fragment>
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </Fragment>
    );
}

export default App;
