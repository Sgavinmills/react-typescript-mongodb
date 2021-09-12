import "./HangedMan.css";

interface Props {
    incorrectLetters: string[];
}

export default function HangedMan(props:Props) {
  return (
    <div>
      <div className="gallows-container">
        { props.incorrectLetters.length > 0 &&  <div className="gallows-base"></div> }
        { props.incorrectLetters.length > 1 && <div className="gallows-stand"></div> }
        { props.incorrectLetters.length > 2 &&<div className="gallows-beam"></div> }
        { props.incorrectLetters.length > 3 && <div className="gallows-rope"></div> }
        { props.incorrectLetters.length > 4 &&  <div className="man-head"></div> }
        { props.incorrectLetters.length > 5 &&  <div className="man-body"></div> }
        { props.incorrectLetters.length > 6 &&  <div className="man-leftarm"></div> }
        { props.incorrectLetters.length > 7 &&   <div className="man-rightarm"></div> }
        { props.incorrectLetters.length > 8 && <div className="man-leftleg"></div> }
        { props.incorrectLetters.length > 9 &&  <div className="man-rightleg"></div> }
        { props.incorrectLetters.length > 10 &&  <div className="dead-message"><h1>DED</h1></div> }
      </div>
    </div>
  );
}
