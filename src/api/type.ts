interface QueryParam {
    condition?: string | undefined,
    page?: number | undefined,
    size?: number | undefined
}

interface Response<T> {
    data?: T,
    code?: number,
    msg?: string
}

interface PageData {
    content: any[] | undefined,
    totalElements: number,
    number: number,
}

