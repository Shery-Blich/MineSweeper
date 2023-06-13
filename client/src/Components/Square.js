export function Square({ value, onSquareClick, isGameOver, onRightClick }) {
    function getClassName() {
        if (!shouldMarkAsClicked()) {
            return value === 'B' ? "flag" : "square";
        }

        return isBomb() ? "highlight" : "button";
    }

    function shouldMarkAsClicked() {
        return (value!= null && value !== 'B');
    }

    function isBomb() {
        return isGameOver && value === -1;
    }

    return (
        <button disabled={isGameOver || shouldMarkAsClicked()} className={getClassName()} onClick={onSquareClick} onContextMenu={onRightClick}>
            {value}
        </button>
    );
}

