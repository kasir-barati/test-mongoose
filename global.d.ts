export declare global {
    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
}
