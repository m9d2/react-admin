export const getGender = (gender: string) => {
    switch (gender) {
        case '1':
            return '男';
        case '2':
            return '女';
        default:
            return '';
    }
};
