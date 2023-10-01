let button = document.getElementById("button")

button.addEventListener("click", async () => {
  let state
  if (button.textContent === "Enable HalfBold"){
    button.textContent = "Disable HalfBold"
    state = true
  }
  else{
    button.textContent = "Enable HalfBold"
    state = false
  }
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: boldish,
    args: [state]
  });
});


function boldish(state) {
  const paragraphs = document.getElementsByTagName("p")

  for (let elt of paragraphs) {
    let ch = elt
    let para = ch.textContent
    para = para.split(" ")
    if (state){
      for (let i = 0; i < para.length; i++) {
        let word = para[i]
        let halfLength = Math.ceil(word.length / 2)
        let firstHalf = word.slice(0, halfLength)
        let secondHalf = word.slice(halfLength)
        para[i] = `<b>${firstHalf}</b>${secondHalf}`
      }
      ch.innerHTML = para.join(" ");
    }
    else{
      location.reload()
    }
  }
}
