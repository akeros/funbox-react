import React, {useCallback, useEffect, useMemo, useState} from "react";
import "../styles/card.css"
import cat from "../img/catBarsik.png"

const endedText = (text) => `Печалька, ${text} закончился.`

export const Card = React.memo((props) => {
  const {
    id,
    size,
    flavor,
    description,
    selectedDescription,
    title,
    flavorDescription,
    info,
    union,
    ended,
    isSelected,
    onClick,
  } = props

  // текст футера в зависимости от состояния
  const footerText = useMemo(() => {
    if (isSelected) {
      return flavorDescription;
    }

    if (ended) {
      return (
          <div className="footerCard footerCard-Disabled">{endedText(flavor)}</div>
      );
    }

    return (
      <span>
        Чего сидишь? Порадуй котэ, <button className="footerCard footerCard-link" onClick={onClick}>купи</button>.
      </span>
    )
  }, [isSelected, flavorDescription, ended, flavor, onClick])

  // выбор стилей в зависимости от состояния
  const cardStyle = useMemo(() => {
    if (isSelected) {
      return 'cardActive';
    }

    if (ended) {
      return 'cardDisabled';
    }

    return 'card';
  }, [isSelected, ended])

  const [currentDescription, setCurrentDescription] = useState(description)

  // очистка текста при отмене выбора
  useEffect(() => {
    if (!isSelected && description !== currentDescription) {
      setCurrentDescription(description)
    }
  }, [currentDescription, description, isSelected])

  // функция замены текста при наведении на выбранную карточку
  const hoverStart = useCallback(() => {
    if (isSelected) {
      setCurrentDescription(selectedDescription)
    }
  }, [selectedDescription, isSelected])

  // функция возврата стартового текста
  const hoverEnd = useCallback(() => {
    if (description !== currentDescription) {
      setCurrentDescription(description)
    }
  }, [currentDescription, description])

  return (
    <div className="card-main" style={{ gridArea: id }}>
      <button
        className={`card ${cardStyle}`}
        onClick={ended ? () => {} : onClick}
        onMouseEnter={hoverStart}
        onMouseLeave={hoverEnd}
      >
        <div className={`card-linear ${cardStyle}-linear`}/>
        <div className={`card-weight ${cardStyle}-weight`}>
          <div className="card-weight_number">{size}</div>
          <div className="card-weight_string">{union}</div>
        </div>
        <img className={ended ? "card-catImage card-catImageDisabled" : "card-catImage"} src={cat} alt={cat}/>
        <div className={ended ? "card-title card-titleDisabled" : "card-title"}>
          <div className="card-title_low">{currentDescription}</div>
          <div className="card-title_high">{title}</div>
          <div className="card-title_medium">{flavor}</div>
          {info?.map(({count, text}) => (
            <div className="card-title_flavorDescription" key={text}><span><span className={"card-title_flavorDescriptionNumber"}>{count}{" "}</span>{text}</span></div>
          ))}
        </div>
      </button>
      <div className="footerCard">{footerText}</div>
    </div>
  )
})

Card.displayName = 'Card'