export default function () {
    return {

        // Error: connect ECONNREFUSED ::1:8000
        // at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)
        // karena localhost:8000 solusi ganti ke 127.0.0.1:8000
        apiDomain: 'http://127.0.0.1:8000' // 'http://192.168.1.2:8000' //  'https://trefeltour.labsnip.com' // ' http://192.168.1.5:8000' //
    }
}
