import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, MapPin, ShoppingBag, ArrowUpRight, ArrowRight, Plus, Minus, Beef, Flame, Leaf, Utensils, CupSoda, Hamburger, Heart, Sparkles, Info, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { products, formatPrice } from '@/lib/menu';
import heroImage from '@/assets/burger-hero.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: "CHEF'S FOOD — бургеры с характером" },
    { name: 'description', content: "Сочные бургеры, хрустящие закуски и любимые вкусы. Выбирайте своё в меню CHEF'S FOOD." },
    { property: 'og:title', content: "CHEF'S FOOD — бургеры с характером" },
    { property: 'og:description', content: "Знакомьтесь с меню CHEF'S FOOD: бургеры, закуски и напитки." },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() {
  return <a href="#" className="brand" aria-label="CHEF'S FOOD — главная"><Hamburger className="brand-icon" /><div><strong>CHEF&#39;S</strong><span>FOOD</span></div></a>;
}

const INSTAGRAM_URL = 'https://www.instagram.com/cf_kandyagash';
const WHATSAPP_NUMBER = '77086202071';

function SocialLinks({ className = '' }: { className?: string }) {
  return <div className={`social-links ${className}`}>
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="CHEF'S FOOD в Instagram"><Instagram size={19} /></a>
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"><MessageCircle size={19} /></a>
  </div>;
}

const categories =  [ { name: 'Всё меню', icon: Utensils }, { name: 'Бургеры', icon: Hamburger }, { name: 'Закуски', icon: Flame }, { name: 'Напитки', icon: CupSoda } ];

