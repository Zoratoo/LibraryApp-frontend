export const maskPhone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
};

export const maskCep = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
};

export const maskCpf = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskPublicationYear = (value) => {
    return value.replace(/\D/g, '').slice(0, 4); 
};

export const maskQuantity = (value) => {
    return value.replace(/\D/g, '').slice(0, 5); 
};

export const maskPrice = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (numericValue / 100).toFixed(2).replace('.', ',');
    return `R$ ${formattedValue}`;
};