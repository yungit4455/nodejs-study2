bcrypt 사용법
const bcrypt = require('bcrypt'); // import
const saltRounds = 10; // salt setting

암호화 with promise: return으로 Promise를 반환한다.
bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // Store hash in your password DB.
}); 

총 60자리의 hashed text가 생성된다.

비교: 클라이언트가 입력한 비밀번호와 hashed text를 비교하여 boolean 값을 result에 대입한다.
bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
    // result == boolean
});

-----------------------------------------------------------------------------------------------------------------------
질문 1: HTTPS로 cliend side에서 전송한 비밀번호를 server side에서 평문으로 볼 수 있어도 괜찮은가?
- DB에 암호화한 비밀번호를 저장하는 과정에서 console.log()로 값을 찍어보다가 문득 호기심이 생겼다.
클라이언트에서 전송한 데이터(비밀번호)를 서버에서는 평문으로 읽을 수 있었기 때문이다. 
답을 찾기 위해 구글링을 했더니 역시나, 먼저 고민했던 사람들의 질문을 찾을 수 있었다. 밑의 블로그에서 보기좋게 정리해주셨다.
https://yoonhogo.github.io/blog/2020-09-08/HTTPS-plain-text-safety/

3가지 상황을 생각할 수 있다. 
- 클라이언트의 관점에서 이미 바이러스, 악성코드 등 해커의 공격에 노출된 상태라면 클라이언트 측에서 해시/암호화는 의미가 없다. 대신 HTTPS 인증서로 유효성을
검사하거나 다른 방식의 보안 솔루션을 도입해야 한다.
- MITM(Man in the middle) 관점에서 통신 패킷을 볼 수 있어도 HTTPS로 패킷이 암호화 되어있기 때문에 유의미한 정보를 얻을 수 없다.
- 서버의 관점에서 비밀번호가 이미 해싱/암호화되어 전송된다면 유효성 검사(길이/중복문자/사전단어/영문자+숫자+특수문자의 조합 등등)를 할 수 없다.
즉, 클라이언트가 abc1234 같은 취약한 비밀번호를 생성하여 전송하여도 이것을 DB에 저장해줄 수 밖에 없는 것이다.
또한, 공격자가 해시/암호화된 비밀번호를 획득하였을 때 서버가 두 경우의 차이를 알 수 없다. 만약, Challenge-Response로 조취를 취했다면 해시/암호화는
별다른 의미가 없다.

실제 유명 웹사이트 중 국내 포털 사이트와 메타(전 페이스북) 계열 외에서는 평문으로 비밀번호를 보낸다고 한다.
다만, 쿠키/세션/보안을 위한 코드와 함께 보안 취약점을 커버하는 데이터가 함께 전송된다.