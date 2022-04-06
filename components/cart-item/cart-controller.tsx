import { Stack, Typography } from '@mui/material';
import Minus from 'components/icons/minus';
import Plus from 'components/icons/plus';
import colors from 'config/theme';
import React from 'react';
import { removeItem, toggleAmout } from 'redux-state/features/cart/cart-slice';
import { useAppDispatch } from 'redux-state/hook';
import { ControllerButton, ControllerWrapper } from './cart-item.styles';

const CartController: React.FC<{ count: number; id: string }> = ({
  count,
  id,
}) => {
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    if (count > 1) return dispatch(toggleAmout({ id, type: 'decrement' }));
    dispatch(removeItem(id));
  };

  return (
    <ControllerWrapper>
      <ControllerButton onClick={handleDecrement}>
        <Minus />
      </ControllerButton>
      <Stack
        sx={{
          backgroundColor: colors.grey.controller,
          height: '100%',
          maxWidth: '8rem',
          minWidth: "3rem",
          width: "100%",
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        {count}
      </Stack>
      <ControllerButton
        onClick={() => dispatch(toggleAmout({ id, type: 'increment' }))}
      >
        <Plus />
      </ControllerButton>
    </ControllerWrapper>
  );
};

export default CartController;
