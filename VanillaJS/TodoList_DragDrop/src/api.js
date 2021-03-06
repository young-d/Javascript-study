const API_END_POINT = 'https://todo-api.roto.codes/young-d';

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Context-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error('호출 실패');
        }
        return await res.json();
    } catch (e) {
        alert(e.message);
    }
}
