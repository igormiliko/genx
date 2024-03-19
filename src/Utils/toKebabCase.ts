export default (str: string): string  => {
    // Substituir underscores (_) por hífens (-)
    const stringWithHyphens = str.replace(/_/g, '-');

    // Converter camelCase para kebab-case
    const stringWithCamelCase = stringWithHyphens.replace(/[A-Z]/g, (match, index) => {
        // Adicionar hífen antes de letras maiúsculas, exceto no início da string
        return index !== 0 ? `-${match.toLowerCase()}` : match.toLowerCase();
    });

    // Converter snake_case para kebab-case
    return stringWithCamelCase.toLowerCase();
}