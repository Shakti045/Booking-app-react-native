import {configureStore} from '@reduxjs/toolkit';
import { authslice } from '../slices/auth';
import { bookingslice } from '../slices/booking';
import { orderslice } from '../slices/order';
export const store=configureStore({
    reducer:{
        auth:authslice.reducer,
        booking:bookingslice.reducer,
        order:orderslice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>;
export default RootState;
export type AppDispatch = typeof store.dispatch;