import React from 'react';
import { Button } from 'components/button';
import { Typography } from '@mui/material';
import {
  OrderCardStyle,
  OrderImg,
  OrderBlock,
  OrderImgBlock,
  OrderImgTexts,
} from 'components/orders';

interface OrderProps {
  order: {
    id: string;
    status: string;
    isPaid: boolean;
    created: any;
    fulfillments: ({
      status: string;
    } | null)[];
    lines: ({
      productName: string;
      thumbnail?: {
        url: string;
        alt?: string | null | undefined;
      } | null | undefined;
    } | null)[]
  }
  
}

const OrdersCard: React.FC<OrderProps> = ({ order }) => {

  
  return (
    <OrderCardStyle>
      <OrderBlock>
        <OrderImgBlock>
          <OrderImg src={order.lines[0]?.thumbnail?.url} alt={order.lines[0]?.thumbnail?.alt || "productImg"} />
          <OrderImgTexts>
            <Typography variant='body1'></Typography>
            <Typography variant='body2'>{order.created} Доставлен</Typography>
          </OrderImgTexts>
        </OrderImgBlock>
        <div>
          <Typography mb={1.5} variant='h2' sx={{ fontSize: '16px' }}>{order.id}</Typography>
          <Typography variant='h3' sx={{ maxWidth: '315px' }}>{order.lines[0]?.productName}</Typography>
        </div>
      </OrderBlock>
      <div>
        <Button
          type='button'
          sx={{
            ":hover": {
              backgroundColor: '#8E8E8E',
            },
            padding: '33px',
            color: '#000',
            backgroundColor: '#8E8E8E'
          }}
        >Завершенный</Button>
      </div>
    </OrderCardStyle>
  )
}

export default OrdersCard 