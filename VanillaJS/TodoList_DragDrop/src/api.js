const API_END_POINT = 'https://todo-api.roto.doces/roto';

export const reqeust = async(url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`);

        if (!res.ok) {
            throw new Error('호출 실패');
        }
        return await res.json();
    } catch (e) {
        console.error(e.message);
    }
}