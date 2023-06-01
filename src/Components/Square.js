export function Square({ value, onSquareClick, highlight, onRightClick }) {
    function getClassName() {
        if (!shouldMarkAsClicked()) {
            return value === 'B' ? "flag" : "square";
        }

        return  isBomb() ? "highlight" : "button";
    }


    function shouldMarkAsClicked() {
        return (value!= null && value !== 'B');
    }

    function isBomb() {
        return highlight && value === -1;
    }

    return (
        <button className={getClassName()} onClick={onSquareClick} onContextMenu={onRightClick}>
            {value}
        </button>
    );
}

