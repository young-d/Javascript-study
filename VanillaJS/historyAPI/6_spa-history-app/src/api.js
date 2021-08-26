//요청할 서버가 상황에 따라 다를 수 있으므로 앞단의 도메인을 미리 뽑아 두면 좋다
const API_END_POINT = 'https://kdt.roto.codes';

export const request = (url) => {
        return fetch(`${API_END_POINT}${url.indexOf('/') ? url : `${url}`}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status} Error`);
        })
        .catch(e => alert(e.message));
   
}