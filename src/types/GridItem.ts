export type GridItem = {
    item: number | null; //qual  carta é; pego pelo índex
    shown: boolean; //se está sendo exibida ou não
    permanentShown: boolean; //quando acerta, a carta é exibida permanentemente
}