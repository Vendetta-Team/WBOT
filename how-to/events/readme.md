# 이벤트 추가법

이벤트를 추가하기 위해서는 아래 코드 규칙을 지킵니다.
----------------------------------------------------------------

```js
/*
코드에서 사용할 모듈 호출은 이곳에

ex) const fs = require("fs");
*/
module.exports = {
    name: String, // 이곳에 이벤트명을 적습니다.
    once: Boolean, // 이벤트가 일어났을때 한번만 실행 할것인가를 정합니다.
    async execute(client) {
        // 이곳에 코드를 작성해주세요
    },
};
```

## 이벤트 리스트는 아래 링크에서 Events를 확인해주세요.
https://discord.js.org/#/docs/main/stable/search?query=Client
