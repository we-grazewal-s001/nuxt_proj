export function splitCamelCase(input: string): string {

    const regex = /([a-z])([A-Z])/g;

    const result = input.replace(regex, '$1 $2');

    return result;
}