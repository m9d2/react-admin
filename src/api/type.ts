interface QueryParam {
    condition?: string | undefined,
    page?: number | undefined,
    size?: number | undefined
}

interface Response {
    data?: Data | any[],
    code?: number,
    msg?: string
}

interface Data {
    content: any[] | undefined,
    totalElements: number,
    number: number,
}