function Index() {
  const [category, setCategory] = useState('Всё меню');
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const count = Object.values(basket).reduce((sum, n) => sum + n, 0);
  const total = products.reduce((sum, p) => sum + p.price * (basket[p.id] || 0), 0);
  const visible = products.filter(p => category === 'Всё меню' ? p.category !== 'Напитки' : p.category === category);
  function changeQuantity(id: string, amount: number) {
    setBasket(current => ({ ...current, [id]: Math.max(0, (current[id] || 0) + amount) }));
  }
  function Quantity({ id }: { id: string }) {
    return <div className="quantity"><Button variant="category" size="icon" className="add-button" aria-label={`Убрать ${products.find(p => p.id === id)?.name}`} onClick={() => changeQuantity(id, -1)}><Minus /></Button><span>{basket[id]}</span><Button variant="cafe" size="icon" className="add-button" aria-label={`Добавить ${products.find(p => p.id === id)?.name}`} onClick={() => changeQuantity(id, 1)}><Plus /></Button></div>;
  }
  return <>
    <header className="site-header page-width">
      <Button variant="ghost" size="icon" className="mobile-toggle" aria-label="Открыть меню" onClick={() => setNavigationOpen(true)}><Menu /></Button>
      <Brand />
      <nav className="nav-links" aria-label="Основная навигация"><a className="active" href="#menu">Меню</a><a href="#special">Вкусный момент</a><a href="#about">О нас</a><a href="#contacts">Контакты</a></nav>
      <div className="header-right"><span className="location"><MapPin size={15} /> Ваш любимый бургер</span><Button variant="cafe" className="cart-button" onClick={() => setBasketOpen(true)} aria-label={`Корзина, ${count} товаров`}><ShoppingBag /><span className="cart-label">Корзина</span><span className="cart-count">{count}</span></Button></div>
    </header>
    <main>
      <section className="hero">
        <img src={heroImage} className="hero-photo" width={1536} height={1024} alt="Сочный двойной бургер с чеддером и свежими овощами" fetchPriority="high" />
        <div className="hero-inner page-width">
          <div className="eyebrow">НАСТОЯЩИЕ БУРГЕРЫ. НАСТОЯЩИЙ ВКУС.</div>
          <h1>БУРГЕРЫ<br /><em>С ХАРАКТЕРОМ.</em></h1>
          <p className="hero-copy">Сочная котлета. Тёплая булочка.<br />Тот самый вкус, ради которого возвращаются.</p>
          <Button asChild variant="cafe" className="hero-cta"><a href="#menu">Выбрать свой бургер <ArrowRight /></a></Button>
          <div className="hero-bottom"><span><Beef /> 100% говядина</span><span><Flame /> Готовим на огне</span><span><Heart /> С любовью к еде</span></div>
          <div className="hero-sticker"><span>БОЛЬШЕ</span><strong>ВКУСА</strong><span>В КАЖДОМ УКУСЕ</span></div>
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({ length: 8 }, (_, i) => <span key={i}>СОЧНО. ЧЕСТНО. ПО-НАСТОЯЩЕМУ. <Sparkles size={15} /> ТВОЙ НОВЫЙ ЛЮБИМЫЙ БУРГЕР <Sparkles size={15} /></span>)}</div></div>
      <section id="menu" className="menu-section page-width">
        <div className="section-heading"><div><h2>Ну что, по бургеру?</h2><p>Выбирай любимый. Или найди нового фаворита.</p></div><span className="menu-note"><Info size={13} /> Примерное меню</span></div>
        <div className="categories" aria-label="Категории меню">{categories.map(c => <Button key={c.name} variant={category === c.name ? 'cafe' : 'category'} onClick={() => setCategory(c.name)} aria-pressed={category === c.name}><c.icon />{c.name}</Button>)}</div>
        <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}>
          <div className="product-picture">{p.badge && <span className={`product-badge ${p.kind}`}>{p.badge}</span>}{p.image ? <img src={p.image} alt={p.name} width={1024} height={768} loading="lazy" /> : <div className="drink-picture"><CupSoda /></div>}</div>
          <div className="product-info"><div className="product-title"><h3>{p.name}</h3><span>{p.weight}</span></div><p>{p.description}</p><div className="product-footer"><strong className="product-price">{formatPrice(p.price)}</strong>{basket[p.id] ? <Quantity id={p.id} /> : <Button variant="cafe" size="icon" className="add-button" onClick={() => changeQuantity(p.id, 1)} aria-label={`Добавить ${p.name}`}><Plus /></Button>}</div></div>
        </article>)}</div>
      </section>
      <section id="special" className="promo-band"><div className="promo-inner page-width"><Hamburger className="promo-icon" /><div><h2>Хороший день начинается с бургера.</h2><p>Добавь хрустящий фри — и пусть весь мир подождёт.</p></div><Button variant="cafe" asChild><a href="#menu" onClick={() => setCategory('Закуски')}>Добавить к бургеру <ArrowUpRight /></a></Button></div></section>
      <section id="about" className="about-band page-width"><h2>Без лишнего.<br />Только хороший вкус.</h2><div><Beef size={27} /><h3>Всё дело в ингредиентах</h3><p>Мягкая булочка, сочная котлета и свежие овощи. Ничего лишнего — всё на своём месте.</p></div><div><Leaf size={27} /><h3>Сделано с характером</h3><p>Любим классику, не боимся нового и верим: хороший бургер говорит сам за себя.</p></div></section>
    </main>
    <footer id="contacts"><div className="footer-inner page-width"><Brand /><p>© 2026 CHEF'S FOOD · Сделано с аппетитом<br />Меню и цены демонстрационные. Контакты кафе появятся позже.</p></div></footer>
    {count > 0 && <Button className="mobile-cart" variant="cafe" onClick={() => setBasketOpen(true)}><span className="flex items-center gap-2"><ShoppingBag /> Корзина · {count}</span><span>{formatPrice(total)} <ArrowRight className="inline ml-2" /></span></Button>}
    <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}><SheetContent className="cafe-sheet"><SheetTitle><Brand /></SheetTitle><SheetDescription className="sr-only">Навигация CHEF'S FOOD</SheetDescription><nav className="drawer-nav">{[{name:'Главная',href:'#'}, {name:'Меню',href:'#menu'}, {name:'Вкусный момент',href:'#special'}, {name:'О нас',href:'#about'}, {name:'Контакты',href:'#contacts'}].map(link => <a key={link.name} href={link.href} onClick={() => setNavigationOpen(false)}>{link.name}<ArrowUpRight size={20} /></a>)}</nav><div className="drawer-note"><h3>ТВОЙ БУРГЕР ЖДЁТ.</h3><p>Большой вкус. Маленький повод порадовать себя.</p><Button variant="cafe" asChild><a href="#menu" onClick={() => setNavigationOpen(false)}>В меню <ArrowRight /></a></Button></div></SheetContent></Sheet>
    <Sheet open={basketOpen} onOpenChange={setBasketOpen}><SheetContent className="cafe-sheet"><SheetTitle className="font-display text-3xl uppercase">Твой заказ</SheetTitle><SheetDescription>Всё самое вкусное — здесь.</SheetDescription>{count === 0 ? <div className="empty-basket"><ShoppingBag /><h3>Пока пусто</h3><p>Самое время выбрать любимый бургер.</p><Button variant="cafe" asChild><a href="#menu" onClick={() => setBasketOpen(false)}>Посмотреть меню <ArrowRight /></a></Button></div> : <>{products.filter(p => (basket[p.id] || 0) > 0).map(p => <div className="basket-item" key={p.id}>{p.image ? <img src={p.image} alt={p.name} /> : <CupSoda />}<div><h3>{p.name}</h3><span className="text-xs text-muted-foreground">{p.weight}</span><div className="basket-line"><Quantity id={p.id} /><strong>{formatPrice(p.price * (basket[p.id] || 0))}</strong></div></div></div>)}<div className="basket-total"><span>Итого</span><span>{formatPrice(total)}</span></div><div className="demo-note"><BadgeCheck size={20} className="mb-2 text-primary" />Это пример заказа. Приём заказов пока не подключён — настоящее меню скоро появится.</div><Button variant="category" className="mt-5 w-full" onClick={() => setBasketOpen(false)}>Продолжить выбирать <ArrowRight /></Button></>}</SheetContent></Sheet>
  </>;
}
