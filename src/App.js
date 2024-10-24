import { useEffect, useState } from 'react';
import './app.scss';
import BlockComponents from './components/blockComponents';
import CountDownTime from './components/countDownTime';

const numRows = 9;
const numCols = 14;
const numImages = 21;

const data2 = [];

for (let x = 0; x < numRows; x++) {
  for (let y = 0; y < numCols; y++) {
    const imgIndex = (x * numCols + y) % numImages + 1;
    const cellData = {
      id: imgIndex,
      type: `anh${imgIndex}.png`,
      x: x,
      y: y,
      creatAt: `${x}-${y}`,
      pick: false,
      img: `images/imgBlock/${imgIndex}.png`
    };
    data2.push(cellData);
  }
}

const blocks = Array.from({ length: numRows }, (_, x) =>
  data2.filter(block => block.x === x)
);

function App() {
  const [blocksState, setBlocks] = useState(blocks);
  const [count, setCount] = useState(0);
  const [pickedBlocks, setPickedBlocks] = useState([]);

  const renderBlock = () => {
    return blocksState.map((row, rowIndex) => (
      <div className="block-row" key={rowIndex}>
        {row.map(block => (
          <BlockComponents
            key={block.creatAt}
            block={block}
            handleClick={handleClick}
          />
        ))}
      </div>
    ));

  };

  useEffect(() => {
    if (pickedBlocks.length === 2) {
      checkMatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedBlocks]);

  const handleClick = (creatAt) => {
    if (pickedBlocks.length < 2) {
      const updatedBlocks = blocksState.map(row =>
        row.map(block =>
          block.creatAt === creatAt ? { ...block, pick: true } : block
        )
      );
      setBlocks(updatedBlocks);

      const newPickedBlocks = [...pickedBlocks, blocksState.flat().find(block => block.creatAt === creatAt)];
      setPickedBlocks(newPickedBlocks);

      setCount(count + 1);
    }
  };

  const checkMatch = () => {
    if (pickedBlocks.length !== 2) return;

    const [block1, block2] = pickedBlocks;

    if (block1.id === block2.id) {
      const updatedBlocks = blocksState.map(row =>
        row.map(block =>
          block.creatAt === block1.creatAt || block.creatAt === block2.creatAt
            ? { ...block, pick: false, removed: true }
            : block
        )
      );
      setBlocks(updatedBlocks);
    } else {
      const updatedBlocks = blocksState.map(row =>
        row.map(block =>
          block.creatAt === block1.creatAt || block.creatAt === block2.creatAt
            ? { ...block, pick: false }
            : block
        )
      );
      setBlocks(updatedBlocks);
    }
    setPickedBlocks([]);
  };


  return (
    <div className='container'>
      <h1 className='app-title'>GAME PIKACHU</h1>
      <div className='app-container'>
        <div className='app__time'>
          <CountDownTime />
        </div>
        <div className='app__block'>
          {renderBlock()}
        </div>
      </div>
    </div>
  );
}

export default App;
