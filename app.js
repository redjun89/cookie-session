const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    res.cookie('name', 'sparta', {
        expires: expires
    });
    return res.status(200).end();
});

app.get("/get-cookie", (req, res) => {
    // const cookie = req.headers.cookie;
    const cookies = req.cookies;
    console.log(cookies); // name=sparta
    return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 만한 자물쇠(데이터를 저장하는 부분)
let session = {}; // Key - Value()
app.get("/set-session", (req, res) => {
    const name = "sparta"; // 세션에 저장 데이터
    const uniqueInt = Date.now(); // 클라이언트에게 할당한 열쇠가
    session[uniqueInt] = name; // 세션에 데이터 저장

    res.cookie("sessionKey", uniqueInt);
    res.status(200).end();
});

app.get("/get-session", (req, res) => {
    const { sessionKey } = req.cookies;
    const sessionItem = session[sessionKey];

    console.log(sessionItem);
    return res.status(200).json({sessionItem: sessionItem});
});

app.listen(5002, () => {
    console.log("5002 포트로 서버가 열렸습니다.")
});