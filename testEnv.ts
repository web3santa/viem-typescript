const privateKey = process.env.PRIVATE_KEY as string; // 기본값 설정

if (!privateKey) {
  throw new Error("PRIVATE_KEY is not defined");
}

console.log("PRIVATE_KEY:", privateKey);
