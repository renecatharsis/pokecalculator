export interface CatchRateOutputNoticeDto {
    path: string;
    message: string;
}

export interface CatchRateOutputDto {
    probability: number;
    notices: CatchRateOutputNoticeDto[];
}
