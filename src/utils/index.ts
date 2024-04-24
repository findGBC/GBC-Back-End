export function convertSnakeCaseToTitleCase(snakeCaseStr: string): string {
    return snakeCaseStr.toLowerCase()
        .split('_')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}
