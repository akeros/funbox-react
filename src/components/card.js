import "../styles/card.css"
import cat from "../img/catBarsik.png"
import {useState} from "react";

export const Card = ({weightNumber, eat}) => {
    const[selected,setSelected] = useState(false)
    return (
        <div className="cardName-main">
            <div className={!selected ? "cardName" : "cardNameRed"} onClick={()=> setSelected(prevState => !prevState)}>
                <div className={!selected ? "cardName-linear" : "cardName-linearRed"} />
                <div className={!selected ? "cardName-weight" : "cardName-weightRed"}>
                    <div className="cardName-weight_number">{weightNumber}</div>
                    <div className="cardName-weight_string">кг</div>
                </div>
                <img className="cardName-catImage" src={cat} alt={"Красивый кот"}/>
                <div className="cardName-title">
                    <div className="cardName-title_low">Сказочное заморское яство</div>
                    <div className="cardName-title_high">Нямушка</div>
                    <div className="cardName-title_medium">{eat}</div>
                </div>
            </div>
            {!selected
                ? (
                <div className="footerCard">Чего сидишь? Порадуй котэ,<span className="footerCard-link" onClick={()=> setSelected(prevState => !prevState)} > купи.</span> </div>
            ) : (
                <div className="footerCard">Печень утки разварная с артишоками.</div>
                )}

        </div>
    )
}