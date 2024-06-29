console.log('Content script loaded')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getFontInfo') {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedNode = range.startContainer.parentNode
      const computedStyle = window.getComputedStyle(selectedNode)

      const fontInfo = {
        fontFamily: computedStyle.fontFamily,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        fontStyle: computedStyle.fontStyle,
      }

      console.log('Received message:', request.selectionText)
      alert(
        `Font Family: ${fontInfo.fontFamily}\nFont Size: ${fontInfo.fontSize}\nFont Weight: ${fontInfo.fontWeight}\nFont Style: ${fontInfo.fontStyle}`
      )

      sendResponse({ fontInfo: fontInfo })
    } else {
      sendResponse({ error: 'No text selected' })
    }
  }
})
