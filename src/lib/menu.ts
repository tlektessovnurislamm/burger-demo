import classic from '@/assets/burger-classic.jpg';
import chicken from '@/assets/burger-chicken.jpg';
import double from '@/assets/burger-hero.jpg';
import fries from '@/assets/fries.jpg';

export const products = [
  { id: 'classic', name: 'Классик бургер', description: 'Сочная говядина, чеддер, свежие овощи и наш фирменный соус', price: 390, weight: '280 г', category: 'Бургеры', image: classic, badge: 'ХИТ', kind: 'hit' },
  { id: 'double', name: 'Дабл чиз', description: 'Две говяжьи котлеты, двойной чеддер и карамельный лук', price: 540, weight: '360 г', category: 'Бургеры', image: double, badge: 'ДВОЙНОЙ ВКУС', kind: 'double' },
  { id: 'chicken', name: 'Криспи чикен', description: 'Хрустящая курочка, салат, огурчики и нежный соус', price: 350, weight: '260 г', category: 'Бургеры', image: chicken, badge: 'НОВИНКА', kind: 'new' },
  { id: 'fries', name: 'Картофель фри', description: 'Золотистый и хрустящий. С сырным соусом — ещё вкуснее', price: 190, weight: '150 г', category: 'Закуски', image: fries, badge: '', kind: '' },
  { id: 'lemonade', name: 'Домашний лимонад', description: 'Лимон, свежая мята и немного летнего настроения', price: 190, weight: '400 мл', category: 'Напитки', image: null, badge: '', kind: '' },
];

export type Product = (typeof products)[number];
export const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`;