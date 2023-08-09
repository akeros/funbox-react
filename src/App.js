import './App.css';
import { Card } from "./components/Card";
import { useCallback, useState } from "react";
import cardsData from './cards.json'

function App() {
  const [selectedCards, setSelectedCards] = useState([])

  const cardHandler = useCallback((id) => () => {
    setSelectedCards(prevState => {
      // проверка наличия id в массиве
      if (selectedCards?.includes(id)) {
        // удаление из массива выбранного элемента
        return prevState.filter(cardId => cardId !== id)
      } else {
        // добавление в массив выбранного элемента
        return [ ...prevState, id ]
      }
    })
  }, [selectedCards])

  return (
    <div className="App">
      <header className="App-header">
          <div className="headerText">Ты сегодня покормил кота?</div>
          <div className="mainBlock">
            {cardsData?.cards?.map(card => (
              <Card
                isSelected={selectedCards?.includes(card.id)}
                onClick={cardHandler(card.id)}
                key={card.id}
                id={card.id}
                size={card.size}
                flavor={card.flavor}
                description={card.description}
                selectedDescription={card.selectedDescription}
                title={card.title}
                flavorDescription={card.flavorDescription}
                info={card.info}
                union={card.union}
                disabled={card.ended}
              />
            ))}
          </div>
      </header>
    </div>
  );
}

export default App;
