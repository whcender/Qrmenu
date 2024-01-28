export type categoryType = {
    name: string;
    image: string;
}[];

export type productType = {
    id: number & string;
    image: string;
    name: string;
    description: string;
    price: number;
}[];

export type oneCategoryType = {
    id: number & string;
    name: string;
    image: string;
}

export type oneProductType = {
    id: number & string;
    image: string;
    name: string;
    description: string;
    price: number;
};