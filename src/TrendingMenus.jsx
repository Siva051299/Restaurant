import React from 'react';

const TrendingMenus = () => {
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card trending-menus">
                    <div className="card-body">
                        <h5 className=" fs-20">Daily Trending Menus</h5>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex pb-2 border-bottom tr-row align-items-center"
                            >
                                <span className="num mx-3">#{index + 1}</span>
                                <div className="me-auto pe-3">
                                    <p className="my-2">{item.name}</p>
                                    <span className="text-black font-w600 d-inline-block me-3">
                                        ${item.price}
                                    </span>{' '}
                                    <span className="">Order {item.orders}x</span>
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width="60"
                                    className="rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const menuItems = [
    {
        name: 'Spicy Ramen Noodles',
        price: 8.5,
        orders: 120,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8PKmj7Cm_zznvXcXrCuXsn2bNUrYMaEbQg&s',
    },
    {
        name: 'Berry Smoothie',
        price: 4.2,
        orders: 95,
        image: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg',
    },
    {
        name: 'Grilled Chicken Caesar Salad',
        price: 10.5,
        orders: 78,
        image: 'https://hips.hearstapps.com/hmg-prod/images/47473872-10156939886597417-1406602751512674304-n-1547670271.jpg',
    },
    {
        name: 'Margherita Pizza',
        price: 9.0,
        orders: 150,
        image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/23/0/FN_healthy-fast-food-red-robin-avocado-cobb-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1516723515457.jpeg',
    },
    {
        name: 'Avocado Toast Poached Egg',
        price: 7.5,
        orders: 60,
        image: 'https://www.tastingtable.com/img/gallery/17-celebrity-chefs-and-their-favorite-fast-food-restaurants/l-intro-1674674335.jpg',
    },
];


export default TrendingMenus;
