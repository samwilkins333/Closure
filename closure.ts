class FunctionalDependency {
    public readonly determiners: string;
    public readonly determined: string;

    constructor(from: string, to: string) {
        this.determiners = from.toUpperCase();
        this.determined = to.toUpperCase();
    }

}

function isSubset(subset: string, superset: Set<string>) {
    subset = subset.toUpperCase();
    for (const char of subset) {
        if (!superset.has(char)) {
            return false;
        }
    }
    return true;
}

function toSetNotation(target: Set<string>) {
    return `{${Array.from(target).join(', ')}}`;
}

function closure(attributes: string, dependencies: FunctionalDependency[]) {
    let results = new Set(attributes.toUpperCase());
    const processed = new Set<string>();
    let iteration = -1;
    while (true) {
        iteration++;
        console.log(`The results set is ${toSetNotation(results)} after ${iteration} iteration${iteration === 1 ? '' : 's'}`);
        let added: string[] = [];
        dependencies.forEach(({ determiners, determined }) => {
            if (isSubset(determiners, results) && !processed.has(determined)) {
                added.push(determined);
                processed.add(determined);
            }
        });
        if (added.length) {
            for (const char of added.join('')) {
                results.add(char);
            }
        } else {
            break;
        }
    }

    console.log(`\nThe closure of ${attributes} is ${toSetNotation(results)}\n`);
}

closure('AG', [
    new FunctionalDependency('A', 'B'),
    new FunctionalDependency('A', 'C'),
    new FunctionalDependency('CG', 'H'),
    new FunctionalDependency('CG', 'I'),
    new FunctionalDependency('B', 'H'),
    new FunctionalDependency('I', 'JM'),
]);

closure('CD', [
    new FunctionalDependency('A', 'BC'),
    new FunctionalDependency('B', 'CE'),
    new FunctionalDependency('A', 'E'),
    new FunctionalDependency('AC', 'H'),
    new FunctionalDependency('D', 'B'),
]);

closure('A', [
    new FunctionalDependency('AD', 'BC'),
    new FunctionalDependency('AC', 'E'),
    new FunctionalDependency('B', 'D'),
    new FunctionalDependency('E', 'D'),
]);

