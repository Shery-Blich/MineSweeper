class mineFieldManager {
    constructor(size = 10) {
        this.size = size;
        this.bombs = new Set(Array.from({length: Math.floor(Math.random() * size) + size}, () => Math.floor(Math.random() * size * size)));
        this.mine = Array(this.size * this.size).fill(0);
        this.generateMineField();
    }

    generateMineField() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const index = i * this.size + j;
                this.mine[index] = this.countNearbyBombs(index);
            }
        }
    }

    countNearbyBombs(index) {
        const neighbors = this.getNeighbors(index);
        let counter = 0;

        neighbors.forEach((neighbor) => {
            if (this.isBomb(neighbor)) {
                counter++;
            }
        })

        return counter;
    }

    getNeighbors(i) {
        let neighbors = [];

        if (i - this.size >= 0) {
            const up = i - this.size;
            neighbors.push(up);
        }

        if (i + this.size < this.mine.length) {
            const down = i + this.size;
            neighbors.push(down);
        }

        if (i % this.size !== 0) {
            const left = i - 1;
            const upLeft = i - 11;
            const downLeft = i + 9;

            neighbors.push(left);
            neighbors.push(upLeft);
            neighbors.push(downLeft);
        }

        if (i % this.size !== 9) {
            const right = i + 1;
            const upRight = i - 9;
            const downRight = i + 11;

            neighbors.push(right);
            neighbors.push(upRight);
            neighbors.push(downRight);
        }

        return neighbors;
    }

    isBomb(i) {
        return this.bombs.has(i) ? 1 : 0;
    }

    getAllLinkedSquares(i) {
        let linkedZeros = [];
        let copiedMine = [...this.mine];

        return new Set(this.getAllLinkedZeros(i, copiedMine, linkedZeros));
    }

    getAllLinkedZeros(i, copiedMine, linkedZeros) {
        if (i < 0 || copiedMine.length <= i) {
            return [];
        }

        if (copiedMine[i] !== 0) {
            if (copiedMine[i] === -1) {
                return [];
            }

            return [i];
        }

        linkedZeros = [i];
        copiedMine[i] = -1;
        const neighbors = this.getNeighbors(i);

        neighbors.forEach((neighbor) => {
            linkedZeros.push(...this.getAllLinkedZeros(neighbor, copiedMine, linkedZeros));
        });

        return linkedZeros;
    }
}

export default mineFieldManager;