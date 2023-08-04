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

  const footerText = useMemo(() => {
    switch (true) {
      case isSelected:
        return flavorDescription;
      case ended:
        return endedText(flavor);
      default:
        return (
          <>
            Чего сидишь? Порадуй котэ,<span className="footerCard-link" onClick={onClick}> купи.</span>
          </>
        )
    }
  }, [isSelected, flavorDescription, ended, flavor, onClick])

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
        className={cardStyle}
        onClick={ended ? () => {} : onClick}
        onMouseEnter={hoverStart}
        onMouseLeave={hoverEnd}
      >
        <div className={`${cardStyle}-linear`} />
        <div className={`card-weight ${cardStyle}-weight`}>
          <div className="card-weight_number">{size}</div>
          <div className="card-weight_string">{union}</div>
        </div>
        <img className="card-catImage" src={cat} alt={"Красивый кот"}/>
        <div className="card-title">
          <div className="card-title_low">{currentDescription}</div>
          <div className="card-title_high">{title}</div>
          <div className="card-title_medium">{flavor}</div>
          {info?.map((text) => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </button>
      <div className="footerCard">{footerText}</div>
    </div>
  )
})

Card.displayName = 'Card'