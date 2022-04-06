import Facebook from 'assets/png/facebook.png';
import Ok from 'assets/png/ok.png';
import Instagram from 'assets/png/instagram.png';
import Vk from 'assets/png/vk.png';
import Youtube from 'assets/png/youtube.png';

const socialMediaLinks = [
  {
    image: Facebook,
    link: 'https://facebook.com',
  },
  {
    image: Ok,
    link: 'https://ok.ru',
  },
  {
    image: Vk,
    link: 'https://vkontakte.ru',
  },
  {
    image: Youtube,
    link: 'https://youtube.com',
  },
  {
    image: Instagram,
    link: 'https://instagram.com',
  },
];

const useFullLinks = [
  {
    label: 'Условия обмена и возврата',
    link: '#',
  },
  {
    label: 'Каталог',
    link: '#',
  },
  {
    label: 'Контакты',
    link: '#',
  },
  {
    label: 'Доставка',
    link: '#',
  },
  {
    label: 'Оплата',
    link: '#',
  },
];

const aboutSite = [
  {
    label: 'Клиентам',
    link: '#',
  },
  {
    label: 'Личный кабинет',
    link: '#',
  },
  {
    label: 'Блог',
    link: '#',
  },
  {
    label: 'Обратная связь',
    link: '#',
  },
];

const siteInfo = [
  {
    label: 'Информация',
    link: '#',
  },
  {
    label: 'Пользовательское соглашение',
    link: '#',
  },
  {
    label: 'Политика конфиденциальности и оферта',
    link: '#',
  },
];

export { socialMediaLinks, aboutSite, siteInfo, useFullLinks };
