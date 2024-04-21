import React, { useEffect, useState } from 'react'
import CardComponent from './CardComponent'
import { useDispatch, useSelector } from 'react-redux';

const Cards = () => {
    const [itemId, setItemId] = useState(null)
    const result = useSelector((store) => store.market);
    const resultKart = useSelector((store) => store.kart.item);

    return (

        <div className='-z-50 mt-20 mx-2 lg:mx-0 justify-center   lg:flex  lg:flex-wrap'>
            {
                result.market.map((element, index) => {
                    let isInKart = false;
                    const item = [];
                    for (let key in element) {
                        item.push(element[key])
                    }
                    if (resultKart) {

                        resultKart.forEach(element => {
                            if (element._id === item[0]) {
                                isInKart = true;
                            }
                        });
                    }
                    return (
                        <CardComponent key={index} isInKart={isInKart} item={item} />
                    )
                })
            }
        </div>
    )
}

export default Cards