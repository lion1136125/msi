document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issue = document.getElementById("issueType").value;
    const detail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    if (successBox) {
      successBox.classList.add("show");
    }

    form.reset();

    fetch("https://script.google.com/macros/s/AKfycbwjf9tm2i8TPL0IUrm6rYZAJp1En4OUHpzjfS6U6Gc3S16WA34drUjO7OjcbMP64TOO3g/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "성함": name,
        "연락처": phone,
        "지역/주소": area,
        "고장 증상": issue,
        "상세 설명": detail
      })
    }).catch((err) => {
      console.error("전송 오류:", err);
    });

    setTimeout(() => {
      successBox.classList.remove("show");
    }, 6000);
  });
});
