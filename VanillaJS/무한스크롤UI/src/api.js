const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`);

        if (res.ok) {
            return res.json();
        }

        throw new Error('API 처리 중 문제가 발생했습니다');
    } catch(e) {
        console.error(e);
    }
}