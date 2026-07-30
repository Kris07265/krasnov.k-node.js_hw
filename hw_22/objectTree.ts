interface objectTree {
    value: number;
    child: objectTree | null;
}

function createTree(depth: number) : objectTree | null {
    if (depth <= 0) {
        return null;
    }

    return {
        value: depth,
        child: createTree(depth - 1)
    };
}