export const API_END_POINT = 'https://kdt-api.roto.codes';

export const request = async (url, options = {}) => {
    try {
        //header에 json 타입인거 추가해주기
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok) {
            const json = await res.json();
            return json;
        }

        throw new Error('API 호출 오류');
    } catch(e) {
        alert(e.message);
    }
}