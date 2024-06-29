chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'getFontInfo',
    title: 'Get Font Info',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'getFontInfo') {
    console.log('Injecting content script')

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ['content.js'],
      },
      () => {
        console.log('Content script injected')
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'getFontInfo',
            selectionText: info.selectionText,
          },
          (response) => {
            console.log('Response from content.js:', response)
          }
        )
      }
    )
  }
})
