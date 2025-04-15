const BASE_URL = "http://3.39.26.244:8000"

export async function postGuestbook(data) {
    try {
        const res = await fetch (`${BASE_URL}/guest/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();
        console.log('서버 응답:', responseData);
        return data;
    } catch (err) {
        console.error('에러 발생:', err);
    }
}

export async function getData() {
    try {
        const res = await fetch (`${BASE_URL}/guest/`);
        const data = await res.json();
        console.log('데이터:', data);
    } catch (err){
    console.error('에러 발생:', err);
    } 
}