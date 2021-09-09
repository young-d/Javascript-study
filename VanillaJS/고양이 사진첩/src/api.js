const API_ENE_POINT = "https://cat-api.roto.codes";

export const request = async (url) => {
    try {
        const res = await fetch(`${API_ENE_POINT}${url}`);

        if (res.ok) {
            return res.json();
        }

        throw new Error('API 처리 중 문제가 발생헸습니다');
    } catch (e) {
        console.error(e.message);
    }
}