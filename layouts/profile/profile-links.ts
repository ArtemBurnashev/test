import Bag from 'components/icons/bag';
import Bell from 'components/icons/bell';
import Document from 'components/icons/document';
import Heart from 'components/icons/heart';
import Location from 'components/icons/location';

export default [
  {
    href:'/profile',
    label: 'Персональные данные',
    icon: Document,
  },
  {
    href:'/profile/orders',
    label: 'Мои заказы',
    icon: Bag,
  },
  {
    href:'/profile',
    label: 'Адреса',
    icon: Location,
  },
  {
    href:'/profile',
    label: 'Избранные товары',
    icon: Heart,
  },
  {
    href:'/profile',
    label: 'Уведомления',
    icon: Bell,
  },
];
